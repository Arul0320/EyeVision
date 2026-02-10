// scrape_spacearcade_cheerio.js
// Usage: node scrape_spacearcade_cheerio.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://spacearcade.in/?srsltid=AfmBOorHYBL2wII1g7QX5O_awNJ7_rW2lq4-bSbTLpeazQZIkj61q9t_";

function cleanPrice(raw) {
    if (!raw) return null;
    const price = raw.replace(/[^\d.,]/g, "").trim();
    return price || null;
}

(async () => {
    try {
        const res = await axios.get(URL, { headers: { "User-Agent": "Mozilla/5.0" } });
        const $ = cheerio.load(res.data);

        // Try multiple common selectors — adjust if the site uses custom classes
        const containerSelectors = [
            ".product", ".product-item", ".product-card", ".product-grid .item",
            "li.product", ".product-listing .product", ".woocommerce-LoopProduct-link"
        ];

        const titleSelectors = ["h2", ".title", ".product-title", ".entry-title", ".woocommerce-loop-product__title"];
        const priceSelectors = [".price", ".product-price", ".amount", ".woocommerce-Price-amount", ".price .amount"];
        const imageSelectors = ["img", ".product-image img", ".thumb img"];

        const found = new Map();

        containerSelectors.forEach((cSel) => {
            $(cSel).each((i, el) => {
                const $el = $(el);
                let title = null;
                for (const ts of titleSelectors) {
                    const t = $el.find(ts).first().text().trim();
                    if (t) { title = t; break; }
                }
                if (!title) {
                    const linkText = $el.find("a").first().attr("title") || $el.find("a").first().text();
                    if (linkText) title = String(linkText).trim();
                }

                let price = null;
                for (const ps of priceSelectors) {
                    const p = $el.find(ps).first().text().trim();
                    if (p) { price = cleanPrice(p); break; }
                }

                const link = $el.find("a").first().attr("href") || null;
                let img = null;
                for (const is of imageSelectors) {
                    const s = $el.find(is).first().attr("src") || $el.find(is).first().attr("data-src");
                    if (s) { img = s; break; }
                }

                if (title) {
                    const key = (title + (price || "")).slice(0, 200);
                    if (!found.has(key)) {
                        found.set(key, { title, price, link, image: img });
                    }
                }
            });
        });

        // As fallback, search for anchor lists
        if (found.size === 0) {
            $("a").each((i, el) => {
                const $a = $(el);
                const txt = $a.text().trim();
                if (txt && txt.length > 3 && txt.length < 200) {
                    // try to find price nearby
                    const p = $a.parent().find(".price").first().text().trim() || null;
                    const price = p ? cleanPrice(p) : null;
                    found.set(txt + (price || ""), { title: txt, price, link: $a.attr("href") || null, image: null });
                }
            });
        }

        const products = Array.from(found.values());
        const outPath = path.resolve(process.cwd(), "spacearcade_products.json");
        fs.writeFileSync(outPath, JSON.stringify(products, null, 2), "utf8");
        console.log(`Wrote ${products.length} products to ${outPath}`);
    } catch (err) {
        console.error("Error fetching/parsing:", err.message || err);
        process.exit(1);
    }
})();
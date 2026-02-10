// scrape_spacearcade_puppeteer.js
// Usage: node scrape_spacearcade_puppeteer.js
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const URL = "https://spacearcade.in/?srsltid=AfmBOorHYBL2wII1g7QX5O_awNJ7_rW2lq4-bSbTLpeazQZIkj61q9t_";

function cleanPrice(raw) {
    if (!raw) return null;
    const price = raw.replace(/[^\d.,]/g, "").trim();
    return price || null;
}

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

    // Adjust selectors in page.evaluate if needed
    const products = await page.evaluate(() => {
        const containerSelectors = [
            ".product", ".product-item", ".product-card", ".product-grid .item",
            "li.product", ".product-listing .product", ".woocommerce-LoopProduct-link"
        ];
        const titleSelectors = ["h2", ".title", ".product-title", ".entry-title", ".woocommerce-loop-product__title"];
        const priceSelectors = [".price", ".product-price", ".amount", ".woocommerce-Price-amount", ".price .amount"];
        const imageSelectors = ["img", ".product-image img", ".thumb img"];

        const found = new Map();

        containerSelectors.forEach((cSel) => {
            document.querySelectorAll(cSel).forEach((el) => {
                let title = null;
                for (const ts of titleSelectors) {
                    const tEl = el.querySelector(ts);
                    if (tEl && tEl.innerText.trim()) { title = tEl.innerText.trim(); break; }
                }
                if (!title) {
                    const a = el.querySelector("a");
                    if (a) title = (a.getAttribute("title") || a.innerText || "").trim();
                }

                let price = null;
                for (const ps of priceSelectors) {
                    const pEl = el.querySelector(ps);
                    if (pEl && pEl.innerText.trim()) { price = pEl.innerText.trim(); break; }
                }

                const a = el.querySelector("a");
                const link = a ? a.href : null;
                let img = null;
                for (const is of imageSelectors) {
                    const iEl = el.querySelector(is);
                    if (iEl) { img = iEl.src || iEl.getAttribute("data-src"); break; }
                }

                if (title) {
                    const key = (title + (price || "")).slice(0, 200);
                    if (!found.has(key)) {
                        found.set(key, { title, price, link, image: img });
                    }
                }
            });
        });

        if (found.size === 0) {
            document.querySelectorAll("a").forEach(a => {
                const txt = a.innerText.trim();
                if (txt.length > 3 && txt.length < 200) {
                    const pEl = a.parentElement ? a.parentElement.querySelector(".price") : null;
                    found.set(txt + (pEl ? pEl.innerText : ""), { title: txt, price: pEl ? pEl.innerText.trim() : null, link: a.href, image: null });
                }
            });
        }

        return Array.from(found.values());
    });

    await browser.close();

    // Clean prices
    const cleaned = products.map(p => ({ ...p, price: p.price ? p.price.replace(/[^\d.,]/g, "").trim() : null }));
    const outPath = path.resolve(process.cwd(), "spacearcade_products.json");
    fs.writeFileSync(outPath, JSON.stringify(cleaned, null, 2), "utf8");
    console.log(`Wrote ${cleaned.length} products to ${outPath}`);
})();
// convert_to_ts.js
const fs = require("fs");
const path = require("path");
const inPath = path.resolve(process.cwd(), "spacearcade_products.json");
if (!fs.existsSync(inPath)) {
    console.error("spacearcade_products.json not found. Run scraper first.");
    process.exit(1);
}
const data = JSON.parse(fs.readFileSync(inPath, "utf8"));
const out = `export const scrapedProducts = ${JSON.stringify(data, null, 2)} as const;\n`;
fs.writeFileSync(path.resolve(process.cwd(), "src", "data", "scrapedProducts.ts"), out, "utf8");
console.log("Wrote src/data/scrapedProducts.ts");
// Schneller Logik-Smoketest ohne DOM.
// Läuft nicht in der App — nur zur einmaligen Verifikation der data.js.

const vm = require("vm");
const fs = require("fs");
const path = require("path");

const ctx = { window: {}, navigator: {}, localStorage: { getItem: () => null, setItem: () => {} } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8"), ctx);
const DATA = ctx.window.DATA;

let failed = 0;
function check(cond, msg) { if (!cond) { console.error("FAIL:", msg); failed++; } else console.log("ok  ", msg); }

check(DATA.landscapes.length === 4, "4 landscapes");
for (const ls of DATA.landscapes) {
  check(ls.gifts.length >= 4 && ls.gifts.length <= 6, `${ls.id}: 4-6 gifts (has ${ls.gifts.length})`);
  check(ls.de.name && ls.en.name, `${ls.id}: both languages`);
  for (const g of ls.gifts) {
    check(g.de && g.en, `${g.id}: both languages`);
    check(["common","rare","precious"].includes(g.rarity), `${g.id}: valid rarity`);
    check(["stone","feather","book","candle","shell","bloom","audio"].includes(g.type), `${g.id}: valid type`);
    if (g.type === "audio") check(typeof g.audio === "string" && g.audio.startsWith("audio/"), `${g.id}: audio path`);
  }
}
check(DATA.windGifts.de.length === 10, "10 DE wind gifts");
check(DATA.windGifts.en.length === 10, "10 EN wind gifts");
check(DATA.ranks.length === 5, "5 ranks");
check(DATA.ranks[0].threshold === 0, "first rank at 0");
check(DATA.ranks[4].threshold === 1400, "last rank at 1400");

// Unique gift IDs
const ids = new Set();
for (const ls of DATA.landscapes) for (const g of ls.gifts) {
  check(!ids.has(g.id), `unique id: ${g.id}`);
  ids.add(g.id);
}

console.log(failed ? `\n${failed} failures` : "\nall good");
process.exit(failed ? 1 : 0);

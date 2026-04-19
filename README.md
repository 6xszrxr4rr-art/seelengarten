# Seelengarten

Ein sanftes Spiel zum Entdecken, Lauschen und Innehalten.
A quiet app of small discoveries — four landscapes, gentle gifts.

## Was es ist / What it is

Seelengarten ist eine PWA (Progressive Web App). Du wanderst durch vier
Landschaften — **Stiller Wald, Weicher Strand, Weite Berge, Nachtwiese** —
und entdeckst in jeder Szene kleine, versteckte Geschenke: Steine mit
Weisheiten, Federn mit Atemritualen, Muscheln, Teelichter, Blüten, kurze
Geschichten und Kopfhörer-Lieder.

Keine Verlustmechanik, keine Timer, kein Druck. Alles geht langsam und bleibt.

Seelengarten is a slow discovery PWA. Wander four landscapes, find hidden
gifts — stones, feathers, shells, candles, blooms, short stories, and
headphone songs. Nothing is ever lost; nothing is ever on a timer.

## Funktionen / Features

- **Deutsch + Englisch** — oben rechts umschaltbar
- **Hell + Dunkel** — mit System-Vorgabe als Start
- **Offline-fähig** via Service Worker
- **Mobil optimiert** — Pastell-Gradienten, runde Karten, ruhige Animationen
- **localStorage** — Fortschritt bleibt, geht nie verloren
- **Tägliches Windgeschenk** — 1×/Tag ein leiser Impuls, mit Streak
- **Sammelbuch** — alle gefundenen Geschenke plus Schatten der ungefundenen
- **5 Ränge** — Suchende → Lauschende → Sammlerin → Hüterin des Gartens → Stille
- **4 Landschaften**, öffnen sich bei 0 / 150 / 400 / 900 Punkten

## Starten / Run

Du brauchst nur einen statischen Webserver:

```
python3 -m http.server 8080
```

Dann im Browser: [http://localhost:8080](http://localhost:8080)

Für die Installation als App: öffne es auf dem Handy im Browser, tippe auf
„Zum Homescreen hinzufügen". Der Service Worker cached alles für offline.

## Eigene Geschenke hinzufügen / Add your own gifts

Öffne `data.js`. Dort findest du die vier Landschaften mit ihren
`gifts`-Arrays. Ein neues Geschenk sieht z.B. so aus:

```js
{
  id: "forest-stone-mine",
  icon: "🪨",
  rarity: "rare",          // "common" | "rare" | "precious"
  type: "stone",           // stone | feather | book | candle | shell | bloom | audio
  de: { title: "Mein Stein", scent: "...", wisdom: "..." },
  en: { title: "My stone",  scent: "...", wisdom: "..." }
}
```

Erlaubte `type`-Felder:

| type | erwartete Inhaltsfelder (de/en) |
|------|----------------------------------|
| stone   | `scent`, `wisdom`   |
| feather | `ritual`            |
| book    | `story`             |
| candle  | `glow`              |
| shell   | `whisper`           |
| bloom   | `petal`             |
| audio   | `note` + top-level `audio: "audio/dein-song.mp3"` |

Für Kopfhörer-Geschenke legst du deine Datei einfach in `audio/` ab (z.B.
`audio/song-morgennebel.mp3`). Fehlt die Datei, zeigt die App einen sanften
Hinweis — keinen Fehler.

Nach Änderungen in `data.js` einmal hart neu laden (Shift+Reload), damit der
Service Worker die neue Version holt.

## Ränge / Ranks

| Punkte | DE                     | EN                    |
|--------|------------------------|-----------------------|
| 0      | Suchende               | Seeker                |
| 100    | Lauschende             | Listener              |
| 300    | Sammlerin              | Gatherer              |
| 700    | Hüterin des Gartens    | Keeper of the Garden  |
| 1400   | Stille                 | Stillness             |

## Punkte / Points

- Geschenk finden: **+10** (häufig) / **+25** (selten) / **+50** (kostbar)
- Geschenk „zu Ende anwenden": **+30**
- Tägliches Windgeschenk: **+20**
- Landschaft vollständig: **+100**

## Struktur / Structure

```
index.html        UI + Styles inline
app.js            Logik / logic
data.js           Inhalte / content — hier erweitern
manifest.json     PWA-Manifest mit Maskable-Icons
sw.js             Service Worker (Offline-Cache)
icons/            Pastellgrüne Platzhalter-Icons
audio/            Deine Kopfhörer-Songs (leer by default)
scripts/
  make_icons.py   Pillow-Skript: Icons neu erzeugen
```

## Lizenz / License

Für dich — nimm es, pass es an, schenk es weiter. Die Texte sind unter
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Der Code unter
[MIT](https://opensource.org/licenses/MIT).

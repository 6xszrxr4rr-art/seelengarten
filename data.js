// Seelengarten – Inhalte / Content
// Erweitere hier eigene Geschenke: einfach neue Objekte in die "gifts"-Arrays einer Landschaft legen.
// Add your own gifts by appending objects to the "gifts" array of any landscape.

const DATA = {
  // Rangstufen / Ranks
  ranks: [
    { threshold: 0,    de: "Suchende",              en: "Seeker" },
    { threshold: 100,  de: "Lauschende",            en: "Listener" },
    { threshold: 300,  de: "Sammlerin",             en: "Gatherer" },
    { threshold: 700,  de: "Hüterin des Gartens",   en: "Keeper of the Garden" },
    { threshold: 1400, de: "Stille",                en: "Stillness" }
  ],

  // Seltenheit → Punkte / Rarity → points
  rarityPoints: { common: 10, rare: 25, precious: 50 },

  // Bonuspunkte / Bonus points
  bonus: {
    applyGift: 30,       // Geschenk zu Ende angewendet
    dailyWind: 20,       // Tägliches Windgeschenk empfangen
    landscapeComplete: 100
  },

  // UI-Texte / UI strings
  ui: {
    de: {
      appTitle: "Seelengarten",
      tabLandscapes: "Landschaften",
      tabBook: "Sammelbuch",
      tabWind: "Windgeschenk",
      locked: "Öffnet sich bei",
      pts: "Pkt.",
      rank: "Rang",
      total: "Gesammelt",
      back: "Zurück",
      discovered: "Entdeckt",
      undiscovered: "Noch verborgen",
      complete: "Landschaft vollständig",
      apply: "Zu Ende anwenden (+30)",
      applied: "Angewendet",
      close: "Schließen",
      dailyTitle: "Das Windgeschenk",
      dailyHint: "Jeden Tag ein neuer Impuls. Nimm ihn an, wenn er dich berührt.",
      dailyClaim: "Annehmen",
      dailyDone: "Heute schon angenommen",
      dailyStreak: "Tage in Folge",
      rarityCommon: "häufig",
      rarityRare: "selten",
      rarityPrecious: "kostbar",
      newRank: "Neuer Rang",
      audioMissing: "Dieses Lied wartet noch. Lege die Datei in /audio ab und es klingt.",
      breathe: "Atme.",
      shadow: "Schatten",
      scentLabel: "Duft",
      wisdomLabel: "Weisheit",
      storyLabel: "Kleine Geschichte",
      ritualLabel: "Atemritual",
      whisperLabel: "Flüstern",
      glowLabel: "Schein",
      petalLabel: "Blütenblatt",
      chooseLang: "Sprache",
      themeLabel: "Modus",
      themeLight: "Hell",
      themeDark: "Dunkel"
    },
    en: {
      appTitle: "Seelengarten",
      tabLandscapes: "Landscapes",
      tabBook: "Collection",
      tabWind: "Wind Gift",
      locked: "Opens at",
      pts: "pts",
      rank: "Rank",
      total: "Gathered",
      back: "Back",
      discovered: "Discovered",
      undiscovered: "Still hidden",
      complete: "Landscape complete",
      apply: "Use to the end (+30)",
      applied: "Used",
      close: "Close",
      dailyTitle: "The Wind Gift",
      dailyHint: "A small impulse each day. Receive it if it touches you.",
      dailyClaim: "Receive",
      dailyDone: "Already received today",
      dailyStreak: "days in a row",
      rarityCommon: "common",
      rarityRare: "rare",
      rarityPrecious: "precious",
      newRank: "New rank",
      audioMissing: "This song is still waiting. Place the file in /audio and it will sound.",
      breathe: "Breathe.",
      shadow: "Shadow",
      scentLabel: "Scent",
      wisdomLabel: "Wisdom",
      storyLabel: "A small story",
      ritualLabel: "Breathing ritual",
      whisperLabel: "Whisper",
      glowLabel: "Glow",
      petalLabel: "Petal",
      chooseLang: "Language",
      themeLabel: "Theme",
      themeLight: "Light",
      themeDark: "Dark"
    }
  },

  // 4 Landschaften
  landscapes: [
    {
      id: "forest",
      unlock: 0,
      gradient: "linear-gradient(160deg,#d9ead3,#a8c8a2 60%,#7fa37a)",
      darkGradient: "linear-gradient(160deg,#2a3a2e,#1e2a22 70%,#14201a)",
      de: {
        name: "Stiller Wald",
        intro: "Das Licht fällt weich durch die Blätter. Irgendwo tropft Wasser von einem Farn. Geh langsam."
      },
      en: {
        name: "Silent Forest",
        intro: "Light falls softly through the leaves. Somewhere water drips from a fern. Walk slowly."
      },
      gifts: [
        {
          id: "forest-stone-moss",
          icon: "🪨",
          rarity: "common",
          type: "stone",
          de: {
            title: "Moosstein",
            scent: "Nach Erde nach warmem Regen.",
            wisdom: "Du musst nicht schneller werden. Du darfst dableiben."
          },
          en: {
            title: "Moss stone",
            scent: "Of earth after warm rain.",
            wisdom: "You do not need to be faster. You are allowed to stay."
          }
        },
        {
          id: "forest-feather-owl",
          icon: "🪶",
          rarity: "rare",
          type: "feather",
          de: {
            title: "Eulenfeder",
            ritual: "Atme vier Schläge ein durch die Nase. Halte vier. Atme sechs aus durch den Mund. Sechs Mal. Dann lege die Feder innerlich hin."
          },
          en: {
            title: "Owl feather",
            ritual: "Breathe in for four through the nose. Hold four. Breathe out for six through the mouth. Six rounds. Then set the feather down, inwardly."
          }
        },
        {
          id: "forest-book-fern",
          icon: "📖",
          rarity: "precious",
          type: "book",
          de: {
            title: "Die Geduld des Farns",
            story: "Ein junger Farn wollte lieber Eiche sein. Er streckte sich, bis ihm die Blätter zitterten. Ein alter Farn daneben sagte nichts, nur — schau — wie schön dein Grün gerade ist, gerade jetzt. Am Abend war der junge Farn noch immer Farn, und das war genug."
          },
          en: {
            title: "The patience of the fern",
            story: "A young fern wanted to be an oak. He stretched until his fronds trembled. An old fern beside him said nothing, only — look — how beautiful your green is right now, just as it is. By evening the young fern was still a fern, and that was enough."
          }
        },
        {
          id: "forest-candle-root",
          icon: "🕯️",
          rarity: "common",
          type: "candle",
          de: {
            title: "Wurzellicht",
            glow: "Stell es an eine Stelle, an der du morgens Tee trinkst. Es erinnert dich daran, dass du Wurzeln hast."
          },
          en: {
            title: "Root light",
            glow: "Place it where you drink tea in the morning. It reminds you that you have roots."
          }
        },
        {
          id: "forest-song-morningfog",
          icon: "🎧",
          rarity: "rare",
          type: "audio",
          audio: "audio/song-morgennebel.mp3",
          de: {
            title: "Morgennebel",
            note: "Ein leises Lied aus dem Wald. Kopfhörer auf, Augen lose."
          },
          en: {
            title: "Morning mist",
            note: "A quiet song from the forest. Headphones on, eyes soft."
          }
        }
      ]
    },

    {
      id: "beach",
      unlock: 150,
      gradient: "linear-gradient(170deg,#f5e6c8,#f0d9a4 50%,#a8c7d6)",
      darkGradient: "linear-gradient(170deg,#3b3527,#2a2620 55%,#1d2a33)",
      de: {
        name: "Weicher Strand",
        intro: "Der Sand ist warm. Das Meer atmet weiter, auch wenn du nichts tust."
      },
      en: {
        name: "Soft Beach",
        intro: "The sand is warm. The sea keeps breathing, even when you do nothing."
      },
      gifts: [
        {
          id: "beach-shell-listen",
          icon: "🐚",
          rarity: "common",
          type: "shell",
          de: {
            title: "Hörmuschel",
            whisper: "Leg sie ans Ohr. Das, was du hörst, ist nicht das Meer. Es ist dein eigenes Blut, und es ist dir treu."
          },
          en: {
            title: "Listening shell",
            whisper: "Hold it to your ear. What you hear is not the sea. It is your own blood, and it is faithful to you."
          }
        },
        {
          id: "beach-stone-smooth",
          icon: "🪨",
          rarity: "rare",
          type: "stone",
          de: {
            title: "Glattstein",
            scent: "Nach Salz und nach Sonne auf Haut.",
            wisdom: "Alles Scharfe an dir wird einmal weich. Du musst nichts dafür tun. Nur bleiben."
          },
          en: {
            title: "Smooth stone",
            scent: "Of salt and sun on skin.",
            wisdom: "Everything sharp in you will soften, in time. You need not force it. Only stay."
          }
        },
        {
          id: "beach-feather-gull",
          icon: "🪶",
          rarity: "common",
          type: "feather",
          de: {
            title: "Möwenfeder",
            ritual: "Leg eine Hand auf den Bauch. Atme drei Wellen lang — ein, und aus. Ein, und aus. Ein, und aus. Keine Hast."
          },
          en: {
            title: "Gull feather",
            ritual: "Place a hand on your belly. Breathe for three waves — in, and out. In, and out. In, and out. No hurry."
          }
        },
        {
          id: "beach-song-tide",
          icon: "🎧",
          rarity: "precious",
          type: "audio",
          audio: "audio/song-flut.mp3",
          de: {
            title: "Flut",
            note: "Ein langes, weiches Lied. Zieh die Schuhe aus, auch innerlich."
          },
          en: {
            title: "Tide",
            note: "A long, soft song. Take off your shoes, also on the inside."
          }
        },
        {
          id: "beach-bloom-beachrose",
          icon: "🌸",
          rarity: "rare",
          type: "bloom",
          de: {
            title: "Strandrose",
            petal: "Sie wächst, wo der Wind am härtesten ist. Das darfst du auch."
          },
          en: {
            title: "Beach rose",
            petal: "She grows where the wind is hardest. You are allowed to as well."
          }
        }
      ]
    },

    {
      id: "mountains",
      unlock: 400,
      gradient: "linear-gradient(180deg,#d8dee9,#a8b5c7 55%,#6a7b91)",
      darkGradient: "linear-gradient(180deg,#2b3440,#1f2630 60%,#151c24)",
      de: {
        name: "Weite Berge",
        intro: "Die Luft ist dünn. Dein Atem wird dadurch nicht kleiner, sondern aufmerksamer."
      },
      en: {
        name: "Wide Mountains",
        intro: "The air is thin. Your breath does not become smaller, only more attentive."
      },
      gifts: [
        {
          id: "mountains-stone-granite",
          icon: "🪨",
          rarity: "precious",
          type: "stone",
          de: {
            title: "Granitkern",
            scent: "Nach kaltem Stein und nach sehr altem Schnee.",
            wisdom: "Du musst nicht beweglich sein, um getragen zu werden. Manchmal ist Bleiben das tiefste Geschenk."
          },
          en: {
            title: "Granite core",
            scent: "Of cold stone and very old snow.",
            wisdom: "You do not need to be agile to be held. Sometimes staying is the deepest gift."
          }
        },
        {
          id: "mountains-feather-eagle",
          icon: "🪶",
          rarity: "common",
          type: "feather",
          de: {
            title: "Adlerfeder",
            ritual: "Stell dich aufrecht. Atme ein, als würdest du den Blick vergrößern. Atme aus, als ließest du etwas Altes los. Sieben Atemzüge."
          },
          en: {
            title: "Eagle feather",
            ritual: "Stand upright. Breathe in as if widening your gaze. Breathe out as if letting something old go. Seven breaths."
          }
        },
        {
          id: "mountains-book-snowline",
          icon: "📖",
          rarity: "rare",
          type: "book",
          de: {
            title: "Die Schneegrenze",
            story: "Ein Wanderer fragte den Berg, warum er so still sei. Der Berg sagte: Ich rede jeden Morgen. Du hast es nur nicht gehört, weil du dich selbst so laut gemacht hast. Der Wanderer setzte sich. Am Abend wusste er, wie Berge reden."
          },
          en: {
            title: "The snowline",
            story: "A walker asked the mountain why it was so quiet. The mountain said: I speak each morning. You only didn't hear, because you made yourself so loud. The walker sat down. By evening he knew how mountains speak."
          }
        },
        {
          id: "mountains-song-ridge",
          icon: "🎧",
          rarity: "rare",
          type: "audio",
          audio: "audio/song-grat.mp3",
          de: {
            title: "Auf dem Grat",
            note: "Ein Lied für hohe, ruhige Sicht."
          },
          en: {
            title: "On the ridge",
            note: "A song for high, still seeing."
          }
        },
        {
          id: "mountains-candle-alpenglow",
          icon: "🕯️",
          rarity: "common",
          type: "candle",
          de: {
            title: "Alpenglühen",
            glow: "Zünde es an, wenn der Tag dich kalt gemacht hat. Zwölf Minuten genügen."
          },
          en: {
            title: "Alpenglow",
            glow: "Light it when the day has made you cold. Twelve minutes are enough."
          }
        }
      ]
    },

    {
      id: "nightmeadow",
      unlock: 900,
      gradient: "linear-gradient(180deg,#2d2a4a,#4a4672 50%,#8d8bc1)",
      darkGradient: "linear-gradient(180deg,#0f0f1f,#1b1a36 55%,#2d2a4a)",
      de: {
        name: "Nachtwiese",
        intro: "Die Gräser halten still. Über dir ist mehr Himmel, als du je brauchen wirst."
      },
      en: {
        name: "Night Meadow",
        intro: "The grasses are still. Above you is more sky than you will ever need."
      },
      gifts: [
        {
          id: "night-candle-star",
          icon: "🕯️",
          rarity: "rare",
          type: "candle",
          de: {
            title: "Sternenlicht",
            glow: "Setz es ans Fenster. Lass es lange brennen, auch wenn du längst schläfst."
          },
          en: {
            title: "Starlight",
            glow: "Set it at the window. Let it burn long, even after you sleep."
          }
        },
        {
          id: "night-bloom-moon",
          icon: "🌸",
          rarity: "common",
          type: "bloom",
          de: {
            title: "Mondblüte",
            petal: "Sie öffnet sich erst, wenn keiner mehr zusieht. Du darfst das auch."
          },
          en: {
            title: "Moon bloom",
            petal: "She opens only when no one is watching. You are allowed to as well."
          }
        },
        {
          id: "night-stone-obsidian",
          icon: "🪨",
          rarity: "precious",
          type: "stone",
          de: {
            title: "Nachtspiegel",
            scent: "Nach kühlem Gras und einer Spur von Rauch.",
            wisdom: "Nicht jede Nacht muss etwas klären. Manche Nächte dürfen dich einfach nur halten."
          },
          en: {
            title: "Night mirror",
            scent: "Of cool grass and a thread of smoke.",
            wisdom: "Not every night must resolve something. Some nights are allowed only to hold you."
          }
        },
        {
          id: "night-feather-owlet",
          icon: "🪶",
          rarity: "common",
          type: "feather",
          de: {
            title: "Käuzchenfeder",
            ritual: "Lege dich flach. Atme in den Bauch, bis das Atmen dich atmet. Bleib so, bis du vergessen hast, wie spät es ist."
          },
          en: {
            title: "Little owl feather",
            ritual: "Lie flat. Breathe into the belly, until the breathing breathes you. Stay until you forget the hour."
          }
        },
        {
          id: "night-song-lullaby",
          icon: "🎧",
          rarity: "precious",
          type: "audio",
          audio: "audio/song-wiegenhimmel.mp3",
          de: {
            title: "Wiegenhimmel",
            note: "Ein sehr langsames Lied für vor dem Schlafen."
          },
          en: {
            title: "Cradle sky",
            note: "A very slow song, for before sleep."
          }
        }
      ]
    }
  ],

  // Tägliche Windgeschenke – je 10 pro Sprache
  windGifts: {
    de: [
      "Heute reicht ein Atemzug. Einer, der wirklich dir gehört.",
      "Du musst heute nichts lösen. Du darfst heute nur tragen.",
      "Trink das erste Glas Wasser, als wäre es das erste Glas Wasser.",
      "Stell dich einmal ans offene Fenster. Nur eine Minute. Nicht mehr nötig.",
      "Sag einem Menschen heute leise: Es ist gut, dass es dich gibt.",
      "Das, was du nicht geschafft hast, kann dich trotzdem mögen.",
      "Lausche heute einmal länger als du redest.",
      "Leg eine Hand auf dein Herz, wenn es laut wird. Es kennt die Geste.",
      "Nimm heute einen Umweg. Nicht weil er schöner ist, sondern weil er langsamer ist.",
      "Du bist kein Projekt. Du bist ein Garten."
    ],
    en: [
      "One breath is enough today. One that really belongs to you.",
      "You do not have to solve anything today. You are only allowed to carry.",
      "Drink the first glass of water as if it were the first glass of water.",
      "Stand at the open window once. A minute is enough. More is not needed.",
      "Say quietly to someone today: it is good that you exist.",
      "What you did not manage is still allowed to like you.",
      "Listen, today, longer than you speak.",
      "Place a hand on your heart when it gets loud. It knows the gesture.",
      "Take the long way today. Not because it is prettier, but because it is slower.",
      "You are not a project. You are a garden."
    ]
  }
};

// Für Service Worker / global
if (typeof window !== "undefined") window.DATA = DATA;

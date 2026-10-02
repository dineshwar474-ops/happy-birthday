# ✦ A Mysterious Birthday Surprise Website

A bespoke, cinematic, and interactive birthday surprise website built with **React.js, Vite, Framer Motion, and Lucide React**.

Designed with a luxury nocturnal aesthetic (Deep Plum, Mauve, Rose, Blush, Champagne, Cream, Lavender, and Gold) and Cormorant Garamond typography.

---

## ✦ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## ✦ Personalization

All personal and custom data is separated cleanly inside the [`src/data/`](src/data) folder:

| File | Description |
| --- | --- |
| [`src/data/config.js`](src/data/config.js) | Set `HER_NAME`, audio source, easter egg settings, and mysterious creator signature |
| [`src/data/clues.js`](src/data/clues.js) | Customize the 4 progressive clue cards |
| [`src/data/memories.js`](src/data/memories.js) | Configure the 7 celestial constellation memory points & hidden secret |
| [`src/data/wishes.js`](src/data/wishes.js) | Customize the folded thoughts inside the glass Birthday Jar |
| [`src/data/gift.js`](src/data/gift.js) | Customize the Golden Chance and Promise copy |

---

## ✦ Journey Progression

1. **Screen 1 — Mysterious Intro ✦**: Ambient plum sky, floating stardust, "Something was left here for you."
2. **Screen 2 — The Question**: "Wait... Are you the girl who is having a birthday today?" with playful micro-interactions.
3. **Screen 3 — The Mystery Clues**: 4 elegant glassmorphism clue cards revealed one by one.
4. **Screen 4 — Memory Constellation 🌙**: Interactive night sky with glowing stars that expand, reveal memories, connect into a celestial constellation, and trigger starbursts.
5. **Screen 5 — The Birthday Jar 🌸**: Interactive glass vessel with folded glowing notes that pop out and unfold.
6. **Screen 6 — The Secret Letter ✉️**: Luxury wax-sealed envelope that flips open and reveals the sliding parchment.
7. **Screen 7 — The Birthday Letter**: Editorial-style birthday letter with staggered animations.
8. **Screen 8 — The Gift Reveal 🎁**: Dramatic timed pauses leading to the reveal: *"My answer will be YES. You get to ask me for ONE gift."*
9. **Screen 9 & 10 — The Golden Chance & Promise ✨**: She types her one gift request, which transforms into an irrevocable golden promise.
10. **Screen 11 — Final Mystery ✦**: Calm, mysterious closing with playful tease and replay option.

---

## ✦ Hidden Easter Eggs

- **The Moon**: Tap the crescent moon in the top-left corner 3 times.
- **The Constellation Star**: Star 6 contains an exclusive hidden message.
- **The Tiny Blossom**: Click the delicate blossom in the bottom-right corner.
- **Whispering Words**: Subtle celestial words drift softly across the screen periodically.
- **Music Toggle**: Top-right corner (defaults to muted). Supports `/music/birthday.mp3` with an ethereal ambient Web Audio chime synthesizer fallback.

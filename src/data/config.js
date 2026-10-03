// Configuration file for personalizing the birthday surprise website.

export const CONFIG = {
  // Her actual name
  HER_NAME: "Sri Dhanya",
  NICKNAME: "Mental",
  
  // Audio configuration
  audioSrc: "/music/Glass_Tides_-_Unwritten_Natasha_Bedingfield_Cover_(mp3.pm).mp3",
  
  // Optional final reveal toggle
  enableCreatorReveal: false,
  creatorSignature: "— someone who knows you a little too well (and has the scars from your face-slaps to prove it)",
  
  // Sri Dhanya Edition Lock & Timer Configuration
  editionUnlock: {
    // 24-hour format: 13 = 1 PM, 17 = 17 minutes (Today at 1:17 PM)
    targetHour: 13,
    targetMinute: 23,
    targetSecond: 0,
    timeDisplay: "1:17 PM",

    // Optional specific ISO date/time override (e.g. "2026-10-03T13:17:00")
    // Leave null to automatically lock till today at targetHour:targetMinute
    customDateOverride: null,

    // Set to true to bypass the lock for testing/previewing without waiting
    // Can also be bypassed in browser via ?unlock=true
    bypassLock: false,

    // Teasing & dialog messages
    lockTitle: "🔒 Sri Dhanya Edition is Locked!",
    lockNotice: "Avasara padadha Mental! Unmaiyana birthday celebration 1:17 PM-ku dhaan unlock aagum! ⏳ Adhu varaikum Main Character roast-ah anubhavi! 😜",
    lockedButtonText: "Locked until 1:17 PM",
    unlockedButtonText: "🌸 Switch to Sri Dhanya Edition (Unlocked!) ✨"
  },
  
  // Easter egg hints / messages
  easterEggs: {
    moonClicksRequired: 3,
    moonMessage: "Okay...\n\nyou weren't supposed\nto find this, Mental. 👀",
    flowerMessage: "You know exactly why this is here. 🌸",
    floatingWords: ["remember", "smile", "Mental", "laugh", "badminton", "cricket", "food"],

    // The Secret Flower Dialogue
    flowerDialog: {
      tag: "Secret Flower Unlocked 🌸",
      title: "Epudii... Tension aaniya? 😂",
      lines: [
        "Epudii Tension aaniya... 'Enoda birthday ku una pathiyeh potu vechurke' nu? 😂",
        "Adhu epudi una tension panama takkunu soliduvana! 😜",
        "Enaku theriyum... 'Ne la veladradu oru TT, adhu pathi peethitu iruka' nu nenachrupa... 'Ena da mental mari una pathiye peethirka' nu nenachrupa thaane? 🏓😆",
        "Seri edho un birthday nra naala happy ah irukatum nu vidra pathuko!"
      ],
      switchPrompt: "Ippo unakku oru choice tharen:",
      switchToHerText: "🌸 Switch to Sri Dhanya Edition (Full Appreciation!) ✨",
      keepMeText: "😈 Irukkattum, let me roast you first! (Main Character Mode)",
      
      // When already in Her mode
      activeHerTitle: "🌸 Sri Dhanya (Mental) Edition Active! ✨",
      activeHerMessage: "Mental!💖\nVenumna marubadiyum main character mode-ku maathikalaam!",
      switchToMeText: "👑 Switch to Main Character Roasting Mode",
      stayHerText: "Keep Sri Dhanya Edition 🌸"
    }
  }
};

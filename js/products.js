/*
  GAMES & TOOLS — everything on the Games and Tools pages comes from this list.

  To add a game or tool:
    1. Add an entry below (copy the commented example).
    2. Copy products/_template.html to products/<slug>.html and change
       data-product, the <title> and the description at the top of that file.
  Each list ends with a "locked" coming-soon slot teasing what's next.

  Fields
    slug        Short id used in the page file name and links (required)
    type        "game" or "tool" (required)
    name        Title (required)
    status      Shown as a tag, e.g. "Out now", "Early access", "In development", "Coming soon"
    tagline     One punchy line (required)
    summary     Two or three sentences for the top of its page
    cover       Box art / key art under img/ (portrait 3:4 works best for games)
    coverBg     Colour behind the cover while it loads
    genre       e.g. "Roguelike", "Puzzle", "Modding tool"
    platforms   e.g. ["Windows", "macOS", "Web", "Steam Deck"]
    links       Store / play / download buttons: [{ label, url }]
                  e.g. { label: "Wishlist on Steam", url: "https://store.steampowered.com/app/..." }
                  The first link is the main button on the page.
    price       Shown on the card, e.g. "$9.99", "Free", "Pay what you want"
    checkout    Hosted checkout link (Stripe Payment Link, Lemon Squeezy, itch.io…).
                  If set, a "Buy" button is added.
    trailer     YouTube video id (the part after watch?v=), shown on its page
    screenshots ["img/shot-1.png", ...]
    highlights  Features: [{ title, text }]
    specs       Details or system requirements: [["OS", "Windows 10+"], ...]
    faq         [{ q, a }]
    hidden      true to keep it here without showing it anywhere
*/
window.PRODUCTS = [
  {
    // TODO: check the wording and features before publishing.
    slug: "pixel-studio",
    type: "tool",
    name: "Pixel Studio",
    status: "Coming soon",
    tagline: "AI pixel art generator and animator for game development.",
    summary: "Describe a character and Pixel Studio draws it as a pixel-art sprite, then animates it: idles, attacks, jumps, spellcasts and more. Built for game developers who need a full cast of animated characters without drawing every frame by hand.",
    cover: "img/pixel-studio-cover.png",
    coverBg: "#261D1E",
    genre: "Pixel art & animation",
    platforms: ["Web UI"],
    highlights: [
      { title: "Characters from a prompt", text: "Describe who you need and get a pixel-art character in 8-, 16- or 32-bit style." },
      { title: "Animation sets", text: "Idle, attacks, jump, jump attack, spellcast, use item, take damage and death, all on-model with your character." },
      { title: "Made for game dev", text: "Built to produce sprites you can drop straight into a game, not one-off pictures." }
    ]
  },
  // Example: remove the // from these lines and fill them in.
  // {
  //   slug: "my-game",
  //   type: "game",
  //   name: "My Game",
  //   status: "In development",
  //   tagline: "One punchy line about the game.",
  //   summary: "Two or three sentences: what you do, why it's fun.",
  //   cover: "img/my-game-cover.png",
  //   genre: "Roguelike",
  //   platforms: ["Windows", "Steam Deck"],
  //   links: [{ label: "Wishlist on Steam", url: "https://store.steampowered.com/app/000000" }],
  //   price: "$9.99",
  //   checkout: "",
  //   trailer: "dQw4w9WgXcQ",
  //   screenshots: ["img/my-game-1.png", "img/my-game-2.png"],
  //   highlights: [{ title: "Feature", text: "Why it's cool." }],
  //   specs: [["OS", "Windows 10 or later"], ["Storage", "500 MB"]],
  //   faq: [{ q: "Is there controller support?", a: "Yes." }]
  // }
];

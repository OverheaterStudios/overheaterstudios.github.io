/*
  GAMES & TOOLS — everything on the Games and Tools pages comes from this list.

  To add a game or tool:
    1. Add an entry below (copy the commented example).
    2. Copy products/_template.html to products/<slug>.html and change
       data-product, the <title> and the description at the top of that file.
  While a list is empty, its page shows a "locked" coming-soon slot with a sign-up link.

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

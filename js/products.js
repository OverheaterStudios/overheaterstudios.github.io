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
    // TODO: check the wording and the platforms before publishing.
    // Copy is adapted from the Notfi Tunnels site (jerhemy.com/notfi-tunnels).
    slug: "notfi-tunnels",
    type: "tool",
    name: "Notfi Tunnels",
    status: "Closed beta",
    tagline: "Self-hosted tunnels to your local services and devices.",
    summary: "Give a web app on your laptop, an SSH port on a field device, or a service inside your app a public address, through a server you run yourself. One command opens an HTTPS or TCP tunnel, and a web dashboard shows every tunnel, device and request live.",
    cover: "img/notfi-tunnels-cover.svg",
    coverBg: "#0f1033",
    genre: "Developer tool",
    platforms: ["Windows", "macOS", "Linux", "Docker"],
    links: [
      { label: "Visit the site", url: "https://jerhemy.com/notfi-tunnels/" }
    ],
    screenshots: [
      "img/notfi-tunnels/dashboard-tunnels.png",
      "img/notfi-tunnels/dashboard-devices.png",
      "img/notfi-tunnels/dashboard-account.png"
    ],
    highlights: [
      { title: "HTTP and TCP tunnels", text: "Web apps get an HTTPS subdomain with WebSockets, streaming and large uploads. SSH, databases and anything else get a TCP port." },
      { title: "Devices on demand", text: "Agents on devices hold one quiet connection and open SSH or a web UI only when someone asks, for as long as they ask." },
      { title: "Web dashboard", text: "Live tunnels with traffic graphs, history, devices, fixed subdomains, users and an activity log of every sign-in and change." },
      { title: "Request inspector", text: "See every request and response on your machine, replay it, or copy it as curl." },
      { title: "Built for code", text: "A .NET client library opens tunnels inside your app, and --json makes the CLI easy to drive from any language." },
      { title: "Your server, your rules", text: "The server is a single executable with the dashboard built in. Run it on Linux, Windows, macOS or in Docker." }
    ],
    specs: [
      ["Client", "Windows x64, macOS (Apple silicon), Linux x64 and ARM64"],
      ["Server", "Linux, Docker, Windows or macOS"],
      ["Libraries", ".NET (NuGet: Notfi.Tunnels.Client)"],
      ["Latest release", "v0.13.2"]
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

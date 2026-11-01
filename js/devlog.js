/*
  DEVLOG — posts on the Devlog page, newest first (they're sorted by date).
  The newest post is also teased on the home page.

  Fields
    date    "YYYY-MM-DD" (required)
    title   Post title (required)
    tag     Optional short label, e.g. "Studio", a game's name, "Patch notes"
    body    Paragraphs: ["First paragraph.", "Second paragraph."]
    hidden  true to keep a draft here without showing it
*/
window.DEVLOG = [
  {
    // TODO: rewrite in your own words (or delete) before publishing.
    date: "2026-10-31",
    title: "The forge is lit",
    tag: "Studio",
    body: [
      "Overheater Studios has a new home on the web. This is where our games and tools will live, and where we'll post updates as we build them.",
      "Nothing to play just yet, but things are heating up. First up is Pixel Studio, a pixel art generator and animator for game development. We'll post progress here as it comes together."
    ]
  }
];

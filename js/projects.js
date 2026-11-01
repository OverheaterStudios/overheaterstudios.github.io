/*
  PREVIOUSLY SHIPPED — past projects shown on the About page.

  Fields
    title     Project name (required)
    kind      Short type, e.g. "Mobile app" (required)
    summary   One or two sentences (required)
    did       What Overheater built — shown as a short list
    client    Client name (optional)
    year      Year or range (optional)
    url       Public link (optional)
    badge     Short status next to the type, e.g. "Acquired" (optional)
    note      One line under the details (optional)
    image     Picture under img/ (optional); imageBg sets the colour behind it
    hidden    true to keep a project here without showing it
*/
window.PROJECTS = [
  {
    // TODO: confirm what was built (the old site said "Mobile Application").
    title: "Drive-A-Logue",
    kind: "Mobile game app",
    summary: "A research-based conversation card game that gets families talking through real situations kids face, from bullying to social media, before they happen.",
    did: ["Mobile app for the Drive-A-Logue card game"],
    client: "Adam Brooks",
    badge: "Acquired",
    note: "Built and launched by Overheater Studios. The app has since been acquired by another company.",
    image: "img/drivealogue.jpg",
    imageBg: "#ffffff"
  }
];

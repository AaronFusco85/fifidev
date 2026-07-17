// Each pairing: a real club (name, league, city) + the wine on our list from
// that same city/region. Jersey colors are the club's real kit colors,
// rendered as a simple striped shape — deliberately NOT reproducing any
// club's actual crest/logo artwork, to stay clear of trademark issues while
// still being instantly recognizable.
//
// Trimmed to the 9 most globally recognizable clubs. That means a few wines
// (Muscadet, Albariño, Chenin Blanc, Chablis) don't appear — their natural
// regional clubs (Nantes, Celta Vigo, Tours, Auxerre) aren't famous enough
// to make this cut. Dessert wines are excluded throughout.
//
// To change a pairing: edit any entry below. wineId must match an id in
// the Wines sheet/tab.

window.TEAM_QUIZ_PAIRINGS = [
  {
    team: "FC Barcelona",
    league: "La Liga, Spain",
    city: "Barcelona",
    colors: ["#a50044", "#004d98"],
    wineId: "m-01",
    funFact: "Avinyó's Cava vineyards sit in the Penedès, less than an hour outside Barcelona."
  },
  {
    team: "Stade de Reims",
    league: "Ligue 1, France",
    city: "Reims",
    colors: ["#c8102e", "#ffffff"],
    wineId: "m-02",
    funFact: "Reims sits at the heart of the Champagne region — Michel Gonet's cellars are a short drive from the stadium."
  },
  {
    team: "Stade de Reims",
    league: "Ligue 1, France",
    city: "Reims",
    colors: ["#c8102e", "#ffffff"],
    wineId: "m-03",
    funFact: "Laurent-Perrier is based in Tours-sur-Marne, right in Champagne's Montagne de Reims — Stade de Reims's home turf."
  },
  {
    team: "Stade de Reims",
    league: "Ligue 1, France",
    city: "Reims",
    colors: ["#c8102e", "#ffffff"],
    wineId: "m-04",
    funFact: "Laurent-Perrier is based in Tours-sur-Marne, right in Champagne's Montagne de Reims — Stade de Reims's home turf."
  },
  {
    team: "Stade de Reims",
    league: "Ligue 1, France",
    city: "Reims",
    colors: ["#c8102e", "#ffffff"],
    wineId: "m-05",
    funFact: "Laurent-Perrier is based in Tours-sur-Marne, right in Champagne's Montagne de Reims — Stade de Reims's home turf."
  },
  {
    team: "Paris Saint-Germain",
    league: "Ligue 1, France",
    city: "Paris",
    colors: ["#004170", "#da291c"],
    wineId: "m-07",
    funFact: "A loose one — Sancerre doesn't have a big club of its own, so we gave it France's most famous name instead."
  },
  {
    team: "Athletic Bilbao",
    league: "La Liga, Spain",
    city: "Bilbao",
    colors: ["#ee2523", "#ffffff"],
    wineId: "m-11",
    funFact: "Ameztoi's vineyards sit on the Basque coast, not far from Bilbao."
  },
  {
    team: "Olympique de Marseille",
    league: "Ligue 1, France",
    city: "Marseille",
    colors: ["#ffffff", "#5fa8d3"],
    wineId: "m-12",
    funFact: "A loose one — Marseille is the biggest name in the south of France, even if the Rhône vineyards are a bit inland."
  },
  {
    team: "Real Madrid",
    league: "La Liga, Spain",
    city: "Madrid",
    colors: ["#ffffff", "#febe10"],
    wineId: "m-13",
    funFact: "A loose one — Méntrida is closer to Madrid than any other big wine region on our list, so we paired it with the biggest name in Spanish football."
  },
  {
    team: "Olympique Lyonnais",
    league: "Ligue 1, France",
    city: "Lyon",
    colors: ["#ffffff", "#0b3d91"],
    wineId: "m-14",
    funFact: "A loose one — Lyon is the nearest major football city to Burgundy's Côte de Nuits."
  },
  {
    team: "Olympique de Marseille",
    league: "Ligue 1, France",
    city: "Marseille",
    colors: ["#ffffff", "#5fa8d3"],
    wineId: "m-15",
    funFact: "Same pairing as the Chêne Bleu rosé — both from the southern Rhône."
  },
  {
    team: "Girondins de Bordeaux",
    league: "France",
    city: "Bordeaux",
    colors: ["#003399", "#87ceeb"],
    wineId: "m-16",
    funFact: "Vieux Château Champs de Mars is right in Bordeaux's backyard, in Castillon."
  },
  {
    team: "Atlético Madrid",
    league: "La Liga, Spain",
    city: "Madrid",
    colors: ["#c8102e", "#ffffff"],
    wineId: "m-17",
    funFact: "A loose one — Ribera del Duero is north of Madrid, so we paired it with one of Spain's biggest clubs rather than the smaller local side."
  }
];

// Each pairing: a real club (name, league, city) + the wine on our list from
// that same city/region. Jersey colors are the club's real kit colors,
// rendered as a simple striped shape — deliberately NOT reproducing any
// club's actual crest/logo artwork, to stay clear of trademark issues while
// still being instantly recognizable.
//
// To change a pairing: edit any entry below. wineId must match an id in
// the Wines sheet/tab.

window.TEAM_QUIZ_PAIRINGS = [
  {
    team: "Stade de Reims",
    league: "Ligue 1, France",
    city: "Reims",
    colors: ["#c8102e", "#ffffff"],
    wineId: "m-02",
    funFact: "Reims sits at the heart of the Champagne region — Michel Gonet's cellars are a short drive from the stadium."
  },
  {
    team: "FC Barcelona",
    league: "La Liga, Spain",
    city: "Barcelona",
    colors: ["#a50044", "#004d98"],
    wineId: "m-01",
    funFact: "Avinyó's Cava vineyards sit in the Penedès, less than an hour outside Barcelona."
  },
  {
    team: "AJ Auxerre",
    league: "Ligue 1, France",
    city: "Auxerre",
    colors: ["#ffffff", "#0033a0"],
    wineId: "m-10",
    funFact: "Chablis is a short drive from Auxerre — same corner of Burgundy, same Kimmeridgian soil."
  },
  {
    team: "Girondins de Bordeaux",
    league: "Ligue 1, France",
    city: "Bordeaux",
    colors: ["#003399", "#87ceeb"],
    wineId: "m-16",
    funFact: "Vieux Château Champs de Mars is right in Bordeaux's backyard, in Castillon."
  },
  {
    team: "Celta Vigo",
    league: "La Liga, Spain",
    city: "Vigo",
    colors: ["#8ac6e8", "#ffffff"],
    wineId: "m-08",
    funFact: "Vigo sits right in Rías Baixas, Albariño's home turf in Galicia."
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
    team: "Real Valladolid",
    league: "La Liga, Spain",
    city: "Valladolid",
    colors: ["#5b2d90", "#ffffff"],
    wineId: "m-17",
    funFact: "Valladolid is the unofficial capital of Ribera del Duero, Tempranillo's home region."
  },
  {
    team: "FC Porto",
    league: "Primeira Liga, Portugal",
    city: "Porto",
    colors: ["#0033a0", "#ffffff"],
    wineId: "m-23",
    funFact: "Port wine is literally named for the city of Porto, at the mouth of the Douro."
  }
];

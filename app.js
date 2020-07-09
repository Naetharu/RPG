const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const { forEach } = require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* Data constants to create sample text --- to be removed! */

const bio1 =
  "Morick is a dwarven ranger. He was once part of the Kur-Kurek Wilders, but that was a lifetime ago. These days he spends his time living a simple life. Based out of the Boatsman Inn in Ranshore, he makes a living as a guide and caravan guard for the many merchants moving their goods from Kur-Kurek into the New Kingdoms. The work is dangerous but it pays well enough. Between caravan jobs, Morick spends time out in the wilds. He has build a small cabin a few miles into the Wittlewood and spends as much time out there as he can. He finds the quiet and solitude suits him well.";

const bio2 = "Hogan is human warrior. He was born and raised in Rottfurt, growing up in the waterfront district. He earned his stripes running with Herman Furg’s “Waterboy” gang. After the bleak winter of 1217 Rottfurt was abandoned and Hogan travelled south with the other refugees. He soon found himself in Ayac City where he made a living as a street boxer. After some time he was picked up by some of the promoters and made his way into the cities arena. Three years of fights and a mighty winning streak set Hogan up for life. Today he lives in a sizable townhouse where enjoys the finer things in life.";


const characters = [
  {
    name: "Morick",
    bio: bio1,
    stats: {
      str: 12,
      dex: 14,
      con: 12,
      int: 10,
      wis: 12,
      cha: 08,
    },
    skills: {
      skill1: "Tracking",
      skill2: "Wilderness survival",
      skill3: "Trading",
      skill4: "Repair",
    },
    feats: {
      feat1: "Danger sense",
      feat2: "Clear vision",
      feat3: "Snap Shot",
      feat4: "Stealthy movement",
    },
    powers: {
      power1: "Patient shot",
      power2: "Bolas",
      power3: "Throw knife",
      power4: "Haymaker",
    },
    secStat: {
      armour: 16,
      reflex: 4,
      willpower: 2,
      toughness: 2,
      melee: 3,
      range: 5,
    },
  },
  {
    name: "Hogan",
    bio: bio2,
    stats: {
      str: 16,
      dex: 14,
      con: 14,
      int: 10,
      wis: 10,
      cha: 10,
    },
    skills: {
      skill1: "Tactics",
      skill2: "Street Smarts",
      skill3: "Intimidation",
      skill4: "Business",
    },
    feats: {
      feat1: "Reposte",
      feat2: "Second Wind",
      feat3: "Quick Refelxes",
      feat4: "Crowd Pleaser",
    },
    powers: {
      power1: "Deadly Strike",
      power2: "Concussion Blow",
      power3: "Grappler",
      power4: "Fancy Footwork",
    },
    secStat: {
      armour: 20,
      reflex: 4,
      willpower: 2,
      toughness: 4,
      melee: 6,
      range: 2,
    },
  },
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/place", (req, res) => {
  res.render("place");
});

app.get("/character/:character", (req, res) => {
  const charReq = lodash.lowerCase(req.params.character);

  characters.forEach((character) => {
    const charCheck = lodash.lowerCase(character.name);

    if (charReq === charCheck) {
      res.render("character", {
        pic: lodash.toLower(character.name),
        name: character.name,
        bio: character.bio,
        stats: character.stats,
        skills: character.skills,
        feats: character.feats,
        powers: character.powers,
        sec: character.secStat,
      });
    }
  });
});

app.get("/characters", (req, res) => {
  res.render("characters", {
    characters: characters,
  });
});

app.get("/journal", (req, res) => {
  res.render("journal")
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});

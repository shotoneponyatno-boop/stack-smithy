window.MONSTER_TROOPS_DATA = [
  {
    name: "Citadel Wall",
    tier: 5,
    strength: 10000,
    health: 30000,
    strengthAgainst: {
      melee: 100,
      ranged: 100,
      mounted: 100
    },
    tags: ["fortifications"]
  },
  {
    name: "Dwarf",
    tier: 0,
    strength: 28,
    health: 84,
    strengthAgainst: {
      mounted: 10
    },
    tags: ["melee", "elves"]
  },
  {
    name: "Elven Archer",
    tier: 1,
    strength: 100,
    health: 300,
    strengthAgainst: {
      melee: 35
    },
    tags: ["ranged", "elves"]
  },
  {
    name: "Druid",
    tier: 2,
    strength: 900,
    health: 2700,
    strengthAgainst: {
      melee: 25
    },
    tags: ["ranged", "elves"]
  },
  {
    name: "Bear",
    tier: 5,
    strength: 22000,
    health: 66000,
    strengthAgainst: {
      elemental: 50,
      mounted: 70
    },
    tags: ["melee", "beast", "elves"]
  },
  {
    name: "Pegasus Rider",
    tier: 4,
    strength: 8200,
    health: 24600,
    strengthAgainst: {
      dragons: 50,
      melee: 60
    },
    tags: ["flying", "elves"]
  },
  {
    name: "Centaur",
    tier: 3,
    strength: 2600,
    health: 7800,
    strengthAgainst: {
      ranged: 50,
      engineer: 20
    },
    tags: ["mounted", "elves"]
  },
  {
    name: "Ent",
    tier: 6,
    strength: 73000,
    health: 219000,
    strengthAgainst: {
      dragons: 45,
      ranged: 20
    },
    tags: ["melee", "elemental", "elves"]
  },
  {
    name: "Unicorn Rider",
    tier: 5,
    strength: 27000,
    health: 81000,
    strengthAgainst: {
      ranged: 65
    },
    tags: ["mounted", "elves"]
  },
  {
    name: "Life Dragon",
    tier: 7,
    strength: 240000,
    health: 720000,
    strengthAgainst: {
      giants: 50,
      mounted: 60
    },
    tags: ["flying", "dragon", "elves"]
  },
  {
    name: "Werewolf",
    tier: 2,
    strength: 360,
    health: 1080,
    strengthAgainst: {
      mounted: 45
    },
    tags: ["melee", "beast", "cursed"]
  },
  {
    name: "Death Rider",
    tier: 3,
    strength: 3200,
    health: 9600,
    strengthAgainst: {
      ranged: 50
    },
    tags: ["mounted", "cursed"]
  },
  {
    name: "Giant Zombie",
    tier: 5,
    strength: 33000,
    health: 99000,
    strengthAgainst: {
      beasts: 45,
      mounted: 70
    },
    tags: ["melee", "giant", "cursed"]
  },
  {
    name: "Cursed Dragon",
    tier: 7,
    strength: 320000,
    health: 960000,
    strengthAgainst: {
      giants: 50,
      mounted: 50
    },
    tags: ["flying", "dragon", "cursed"]
  },
  {
    name: "Bull Rider",
    tier: 5,
    strength: 29000,
    health: 87000,
    strengthAgainst: {
      ranged: 55,
    },
    tags: ["mounted", "cursed"]
  },
  {
    name: "Pegasus Rider",
    tier: 4,
    strength: 8200,
    health: 24600,
    strengthAgainst: {
      dragons: 50,
      melee: 60
    },
    tags: ["flying", "elves"]
  },
  {
    name: "Cursed Dendroid",
    tier: 6,
    strength: 110000,
    health: 330000,
    tags: ["melee", "elemental", "cursed"]
  },
  {
    name: "Overseer",
    tier: 3,
    strength: 6500,
    health: 19500,
    tags: ["ranged", "demon"]
  },
  {
    name: "Ifrit",
    tier: 5,
    strength: 44000,
    health: 132000,
    tags: ["flying", "demon"]
  },
  {
    name: "Fireworm Rider",
    tier: 5,
    strength: 50000,
    health: 150000,
    tags: ["mounted", "demon"]
  },
  {
    name: "Fire Hydra",
    tier: 3,
    strength: 100000,
    health: 300000,
    tags: ["melee", "demon"]
  },
  {
    name: "Necromanser",
    tier: 2,
    strength: 720,
    health: 2160,
    tags: ["ranged", "undead"]
  },
  {
    name: "Bone Golem",
    tier: 6,
    strength: 70000,
    health: 210000,
    tags: ["melee", "undead"]
  },
  {
    name: "Death Chariot",
    tier: 6,
    strength: 57000,
    health: 171000,
    tags: ["mounted", "undead"]
  },
  {
    name: "Demon",
    tier: 3,
    strength: 100000,
    health: 300000,
    tags: ["flying", "undead"]
  },
  {
    name: "Runic Guardian",
    tier: 1,
    strength: 400,
    health: 1200,
    strengthAgainst: {},
    tags: ["runic"]
  },
  {
    name: "Malicious Mantis",
    tier: 2,
    strength: 11000,
    health: 33000,
    tags: ["melee", "swarm"]
  },
  {
    name: "Caterpillar Cavalry",
    tier: 2,
    strength: 11000,
    health: 33000,
    tags: ["mounted", "swarm"]
  },
  {
    name: "Elusive Wasp",
    tier: 2,
    strength: 11000,
    health: 33000,
    tags: ["flying", "swarm"]
  },
  {
    name: "Merciless Arachne",
    tier: 3,
    strength: 50000,
    health: 150000,
    tags: ["ranged", "swarm"]
  },
  {
    name: "Headsman",
    tier: 3,
    strength: 2300,
    health: 6900,
    tags: ["melee", "undead"]
  },
  {
    name: "Dark Rider",
    tier: 4,
    strength: 5800,
    health: 17400,
    tags: ["mounted", "undead"]
  },
  {
    name: "Deathhound Rider",
    tier: 2,
    strength: 1100,
    health: 3300,
    tags: ["mounted", "undead"]
  },
  {
    name: "Banshee",
    tier: 1,
    strength: 100,
    health: 300,
    tags: ["ranged", "undead"]
  },
  {
    name: "Ghoul",
    tier: 0,
    strength: 28,
    health: 84,
    tags: ["melee", "beast", "undead"]
  },
  {
    name: "Skeleton",
    tier: 0,
    strength: 56,
    health: 168,
    tags: ["melee", "cursed"]
  },
  {
    name: "Goblin",
    tier: 0,
    strength: 28,
    health: 84,
    tags: ["melee", "barbarian"]
  },
  {
    name: "Fiend",
    tier: 0,
    strength: 28,
    health: 84,
    tags: ["melee", "demon"]
  },
  {
    name: "Witch Doctor",
    tier: 1,
    strength: 150,
    health: 450,
    tags: ["ranged", "cursed"]
  },
  {
    name: "Wolf Rider",
    tier: 1,
    strength: 150,
    health: 450,
    tags: ["mounted", "barbarian"]
  },
  {
    name: "Magog",
    tier: 1,
    strength: 50,
    health: 150,
    tags: ["ranged", "demon"]
  },
  {
    name: "Jaguar Rider",
    tier: 2,
    strength: 270,
    health: 810,
    tags: ["mounted", "cursed"]
  },
  {
    name: "Axe Thrower",
    tier: 2,
    strength: 360,
    health: 1080,
    tags: ["ranged", "barbarian"]
  },
  {
    name: "Horned Demon",
    tier: 2,
    strength: 720,
    health: 2160,
    tags: ["melee", "demon"]
  },
  {
    name: "Firehorse Rider",
    tier: 3,
    strength: 4100,
    health: 12300,
    tags: ["mounted", "demon"]
  },
  {
    name: "Mechanical Griffin",
    tier: 2,
    strength: 70000,
    health: 210000,
    tags: ["flying", "ancient"]
  },
  {
    name: "Ancient Arbalester",
    tier: 2,
    strength: 720,
    health: 2160,
    tags: ["ranged", "ancient"]
  },
  {
    name: "Golden Guardian",
    tier: 3,
    strength: 100000,
    health: 300000,
    tags: ["melee", "ancient"]
  },
  {
    name: "Tiger Rider",
    tier: 2,
    strength: 57000,
    health: 171000,
    tags: ["mounted", "ancient"]
  },
  {
    name: "Shadow Warrior",
    tier: 3,
    strength: 9920,
    health: 29760,
    tags: ["melee", "guardsmen", "shadow"]
  },
  {
    name: "Shadow Ranger",
    tier: 3,
    strength: 9920,
    health: 29760,
    tags: ["ranged", "guardsmen", "shadow"]
  },
  {
    name: "Shadow Rider",
    tier: 3,
    strength: 19840,
    health: 59520,
    tags: ["mounted", "guardsmen", "shadow"]
  },
  {
    name: "Shadow Corax",
    tier: 3,
    strength: 99200,
    health: 297600,
    tags: ["flying", "guardsmen", "shadow"]
  }
];

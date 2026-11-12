const troopData = [{
    id: "archer-1",
    name: "Archer 1",
    pillLabel: "ARC 1",
    group: "guardsmen",
    tier: 1,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 150,
    strength: 50,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 67,
        melee: 52
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 15,
        display: "15s"
    },
    trainingCost: {
        silver: 300
    }
}, {
    id: "spearman-1",
    name: "Spearman 1",
    pillLabel: "SP 1",
    group: "guardsmen",
    tier: 1,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 150,
    strength: 50,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 39,
        beasts: 80
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 15,
        display: "15s"
    },
    trainingCost: {
        silver: 300
    }
}, {
    id: "rider-1",
    name: "Rider 1",
    pillLabel: "RD 1",
    group: "guardsmen",
    tier: 1,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 300,
    strength: 100,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 65,
        engineers: 54
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 30,
        display: "30s"
    },
    trainingCost: {
        silver: 600
    }
}, {
    id: "archer-2",
    name: "Archer 2",
    pillLabel: "ARC 2",
    group: "guardsmen",
    tier: 2,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 270,
    strength: 90,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 101,
        melee: 78
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 180,
        display: "180s"
    },
    trainingCost: {
        silver: 500
    }
}, {
    id: "spearman-2",
    name: "Spearman 2",
    pillLabel: "SP 2",
    group: "guardsmen",
    tier: 2,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 270,
    strength: 90,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 59,
        beasts: 120
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 180,
        display: "180s"
    },
    trainingCost: {
        silver: 500
    }
}, {
    id: "rider-2",
    name: "Rider 2",
    pillLabel: "RD 2",
    group: "guardsmen",
    tier: 2,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 540,
    strength: 180,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 98,
        engineers: 81
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 360,
        display: "360s"
    },
    trainingCost: {
        silver: 1e3
    }
}, {
    id: "archer-3",
    name: "Archer 3",
    pillLabel: "ARC 3",
    group: "guardsmen",
    tier: 3,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 480,
    strength: 160,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 151,
        melee: 117
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 420,
        display: "7m"
    },
    trainingCost: {
        silver: 700
    }
}, {
    id: "spearman-3",
    name: "Spearman 3",
    pillLabel: "SP 3",
    group: "guardsmen",
    tier: 3,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 480,
    strength: 160,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 88,
        beasts: 180
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 420,
        display: "7m"
    },
    trainingCost: {
        silver: 700
    }
}, {
    id: "rider-3",
    name: "Rider 3",
    pillLabel: "RD 3",
    group: "guardsmen",
    tier: 3,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 960,
    strength: 320,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 146,
        engineers: 122
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 840,
        display: "14m"
    },
    trainingCost: {
        silver: 1400
    }
}, {
    id: "archer-4",
    name: "Archer 4",
    pillLabel: "ARC 4",
    group: "guardsmen",
    tier: 4,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 870,
    strength: 290,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 226,
        melee: 176
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 480,
        display: "8m"
    },
    trainingCost: {
        silver: 900
    }
}, {
    id: "spearman-4",
    name: "Spearman 4",
    pillLabel: "SP 4",
    group: "guardsmen",
    tier: 4,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 870,
    strength: 290,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 132,
        beasts: 270
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 480,
        display: "8m"
    },
    trainingCost: {
        silver: 900
    }
}, {
    id: "rider-4",
    name: "Rider 4",
    pillLabel: "RD 4",
    group: "guardsmen",
    tier: 4,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 1740,
    strength: 580,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 219,
        engineers: 182
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 960,
        display: "16m"
    },
    trainingCost: {
        silver: 1800
    }
}, {
    id: "archer-5",
    name: "Archer 5",
    pillLabel: "ARC 5",
    group: "guardsmen",
    tier: 5,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 1560,
    strength: 520,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 339,
        melee: 263
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 540,
        display: "9m"
    },
    trainingCost: {
        silver: 1100
    }
}, {
    id: "spearman-5",
    name: "Spearman 5",
    pillLabel: "SP 5",
    group: "guardsmen",
    tier: 5,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 1560,
    strength: 520,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 197,
        beasts: 405
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 540,
        display: "9m"
    },
    trainingCost: {
        silver: 1100
    }
}, {
    id: "rider-5",
    name: "Rider 5",
    pillLabel: "RD 5",
    group: "guardsmen",
    tier: 5,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 3150,
    strength: 1050,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 329,
        engineers: 273
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1080,
        display: "18m"
    },
    trainingCost: {
        silver: 2200
    }
}, {
    id: "battle-griffin-5",
    name: "Battle Griffin 5",
    pillLabel: "BGF 5",
    group: "guardsmen",
    tier: 5,
    category: "flying",
    isHuman: !1,
    leadershipCost: 20,
    health: 3e4,
    race: "beast",
    strength: 1e4,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 395,
        fortifications: 208
    },
    revivalCost: {
        gold: 80
    },
    trainingTime: {
        seconds: 10800,
        display: "180m"
    },
    trainingCost: {
        silver: 22e3
    }
}, {
    id: "heavy-arbalester-6",
    name: "Heavy Arbalester 6",
    pillLabel: "HARB 6",
    group: "guardsmen",
    tier: 6,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 2820,
    strength: 940,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 509,
        melee: 395
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 600,
        display: "10m"
    },
    trainingCost: {
        silver: 1300
    }
}, {
    id: "heavy-halberdier-6",
    name: "Heavy Halberdier 6",
    pillLabel: "HHAL 6",
    group: "guardsmen",
    tier: 6,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 2820,
    strength: 940,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 296,
        beasts: 608
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 600,
        display: "10m"
    },
    trainingCost: {
        silver: 1300
    }
}, {
    id: "mounted-knight-6",
    name: "Mounted Knight 6",
    pillLabel: "MK 6",
    group: "guardsmen",
    tier: 6,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 5700,
    strength: 1900,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 494,
        engineers: 410
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1200,
        display: "20m"
    },
    trainingCost: {
        silver: 2600
    }
}, {
    id: "battle-griffin-6",
    name: "Battle Griffin 6",
    pillLabel: "BGF 6",
    group: "guardsmen",
    tier: 6,
    category: "flying",
    isHuman: !1,
    leadershipCost: 20,
    health: 57e3,
    race: "beast",
    strength: 19e3,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 592,
        fortifications: 311
    },
    revivalCost: {
        gold: 80
    },
    trainingTime: {
        seconds: 12e3,
        display: "200m"
    },
    trainingCost: {
        silver: 26e3
    }
}, {
    id: "heavy-arbalester-7",
    name: "Heavy Arbalester 7",
    pillLabel: "HARB 7",
    group: "guardsmen",
    tier: 7,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 5100,
    strength: 1700,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 763,
        melee: 592
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 660,
        display: "11m"
    },
    trainingCost: {
        silver: 1500
    }
}, {
    id: "heavy-halberdier-7",
    name: "Heavy Halberdier 7",
    pillLabel: "HHAL 7",
    group: "guardsmen",
    tier: 7,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 5100,
    strength: 1700,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 444,
        beasts: 911
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 660,
        display: "11m"
    },
    trainingCost: {
        silver: 1500
    }
}, {
    id: "mounted-knight-7",
    name: "Mounted Knight 7",
    pillLabel: "MK 7",
    group: "guardsmen",
    tier: 7,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 10200,
    strength: 3400,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 740,
        engineers: 615
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1320,
        display: "22m"
    },
    trainingCost: {
        silver: 3e3
    }
}, {
    id: "battle-griffin-7",
    name: "Battle Griffin 7",
    pillLabel: "BGF 7",
    group: "guardsmen",
    tier: 7,
    category: "flying",
    isHuman: !1,
    leadershipCost: 20,
    health: 102e3,
    race: "beast",
    strength: 34e3,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 888,
        fortifications: 467
    },
    revivalCost: {
        gold: 80
    },
    trainingTime: {
        seconds: 13200,
        display: "220m"
    },
    trainingCost: {
        silver: 3e4
    }
}, {
    id: "purifier-1",
    name: "Purifier 1",
    pillLabel: "PUR 1",
    group: "guardsmen",
    tier: 8,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 9180,
    strength: 3060,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 1145,
        melee: 888
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 720,
        display: "12m"
    },
    trainingCost: {
        silver: 1700
    }
}, {
    id: "punisher-1",
    name: "Punisher 1",
    pillLabel: "PUN 1",
    group: "guardsmen",
    tier: 8,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 9180,
    strength: 3060,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 667,
        beasts: 1367
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 720,
        display: "12m"
    },
    trainingCost: {
        silver: 1700
    }
}, {
    id: "smiter-1",
    name: "Smiter 1",
    pillLabel: "SMI 1",
    group: "guardsmen",
    tier: 8,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 18360,
    strength: 6120,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 1111,
        engineers: 923
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1440,
        display: "24m"
    },
    trainingCost: {
        silver: 3400
    }
}, {
    id: "corax-1",
    name: "Corax 1",
    pillLabel: "CRX 1",
    group: "guardsmen",
    tier: 8,
    category: "flying",
    isHuman: !0,
    leadershipCost: 20,
    health: 183600,
    strength: 61200,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 1333,
        fortifications: 701
    },
    revivalCost: {
        gold: 80
    },
    trainingTime: {
        seconds: 14400,
        display: "240m"
    },
    trainingCost: {
        silver: 34e3
    }
}, {
    id: "purifier-2",
    name: "Purifier 2",
    pillLabel: "PUR 2",
    group: "guardsmen",
    tier: 9,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 16530,
    strength: 5510,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        flying: 1717,
        melee: 1333
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 780,
        display: "13m"
    },
    trainingCost: {
        silver: 1900
    }
}, {
    id: "punisher-2",
    name: "Punisher 2",
    pillLabel: "PUN 2",
    group: "guardsmen",
    tier: 9,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 16530,
    strength: 5510,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 1e3,
        beasts: 2050
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 780,
        display: "13m"
    },
    trainingCost: {
        silver: 1900
    }
}, {
    id: "smiter-2",
    name: "Smiter 2",
    pillLabel: "SMI 2",
    group: "guardsmen",
    tier: 9,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 33060,
    strength: 11020,
    playerBattleStrengthMultiplier: 1,
    doubleDamageChance: 5,
    strengthAgainst: {
        ranged: 1667,
        engineers: 1384
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1560,
        display: "26m"
    },
    trainingCost: {
        silver: 3800
    }
}, {
    id: "corax-2",
    name: "Corax 2",
    pillLabel: "CRX 2",
    group: "guardsmen",
    tier: 9,
    category: "flying",
    isHuman: !0,
    leadershipCost: 20,
    health: 330600,
    strength: 110200,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        mounted: 1999,
        fortifications: 1051
    },
    revivalCost: {
        gold: 80
    },
    trainingTime: {
        seconds: 15600,
        display: "260m"
    },
    trainingCost: {
        silver: 38e3
    }
}, {
    id: "swordsman-1",
    name: "Swordsman 1",
    pillLabel: "SW 1",
    group: "specialist",
    tier: 1,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 150,
    strength: 50,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 20,
        beasts: 40,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 15,
        display: "15s"
    },
    trainingCost: {
        silver: 300
    }
}, {
    id: "swordsman-2",
    name: "Swordsman 2",
    pillLabel: "SW 2",
    group: "specialist",
    tier: 2,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 270,
    strength: 90,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 29,
        beasts: 60,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 180,
        display: "180s"
    },
    trainingCost: {
        silver: 500
    }
}, {
    id: "swordsman-3",
    name: "Swordsman 3",
    pillLabel: "SW 3",
    group: "specialist",
    tier: 3,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 480,
    strength: 160,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 44,
        beasts: 90,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 420,
        display: "7m"
    },
    trainingCost: {
        silver: 700
    }
}, {
    id: "swordsman-4",
    name: "Swordsman 4",
    pillLabel: "SW 4",
    group: "specialist",
    tier: 4,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 870,
    strength: 290,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 66,
        beasts: 135,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 480,
        display: "8m"
    },
    trainingCost: {
        silver: 900
    }
}, {
    id: "swordsman-5",
    name: "Swordsman 5",
    pillLabel: "SW 5",
    group: "specialist",
    tier: 5,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 1560,
    strength: 520,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 99,
        beasts: 203,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 540,
        display: "9m"
    },
    trainingCost: {
        silver: 1100
    }
}, {
    id: "deadshot-5",
    name: "Deadshot 5",
    pillLabel: "DS 5",
    group: "specialist",
    tier: 5,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 1560,
    strength: 520,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        flying: 170,
        melee: 132,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 540,
        display: "9m"
    },
    trainingCost: {
        silver: 1100
    }
}, {
    id: "lion-rider-5",
    name: "Lion Rider 5",
    pillLabel: "LR 5",
    group: "specialist",
    tier: 5,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 3150,
    strength: 1050,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        ranged: 165,
        engineers: 137,
        humans: 105
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1080,
        display: "18m"
    },
    trainingCost: {
        silver: 2200
    }
}, {
    id: "vulture-5",
    name: "Vulture 5",
    pillLabel: "VUL 5",
    group: "specialist",
    tier: 5,
    category: "flying",
    isHuman: !0,
    leadershipCost: 1,
    health: 1560,
    strength: 520,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 197,
        fortifications: 104,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 540,
        display: "9m"
    },
    trainingCost: {
        silver: 1100
    }
}, {
    id: "heavy-knight-6",
    name: "Heavy Knight 6",
    pillLabel: "HK 6",
    group: "specialist",
    tier: 6,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 2820,
    strength: 940,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 148,
        beasts: 304,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 600,
        display: "10m"
    },
    trainingCost: {
        silver: 1300
    }
}, {
    id: "deadshot-6",
    name: "Deadshot 6",
    pillLabel: "DS 6",
    group: "specialist",
    tier: 6,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 2820,
    strength: 940,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        flying: 254,
        melee: 197,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 600,
        display: "10m"
    },
    trainingCost: {
        silver: 1300
    }
}, {
    id: "lion-rider-6",
    name: "Lion Rider 6",
    pillLabel: "LR 6",
    group: "specialist",
    tier: 6,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 5700,
    strength: 1900,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        ranged: 247,
        engineers: 205,
        humans: 105
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1200,
        display: "20m"
    },
    trainingCost: {
        silver: 2600
    }
}, {
    id: "vulture-6",
    name: "Vulture 6",
    pillLabel: "VUL 6",
    group: "specialist",
    tier: 6,
    category: "flying",
    isHuman: !0,
    leadershipCost: 1,
    health: 2820,
    strength: 940,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 296,
        fortifications: 156,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 600,
        display: "10m"
    },
    trainingCost: {
        silver: 1300
    }
}, {
    id: "heavy-knight-7",
    name: "Heavy Knight 7",
    pillLabel: "HK 7",
    group: "specialist",
    tier: 7,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 5100,
    strength: 1700,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 222,
        beasts: 456,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 660,
        display: "11m"
    },
    trainingCost: {
        silver: 1500
    }
}, {
    id: "deadshot-7",
    name: "Deadshot 7",
    pillLabel: "DS 7",
    group: "specialist",
    tier: 7,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 5100,
    strength: 1700,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        flying: 382,
        melee: 296,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 660,
        display: "11m"
    },
    trainingCost: {
        silver: 1500
    }
}, {
    id: "lion-rider-7",
    name: "Lion Rider 7",
    pillLabel: "LR 7",
    group: "specialist",
    tier: 7,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 10200,
    strength: 3400,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        ranged: 370,
        engineers: 308,
        humans: 105
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1320,
        display: "22m"
    },
    trainingCost: {
        silver: 3e3
    }
}, {
    id: "vulture-7",
    name: "Vulture 7",
    pillLabel: "VUL 7",
    group: "specialist",
    tier: 7,
    category: "flying",
    isHuman: !0,
    leadershipCost: 1,
    health: 5100,
    strength: 1700,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 444,
        fortifications: 234,
        humans: 105
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 660,
        display: "11m"
    },
    trainingCost: {
        silver: 1500
    }
}, {
    id: "duelist-1",
    name: "Duelist 1",
    pillLabel: "DUE 1",
    group: "specialist",
    tier: 8,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 9180,
    strength: 3060,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 333,
        beasts: 683
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 720,
        display: "12m"
    },
    trainingCost: {
        silver: 1700
    }
}, {
    id: "legitimist-1",
    name: "Legitimist 1",
    pillLabel: "LGT 1",
    group: "specialist",
    tier: 8,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 9180,
    strength: 3060,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        flying: 572,
        melee: 444
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 720,
        display: "12m"
    },
    trainingCost: {
        silver: 1700
    }
}, {
    id: "whitemane-1",
    name: "Whitemane 1",
    pillLabel: "WM 1",
    group: "specialist",
    tier: 8,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 18360,
    strength: 6120,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        ranged: 555,
        engineers: 461
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1440,
        display: "24m"
    },
    trainingCost: {
        silver: 3400
    }
}, {
    id: "royal-lion-1",
    name: "Royal Lion 1",
    pillLabel: "RL 1",
    group: "specialist",
    tier: 8,
    category: "flying",
    isHuman: !1,
    leadershipCost: 20,
    health: 183600,
    race: "beast",
    strength: 61200,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 667,
        fortifications: 350
    },
    revivalCost: {
        gold: 80
    },
    trainingTime: {
        seconds: 14400,
        display: "240m"
    },
    trainingCost: {
        silver: 34e3
    }
}, {
    id: "duelist-2",
    name: "Duelist 2",
    pillLabel: "DUE 2",
    group: "specialist",
    tier: 9,
    category: "melee",
    isHuman: !0,
    leadershipCost: 1,
    health: 16530,
    strength: 5510,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 500,
        beasts: 1025
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 780,
        display: "13m"
    },
    trainingCost: {
        silver: 1900
    }
}, {
    id: "legitimist-2",
    name: "Legitimist 2",
    pillLabel: "LGT 2",
    group: "specialist",
    tier: 9,
    category: "ranged",
    isHuman: !0,
    leadershipCost: 1,
    health: 16530,
    strength: 5510,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        flying: 859,
        melee: 667
    },
    revivalCost: {
        gold: 4
    },
    trainingTime: {
        seconds: 780,
        display: "13m"
    },
    trainingCost: {
        silver: 1900
    }
}, {
    id: "whitemane-2",
    name: "Whitemane 2",
    pillLabel: "WM 2",
    group: "specialist",
    tier: 9,
    category: "mounted",
    isHuman: !0,
    leadershipCost: 2,
    health: 33060,
    strength: 11020,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        ranged: 833,
        engineers: 692
    },
    revivalCost: {
        gold: 8
    },
    trainingTime: {
        seconds: 1560,
        display: "26m"
    },
    trainingCost: {
        silver: 3800
    }
}, {
    id: "royal-lion-2",
    name: "Royal Lion 2",
    pillLabel: "RL 2",
    group: "specialist",
    tier: 9,
    category: "flying",
    isHuman: !1,
    leadershipCost: 20,
    health: 330600,
    race: "beast",
    strength: 110200,
    playerBattleStrengthMultiplier: 2,
    strengthAgainst: {
        mounted: 1e3,
        fortifications: 525
    },
    revivalCost: {
        gold: 80
    },
    trainingTime: {
        seconds: 15600,
        display: "260m"
    },
    trainingCost: {
        silver: 38e3
    }
}, {
    id: "catapult-1",
    name: "Catapult 1",
    pillLabel: "CAT 1",
    group: "engineers",
    tier: 1,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 1500,
    strength: 250,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 65
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 150,
        display: "150s"
    },
    trainingCost: {
        silver: 3e3
    }
}, {
    id: "catapult-2",
    name: "Catapult 2",
    pillLabel: "CAT 2",
    group: "engineers",
    tier: 2,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 2700,
    strength: 450,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 98
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 1800,
        display: "1800s"
    },
    trainingCost: {
        silver: 5e3
    }
}, {
    id: "catapult-3",
    name: "Catapult 3",
    pillLabel: "CAT 3",
    group: "engineers",
    tier: 3,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 4860,
    strength: 810,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 146
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 4200,
        display: "70m"
    },
    trainingCost: {
        silver: 7e3
    }
}, {
    id: "catapult-4",
    name: "Catapult 4",
    pillLabel: "CAT 4",
    group: "engineers",
    tier: 4,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 8750,
    strength: 1460,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 219
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 4800,
        display: "80m"
    },
    trainingCost: {
        silver: 9e3
    }
}, {
    id: "catapult-5",
    name: "Catapult 5",
    pillLabel: "CAT 5",
    group: "engineers",
    tier: 5,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 15800,
    strength: 2630,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 329
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 5400,
        display: "90m"
    },
    trainingCost: {
        silver: 11e3
    }
}, {
    id: "siege-ballistae-6",
    name: "Siege Ballistae 6",
    pillLabel: "SB 6",
    group: "engineers",
    tier: 6,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 28400,
    strength: 4730,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 494
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 6e3,
        display: "100m"
    },
    trainingCost: {
        silver: 13e3
    }
}, {
    id: "siege-ballistae-7",
    name: "Siege Ballistae 7",
    pillLabel: "SB 7",
    group: "engineers",
    tier: 7,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 51e3,
    strength: 8500,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 740
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 6600,
        display: "110m"
    },
    trainingCost: {
        silver: 15e3
    }
}, {
    id: "josephine-1",
    name: "Josephine 1",
    pillLabel: "JOS 1",
    group: "engineers",
    tier: 8,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 91800,
    strength: 15310,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 1111
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 7200,
        display: "120m"
    },
    trainingCost: {
        silver: 17e3
    }
}, {
    id: "josephine-2",
    name: "Josephine 2",
    pillLabel: "JOS 2",
    group: "engineers",
    tier: 9,
    category: "engineer",
    isHuman: !0,
    leadershipCost: 10,
    health: 165300,
    strength: 27550,
    playerBattleStrengthMultiplier: 1,
    strengthAgainst: {
        fortifications: 1667
    },
    fortificationStrengthMultiplier: 20,
    revivalCost: {
        gold: 40
    },
    trainingTime: {
        seconds: 7800,
        display: "130m"
    },
    trainingCost: {
        silver: 19e3
    }
}];

const monstersData = [{
    id: "stone-gargoyle",
    name: "Stone Gargoyle",
    pillLabel: "SG",
    tier: 3,
    category: "flying",
    isHuman: !1,
    health: 15600,
    dominanceCost: 8,
    race: "giant",
    strength: 5200,
    strengthAgainst: {
        beasts: 72,
        melee: 185
    },
    revivalCost: {
        gold: 128
    },
    trainingTime: {
        seconds: 13440,
        display: "224m"
    },
    trainingCost: {
        silver: 22400,
        dragonCoins: 320
    }
}, {
    id: "emerald-dragon",
    name: "Emerald Dragon",
    pillLabel: "ED",
    tier: 3,
    category: "flying",
    isHuman: !1,
    health: 13500,
    dominanceCost: 7,
    race: "dragon",
    strength: 4500,
    strengthAgainst: {
        giants: 72,
        mounted: 185
    },
    revivalCost: {
        gold: 112
    },
    trainingTime: {
        seconds: 11760,
        display: "196m"
    },
    trainingCost: {
        silver: 19600,
        dragonCoins: 280
    }
}, {
    id: "battle-boar",
    name: "Battle Boar",
    pillLabel: "BB",
    tier: 3,
    category: "mounted",
    isHuman: !1,
    health: 11700,
    dominanceCost: 6,
    race: "beast",
    strength: 3900,
    strengthAgainst: {
        mounted: 144,
        ranged: 113
    },
    revivalCost: {
        gold: 96
    },
    trainingTime: {
        seconds: 10080,
        display: "168m"
    },
    trainingCost: {
        silver: 16800,
        dragonCoins: 240
    }
}, {
    id: "water-elemental",
    name: "Water Elemental",
    pillLabel: "WE",
    tier: 3,
    category: "ranged",
    isHuman: !1,
    health: 5700,
    dominanceCost: 3,
    race: "elemental",
    strength: 1900,
    strengthAgainst: {
        flying: 144,
        melee: 113
    },
    revivalCost: {
        gold: 48
    },
    trainingTime: {
        seconds: 5040,
        display: "84m"
    },
    trainingCost: {
        silver: 8400,
        dragonCoins: 120
    }
}, {
    id: "ice-phoenix",
    name: "Ice Phoenix",
    pillLabel: "IP",
    tier: 4,
    category: "flying",
    isHuman: !1,
    health: 51e3,
    dominanceCost: 15,
    race: "elemental",
    strength: 17e3,
    strengthAgainst: {
        dragons: 162,
        flying: 223
    },
    revivalCost: {
        gold: 240
    },
    trainingTime: {
        seconds: 28800,
        display: "480m"
    },
    trainingCost: {
        silver: 54e3,
        dragonCoins: 600
    }
}, {
    id: "magic-dragon",
    name: "Magic Dragon",
    pillLabel: "MD",
    tier: 4,
    category: "ranged",
    isHuman: !1,
    health: 45e3,
    dominanceCost: 13,
    race: "dragon",
    strength: 15e3,
    strengthAgainst: {
        melee: 169,
        ranged: 216
    },
    revivalCost: {
        gold: 208
    },
    trainingTime: {
        seconds: 24960,
        display: "416m"
    },
    trainingCost: {
        silver: 46800,
        dragonCoins: 520
    }
}, {
    id: "many-armed-guardian",
    name: "Many-Armed Guardian",
    pillLabel: "MAG",
    tier: 4,
    category: "melee",
    isHuman: !1,
    health: 39e3,
    dominanceCost: 11,
    race: "giant",
    strength: 13e3,
    strengthAgainst: {
        elementals: 270,
        mounted: 115
    },
    revivalCost: {
        gold: 176
    },
    trainingTime: {
        seconds: 21120,
        display: "5h 52m"
    },
    trainingCost: {
        silver: 39600,
        dragonCoins: 440
    }
}, {
    id: "gorgon-medusa",
    name: "Gorgon Medusa",
    pillLabel: "GM",
    tier: 4,
    category: "ranged",
    isHuman: !1,
    health: 36e3,
    dominanceCost: 10,
    race: "beast",
    strength: 12e3,
    strengthAgainst: {
        flying: 108,
        melee: 277
    },
    revivalCost: {
        gold: 160
    },
    trainingTime: {
        seconds: 19200,
        display: "320m"
    },
    trainingCost: {
        silver: 36e3,
        dragonCoins: 400
    }
}, {
    id: "ettin",
    name: "Ettin",
    pillLabel: "ETT",
    tier: 5,
    category: "melee",
    isHuman: !1,
    health: 144e3,
    dominanceCost: 23,
    race: "giant",
    strength: 48e3,
    strengthAgainst: {
        mounted: 334,
        fortifications: 243
    },
    revivalCost: {
        gold: 368
    },
    trainingTime: {
        seconds: 49500,
        display: "13h 45m"
    },
    trainingCost: {
        silver: 101200,
        dragonCoins: 920
    }
}, {
    id: "fearsome-manticore",
    name: "Fearsome Manticore",
    pillLabel: "FM",
    tier: 5,
    category: "flying",
    isHuman: !1,
    health: 138e3,
    dominanceCost: 22,
    race: "beast",
    strength: 46e3,
    strengthAgainst: {
        flying: 253,
        giants: 324
    },
    revivalCost: {
        gold: 352
    },
    trainingTime: {
        seconds: 47460,
        display: "13h 11m"
    },
    trainingCost: {
        silver: 96800,
        dragonCoins: 880
    }
}, {
    id: "flaming-centaur",
    name: "Flaming Centaur",
    pillLabel: "FC",
    tier: 5,
    category: "mounted",
    isHuman: !1,
    health: 132e3,
    dominanceCost: 21,
    race: "elemental",
    strength: 44e3,
    strengthAgainst: {
        beasts: 162,
        ranged: 415
    },
    revivalCost: {
        gold: 336
    },
    trainingTime: {
        seconds: 45240,
        display: "12h 34m"
    },
    trainingCost: {
        silver: 92400,
        dragonCoins: 840
    }
}, {
    id: "desert-vanquisher",
    name: "Desert Vanquisher",
    pillLabel: "DV",
    tier: 5,
    category: "mounted",
    isHuman: !1,
    health: 126e3,
    dominanceCost: 20,
    race: "dragon",
    strength: 42e3,
    strengthAgainst: {
        elementals: 324,
        ranged: 253
    },
    revivalCost: {
        gold: 320
    },
    trainingTime: {
        seconds: 43080,
        display: "11h 58m"
    },
    trainingCost: {
        silver: 88e3,
        dragonCoins: 800
    }
}, {
    id: "ruby-golem",
    name: "Ruby Golem",
    pillLabel: "RG",
    tier: 6,
    category: "melee",
    isHuman: !1,
    health: 39e4,
    dominanceCost: 35,
    race: "elemental",
    strength: 13e4,
    strengthAgainst: {
        melee: 486,
        mounted: 380
    },
    revivalCost: {
        gold: 560
    },
    trainingTime: {
        seconds: 83940,
        display: "23h 19m"
    },
    trainingCost: {
        silver: 182e3,
        dragonCoins: 1400
    }
}, {
    id: "jungle-destroyer",
    name: "Jungle Destroyer",
    pillLabel: "JD",
    tier: 6,
    category: "melee",
    isHuman: !1,
    health: 39e4,
    dominanceCost: 34,
    race: "beast",
    strength: 13e4,
    strengthAgainst: {
        dragons: 243,
        mounted: 623
    },
    revivalCost: {
        gold: 544
    },
    trainingTime: {
        seconds: 81600,
        display: "22h 40m"
    },
    trainingCost: {
        silver: 177e3,
        dragonCoins: 1360
    }
}, {
    id: "crystal-dragon",
    name: "Crystal Dragon",
    pillLabel: "CD",
    tier: 6,
    category: "melee",
    isHuman: !1,
    health: 36e4,
    dominanceCost: 33,
    race: "dragon",
    strength: 12e4,
    strengthAgainst: {
        elementals: 608,
        mounted: 258
    },
    revivalCost: {
        gold: 528
    },
    trainingTime: {
        seconds: 79200,
        display: "22h"
    },
    trainingCost: {
        silver: 172e3,
        dragonCoins: 1320
    }
}, {
    id: "troll-rider",
    name: "Troll Rider",
    pillLabel: "TR",
    tier: 6,
    category: "mounted",
    isHuman: !1,
    health: 33e4,
    dominanceCost: 30,
    race: "giant",
    strength: 11e4,
    strengthAgainst: {
        ranged: 380,
        fortifications: 486
    },
    revivalCost: {
        gold: 480
    },
    trainingTime: {
        seconds: 72e3,
        display: "20h"
    },
    trainingCost: {
        silver: 157e3,
        dragonCoins: 1200
    }
}, {
    id: "wind-lord",
    name: "Wind Lord",
    pillLabel: "WL",
    tier: 7,
    category: "melee",
    isHuman: !1,
    health: 93e4,
    dominanceCost: 45,
    race: "elemental",
    strength: 31e4,
    strengthAgainst: {
        dragons: 911,
        mounted: 387
    },
    revivalCost: {
        gold: 720
    },
    trainingTime: {
        seconds: 118800,
        display: "33h"
    },
    trainingCost: {
        silver: 27e4,
        dragonCoins: 1800
    }
}, {
    id: "black-dragon",
    name: "Black Dragon",
    pillLabel: "BD",
    tier: 7,
    category: "flying",
    isHuman: !1,
    health: 9e5,
    dominanceCost: 44,
    race: "dragon",
    strength: 3e5,
    strengthAgainst: {
        beasts: 729,
        melee: 570
    },
    revivalCost: {
        gold: 704
    },
    trainingTime: {
        seconds: 116100,
        display: "32h 15m"
    },
    trainingCost: {
        silver: 264e3,
        dragonCoins: 1760
    }
}, {
    id: "destructive-colossus",
    name: "Destructive Colossus",
    pillLabel: "DC",
    tier: 7,
    category: "ranged",
    isHuman: !1,
    health: 87e4,
    dominanceCost: 43,
    race: "giant",
    strength: 29e4,
    strengthAgainst: {
        flying: 547,
        melee: 752
    },
    revivalCost: {
        gold: 688
    },
    trainingTime: {
        seconds: 113400,
        display: "31h 30m"
    },
    trainingCost: {
        silver: 258e3,
        dragonCoins: 1720
    }
}, {
    id: "ancient-terror",
    name: "Ancient Terror",
    pillLabel: "AT",
    tier: 7,
    category: "mounted",
    isHuman: !1,
    health: 84e4,
    dominanceCost: 41,
    race: "beast",
    strength: 28e4,
    strengthAgainst: {
        ranged: 752,
        fortifications: 547
    },
    revivalCost: {
        gold: 656
    },
    trainingTime: {
        seconds: 108e3,
        display: "30h"
    },
    trainingCost: {
        silver: 246e3,
        dragonCoins: 1640
    }
}, {
    id: "kraken-1",
    name: "Kraken 1",
    pillLabel: "KRK 1",
    tier: 8,
    category: "melee",
    isHuman: !1,
    health: 201e4,
    dominanceCost: 55,
    race: "giant",
    strength: 67e4,
    strengthAgainst: {
        beasts: 957,
        mounted: 991
    },
    revivalCost: {
        gold: 880
    },
    trainingTime: {
        seconds: 158100,
        display: "43h 55m"
    },
    trainingCost: {
        silver: 374e3,
        dragonCoins: 2200
    }
}, {
    id: "fire-phoenix-1",
    name: "Fire Phoenix 1",
    pillLabel: "FPH 1",
    tier: 8,
    category: "flying",
    isHuman: !1,
    health: 198e4,
    dominanceCost: 54,
    race: "elemental",
    strength: 66e4,
    strengthAgainst: {
        dragons: 1247,
        melee: 701
    },
    revivalCost: {
        gold: 864
    },
    trainingTime: {
        seconds: 155340,
        display: "43h 9m"
    },
    trainingCost: {
        silver: 367e3,
        dragonCoins: 2160
    }
}, {
    id: "devastator-1",
    name: "Devastator 1",
    pillLabel: "DEV 1",
    tier: 8,
    category: "mounted",
    isHuman: !1,
    health: 195e4,
    dominanceCost: 53,
    race: "dragon",
    strength: 65e4,
    strengthAgainst: {
        giants: 667,
        ranged: 1281
    },
    revivalCost: {
        gold: 848
    },
    trainingTime: {
        seconds: 152520,
        display: "42h 22m"
    },
    trainingCost: {
        silver: 361e3,
        dragonCoins: 2120
    }
}, {
    id: "trickster-1",
    name: "Trickster 1",
    pillLabel: "TRK 1",
    tier: 8,
    category: "ranged",
    isHuman: !1,
    health: 192e4,
    dominanceCost: 52,
    race: "beast",
    strength: 64e4,
    strengthAgainst: {
        elementals: 1008,
        flying: 940
    },
    revivalCost: {
        gold: 832
    },
    trainingTime: {
        seconds: 149700,
        display: "41h 35m"
    },
    trainingCost: {
        silver: 354e3,
        dragonCoins: 2080
    }
}, {
    id: "kraken-2",
    name: "Kraken 2",
    pillLabel: "KRK 2",
    tier: 9,
    category: "melee",
    isHuman: !1,
    health: 363e4,
    dominanceCost: 55,
    race: "giant",
    strength: 121e4,
    strengthAgainst: {
        beasts: 1435,
        mounted: 1486
    },
    revivalCost: {
        gold: 880
    },
    trainingTime: {
        seconds: 171120,
        display: "47h 32m"
    },
    trainingCost: {
        silver: 418e3,
        dragonCoins: 2200
    }
}, {
    id: "fire-phoenix-2",
    name: "Fire Phoenix 2",
    pillLabel: "FPH 2",
    tier: 9,
    category: "flying",
    isHuman: !1,
    health: 357e4,
    dominanceCost: 54,
    race: "elemental",
    strength: 119e4,
    strengthAgainst: {
        dragons: 1871,
        melee: 1051
    },
    revivalCost: {
        gold: 864
    },
    trainingTime: {
        seconds: 168300,
        display: "46h 45m"
    },
    trainingCost: {
        silver: 411e3,
        dragonCoins: 2160
    }
}, {
    id: "devastator-2",
    name: "Devastator 2",
    pillLabel: "DEV 2",
    tier: 9,
    category: "mounted",
    isHuman: !1,
    health: 351e4,
    dominanceCost: 53,
    race: "dragon",
    strength: 117e4,
    strengthAgainst: {
        giants: 1e3,
        ranged: 1922
    },
    revivalCost: {
        gold: 848
    },
    trainingTime: {
        seconds: 164580,
        display: "45h 43m"
    },
    trainingCost: {
        silver: 403e3,
        dragonCoins: 2120
    }
}, {
    id: "trickster-2",
    name: "Trickster 2",
    pillLabel: "TRK 2",
    tier: 9,
    category: "ranged",
    isHuman: !1,
    health: 345e4,
    dominanceCost: 52,
    race: "beast",
    strength: 115e4,
    strengthAgainst: {
        elementals: 1512,
        flying: 1410
    },
    revivalCost: {
        gold: 832
    },
    trainingTime: {
        seconds: 161820,
        display: "44h 57m"
    },
    trainingCost: {
        silver: 395e3,
        dragonCoins: 2080
    }
}];

const mercenariesData = [{
    id: "wyvern-2",
    name: "Wyvern 2",
    pillLabel: "WYV 2",
    tier: 9,
    health: 207e4,
    authorityCost: 63,
    tags: ["flying", "monster"],
    isHuman: !1,
    strength: 69e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 500
    },
    strengthAgainst: {
        melee: 75
    }
}, {
    id: "warden-2",
    name: "Warden 2",
    pillLabel: "WRD 2",
    tier: 9,
    health: 141e4,
    authorityCost: 43,
    tags: ["mounted", "monster"],
    isHuman: !1,
    strength: 47e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 340
    },
    strengthAgainst: {
        ranged: 70
    }
}, {
    id: "eternal-cannoneer-2",
    name: "Eternal Cannoneer 2",
    pillLabel: "ETC 2",
    tier: 9,
    health: 132e4,
    authorityCost: 40,
    tags: ["ranged", "monster"],
    isHuman: !1,
    strength: 44e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 320
    },
    strengthAgainst: {
        flying: 65
    }
}, {
    id: "demonic-salamander-2",
    name: "Demonic Salamander 2",
    pillLabel: "DSL 2",
    tier: 9,
    health: 123e4,
    authorityCost: 38,
    tags: ["melee", "monster"],
    isHuman: !1,
    strength: 41e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 300
    },
    strengthAgainst: {
        mounted: 65
    }
}, {
    id: "warregal-2",
    name: "Warregal 2",
    pillLabel: "WRG 2",
    tier: 9,
    health: 66e4,
    authorityCost: 20,
    tags: ["guardsmen", "flying", "beast"],
    isHuman: !1,
    strength: 22e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 160
    },
    strengthAgainst: {
        mounted: 1999,
        fortifications: 1051
    }
}, {
    id: "jago-2",
    name: "Jago 2",
    pillLabel: "JAG 2",
    tier: 9,
    health: 66e4,
    authorityCost: 20,
    tags: ["flying", "specialist", "beast"],
    isHuman: !1,
    strength: 22e4,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 160
    },
    strengthAgainst: {
        mounted: 1e3,
        fortifications: 525
    }
}, {
    id: "quicksand-2",
    name: "Quicksand 2",
    pillLabel: "QKS 2",
    tier: 9,
    health: 66e3,
    authorityCost: 2,
    tags: ["guardsmen", "mounted"],
    isHuman: !0,
    strength: 22e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 16
    },
    strengthAgainst: {
        ranged: 1667,
        engineers: 1384
    }
}, {
    id: "galloper-2",
    name: "Galloper 2",
    pillLabel: "GAL 2",
    tier: 9,
    health: 66e3,
    authorityCost: 2,
    tags: ["mounted", "specialist"],
    isHuman: !0,
    strength: 22e3,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 16
    },
    strengthAgainst: {
        ranged: 833,
        engineers: 692
    }
}, {
    id: "highlander-2",
    name: "Highlander 2",
    pillLabel: "HLD 2",
    tier: 9,
    health: 33e3,
    authorityCost: 1,
    tags: ["guardsmen", "ranged"],
    isHuman: !0,
    strength: 11e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        flying: 1717,
        melee: 1333
    }
}, {
    id: "slavic-warrior-2",
    name: "Slavic Warrior 2",
    pillLabel: "SLV 2",
    tier: 9,
    health: 33e3,
    authorityCost: 1,
    tags: ["guardsmen", "melee"],
    isHuman: !0,
    strength: 11e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        beasts: 2050,
        mounted: 1e3
    }
}, {
    id: "pounder-2",
    name: "Pounder 2",
    pillLabel: "PND 2",
    tier: 9,
    health: 33e3,
    authorityCost: 1,
    tags: ["ranged", "specialist"],
    isHuman: !0,
    strength: 11e3,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        flying: 859,
        melee: 667
    }
}, {
    id: "scarface-2",
    name: "Scarface 2",
    pillLabel: "SCF 2",
    tier: 9,
    health: 33e3,
    authorityCost: 1,
    tags: ["melee", "specialist"],
    isHuman: !0,
    strength: 11e3,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        beasts: 1025,
        mounted: 500
    }
}, {
    id: "superior-epic-monster-hunter-2",
    name: "Superior Epic Monster Hunter 2",
    pillLabel: "EMH 2",
    tier: 9,
    health: 75e3,
    authorityCost: 1,
    tags: ["guardsmen"],
    isHuman: !1,
    strength: 25e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        epicMonsters: 1e3
    }
}, {
    id: "combat-anteater-leader-2",
    name: "Combat Anteater Leader 2",
    pillLabel: "CAL 2",
    tier: 9,
    health: 34200,
    authorityCost: 1,
    tags: ["guardsmen", "mounted"],
    isHuman: !0,
    strength: 11400,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 4e3
    }
}, {
    id: "chitinous-defender-leader-2",
    name: "Chitinous Defender Leader 2",
    pillLabel: "CDL 2",
    tier: 9,
    health: 33600,
    authorityCost: 1,
    tags: ["guardsmen", "melee"],
    isHuman: !0,
    strength: 11200,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 4e3
    }
}, {
    id: "wasp-man-leader-2",
    name: "Wasp-Man Leader 2",
    pillLabel: "WML 2",
    tier: 9,
    health: 32400,
    authorityCost: 1,
    tags: ["guardsmen", "flying"],
    isHuman: !0,
    strength: 10800,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 4e3
    }
}, {
    id: "grim-stalker-leader-2",
    name: "Grim Stalker Leader 2",
    pillLabel: "GSL 2",
    tier: 9,
    health: 31800,
    authorityCost: 1,
    tags: ["guardsmen", "ranged"],
    isHuman: !0,
    strength: 10600,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 4e3
    }
}, {
    id: "ariel-9",
    name: "Ariel 9",
    pillLabel: "ARL 9",
    tier: 9,
    health: 33e4,
    authorityCost: 10,
    tags: ["engineers"],
    isHuman: !0,
    strength: 55e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 80
    },
    strengthAgainst: {
        fortifications: 1667
    },
    fortificationStrengthMultiplier: 20
}, {
    id: "fire-lord-7",
    name: "Fire Lord 7",
    pillLabel: "FLR 7",
    tier: 7,
    health: 168e4,
    authorityCost: 164,
    tags: ["ranged", "elemental", "monster"],
    isHuman: !1,
    strength: 56e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 1310
    },
    strengthAgainst: {
        dragons: 45,
        melee: 80
    }
}, {
    id: "sandworm-7",
    name: "Sandworm 7",
    pillLabel: "SDW 7",
    tier: 7,
    health: 129e4,
    authorityCost: 128,
    tags: ["melee", "elemental", "monster"],
    isHuman: !1,
    strength: 43e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 1020
    },
    strengthAgainst: {
        dragons: 50,
        mounted: 75
    }
}, {
    id: "life-dragon-7",
    name: "Life Dragon 7",
    pillLabel: "LFD 7",
    tier: 7,
    health: 72e4,
    authorityCost: 70,
    tags: ["flying", "dragon", "monster"],
    isHuman: !1,
    strength: 24e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 560
    },
    strengthAgainst: {
        giants: 50,
        mounted: 60
    }
}, {
    id: "cursed-dragon-7",
    name: "Cursed Dragon 7",
    pillLabel: "CDR 7",
    tier: 7,
    health: 96e4,
    authorityCost: 93,
    tags: ["flying", "dragon", "monster"],
    isHuman: !1,
    strength: 32e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 740
    },
    strengthAgainst: {
        giants: 50,
        mounted: 50
    }
}, {
    id: "overlord-7",
    name: "Overlord 7",
    pillLabel: "OVL 7",
    tier: 7,
    health: 6e5,
    authorityCost: 60,
    tags: ["ranged", "giant", "monster"],
    isHuman: !1,
    strength: 2e5,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 480
    },
    strengthAgainst: {
        beasts: 50,
        melee: 60
    }
}, {
    id: "golden-dragon-7",
    name: "Golden Dragon 7",
    pillLabel: "GDR 7",
    tier: 7,
    health: 51e4,
    authorityCost: 50,
    tags: ["flying", "dragon", "monster"],
    isHuman: !1,
    strength: 17e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 400
    },
    strengthAgainst: {
        giants: 365,
        mounted: 934
    }
}, {
    id: "lightning-lord-7",
    name: "Lightning Lord 7",
    pillLabel: "LTN 7",
    tier: 7,
    health: 46e4,
    authorityCost: 45,
    tags: ["ranged", "giant", "monster"],
    isHuman: !1,
    strength: 153e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 360
    },
    strengthAgainst: {
        beasts: 729,
        melee: 570
    }
}, {
    id: "sea-lord-7",
    name: "Sea Lord 7",
    pillLabel: "SEA 7",
    tier: 7,
    health: 42e4,
    authorityCost: 40,
    tags: ["mounted", "elemental", "monster"],
    isHuman: !1,
    strength: 14e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 320
    },
    strengthAgainst: {
        dragons: 547,
        ranged: 752
    }
}, {
    id: "sphynx-7",
    name: "Sphynx 7",
    pillLabel: "SPX 7",
    tier: 7,
    health: 408e3,
    authorityCost: 10,
    tags: ["guardsmen", "flying", "beast"],
    isHuman: !1,
    strength: 136e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 320
    },
    strengthAgainst: {
        mounted: 934,
        fortifications: 467
    }
}, {
    id: "shedu-7",
    name: "Shedu 7",
    pillLabel: "SHD 7",
    tier: 7,
    health: 408e3,
    authorityCost: 40,
    tags: ["specialist", "flying", "beast"],
    isHuman: !1,
    strength: 136e3,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 320
    },
    strengthAgainst: {
        mounted: 467,
        fortifications: 234
    }
}, {
    id: "jungle-king-7",
    name: "Jungle King 7",
    pillLabel: "JKG 7",
    tier: 7,
    health: 33e4,
    authorityCost: 33,
    tags: ["melee", "beast", "monster"],
    isHuman: !1,
    strength: 11e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 264
    },
    strengthAgainst: {
        elementals: 911,
        mounted: 387
    }
}, {
    id: "chariot-7",
    name: "Chariot 7",
    pillLabel: "CHR 7",
    tier: 7,
    health: 20400,
    authorityCost: 2,
    tags: ["guardsmen", "mounted"],
    isHuman: !0,
    strength: 6800,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 16
    },
    strengthAgainst: {
        ranged: 752,
        engineers: 547
    },
    doubleDamageChance: 5
}, {
    id: "rhino-rider-7",
    name: "Rhino Rider 7",
    pillLabel: "RHR 7",
    tier: 7,
    health: 20400,
    authorityCost: 2,
    tags: ["specialist", "mounted"],
    isHuman: !0,
    strength: 6800,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 16
    },
    strengthAgainst: {
        ranged: 377,
        engineers: 274
    }
}, {
    id: "epic-monster-hunter-7",
    name: "Epic Monster Hunter 7",
    pillLabel: "EMH 7",
    tier: 7,
    health: 11220,
    authorityCost: 1,
    tags: ["guardsmen"],
    isHuman: !1,
    strength: 3740,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        epicMonsters: 934
    }
}, {
    id: "combat-anteater-7",
    name: "Combat Anteater 7",
    pillLabel: "CAT 7",
    tier: 7,
    health: 10800,
    authorityCost: 1,
    tags: ["guardsmen", "mounted"],
    isHuman: !0,
    strength: 3600,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 1121
    }
}, {
    id: "chitinous-defender-7",
    name: "Chitinous Defender 7",
    pillLabel: "CDF 7",
    tier: 7,
    health: 10500,
    authorityCost: 1,
    tags: ["guardsmen", "melee"],
    isHuman: !0,
    strength: 3500,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 1121
    }
}, {
    id: "legionary-7",
    name: "Legionary 7",
    pillLabel: "LGN 7",
    tier: 7,
    health: 10200,
    authorityCost: 1,
    tags: ["guardsmen", "melee"],
    isHuman: !0,
    strength: 3400,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        beasts: 911,
        mounted: 387
    }
}, {
    id: "arbalester-7",
    name: "Arbalester 7",
    pillLabel: "ABT 7",
    tier: 7,
    health: 10200,
    authorityCost: 1,
    tags: ["guardsmen", "ranged"],
    isHuman: !0,
    strength: 3400,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        flying: 729,
        melee: 570
    }
}, {
    id: "knight-7",
    name: "Knight 7",
    pillLabel: "KNT 7",
    tier: 7,
    health: 10200,
    authorityCost: 1,
    tags: ["specialist", "melee"],
    isHuman: !0,
    strength: 3400,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        beasts: 456,
        mounted: 194
    }
}, {
    id: "trailseeker-7",
    name: "Trailseeker 7",
    pillLabel: "TRS 7",
    tier: 7,
    health: 10200,
    authorityCost: 1,
    tags: ["specialist", "ranged"],
    isHuman: !0,
    strength: 3400,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        flying: 364,
        melee: 286
    }
}, {
    id: "grim-stalker-7",
    name: "Grim Stalker 7",
    pillLabel: "GST 7",
    tier: 7,
    health: 9600,
    authorityCost: 1,
    tags: ["guardsmen", "ranged"],
    isHuman: !0,
    strength: 3200,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 1121
    }
}, {
    id: "wasp-man-7",
    name: "Wasp-Man 7",
    pillLabel: "WSP 7",
    tier: 7,
    health: 9900,
    authorityCost: 1,
    tags: ["guardsmen", "flying"],
    isHuman: !0,
    strength: 3300,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 1121
    }
}, {
    id: "archdemon-6",
    name: "Archdemon 6",
    pillLabel: "ADM 6",
    tier: 6,
    health: 54e4,
    authorityCost: 95,
    tags: ["melee", "giant", "monster"],
    isHuman: !1,
    strength: 18e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 760
    },
    strengthAgainst: {
        beasts: 40,
        mounted: 60
    }
}, {
    id: "cursed-dendroid-6",
    name: "Cursed Dendroid 6",
    pillLabel: "CDN 6",
    tier: 6,
    health: 33e4,
    authorityCost: 57,
    tags: ["melee", "elemental", "monster"],
    isHuman: !1,
    strength: 11e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 450
    },
    strengthAgainst: {
        dragons: 50,
        ranged: 65
    }
}, {
    id: "ent-6",
    name: "Ent 6",
    pillLabel: "ENT 6",
    tier: 6,
    health: 219e3,
    authorityCost: 39,
    tags: ["melee", "elemental", "monster"],
    isHuman: !1,
    strength: 73e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 310
    },
    strengthAgainst: {
        dragons: 45,
        ranged: 55
    }
}, {
    id: "bone-golem-6",
    name: "Bone Golem 6",
    pillLabel: "BGM 6",
    tier: 6,
    health: 21e4,
    authorityCost: 37,
    tags: ["melee", "monster"],
    isHuman: !1,
    strength: 7e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 300
    },
    strengthAgainst: {
        dragons: 40
    },
    doubleDamageChance: 20
}, {
    id: "death-chariot-6",
    name: "Death Chariot 6",
    pillLabel: "DCH 6",
    tier: 6,
    health: 171e3,
    authorityCost: 30,
    tags: ["mounted", "monster"],
    isHuman: !1,
    strength: 57e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 240
    },
    strengthAgainst: {
        ranged: 60
    }
}, {
    id: "sphynx-6",
    name: "Sphynx 6",
    pillLabel: "SPX 6",
    tier: 6,
    health: 56700,
    authorityCost: 10,
    tags: ["guardsmen", "flying", "beast"],
    isHuman: !1,
    strength: 18900,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 80
    },
    strengthAgainst: {
        mounted: 592,
        fortifications: 311
    }
}, {
    id: "shedu-6",
    name: "Shedu 6",
    pillLabel: "SHD 6",
    tier: 6,
    health: 56700,
    authorityCost: 10,
    tags: ["specialist", "flying", "beast"],
    isHuman: !1,
    strength: 18900,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 80
    },
    strengthAgainst: {
        mounted: 296,
        fortifications: 156
    }
}, {
    id: "chariot-6",
    name: "Chariot 6",
    pillLabel: "CHR 6",
    tier: 6,
    health: 11400,
    authorityCost: 2,
    tags: ["guardsmen", "mounted"],
    isHuman: !0,
    strength: 3800,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 16
    },
    strengthAgainst: {
        ranged: 493,
        engineers: 410
    },
    doubleDamageChance: 5
}, {
    id: "rhino-rider-6",
    name: "Rhino Rider 6",
    pillLabel: "RHR 6",
    tier: 6,
    health: 11340,
    authorityCost: 2,
    tags: ["specialist", "mounted"],
    isHuman: !0,
    strength: 3780,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 16
    },
    strengthAgainst: {
        ranged: 247,
        engineers: 205
    }
}, {
    id: "epic-monster-hunter-6",
    name: "Epic Monster Hunter 6",
    pillLabel: "EMH 6",
    tier: 6,
    health: 6090,
    authorityCost: 1,
    tags: ["guardsmen"],
    isHuman: !1,
    strength: 2030,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        epicMonsters: 609
    }
}, {
    id: "combat-anteater-6",
    name: "Combat Anteater 6",
    pillLabel: "CAT 6",
    tier: 6,
    health: 6e3,
    authorityCost: 1,
    tags: ["guardsmen", "mounted"],
    isHuman: !0,
    strength: 2e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 710
    }
}, {
    id: "chitinous-defender-6",
    name: "Chitinous Defender 6",
    pillLabel: "CDF 6",
    tier: 6,
    health: 5850,
    authorityCost: 1,
    tags: ["guardsmen", "melee"],
    isHuman: !0,
    strength: 1950,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 710
    }
}, {
    id: "legionary-6",
    name: "Legionary 6",
    pillLabel: "LGN 6",
    tier: 6,
    health: 5700,
    authorityCost: 1,
    tags: ["guardsmen", "melee"],
    isHuman: !0,
    strength: 1900,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        beasts: 608,
        mounted: 295
    }
}, {
    id: "arbalester-6",
    name: "Arbalester 6",
    pillLabel: "ABT 6",
    tier: 6,
    health: 5700,
    authorityCost: 1,
    tags: ["guardsmen", "ranged"],
    isHuman: !0,
    strength: 1900,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        flying: 509,
        melee: 394
    }
}, {
    id: "knight-6",
    name: "Knight 6",
    pillLabel: "KNT 6",
    tier: 6,
    health: 5700,
    authorityCost: 1,
    tags: ["specialist", "melee"],
    isHuman: !0,
    strength: 1900,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        beasts: 304,
        mounted: 148
    }
}, {
    id: "trailseeker-6",
    name: "Trailseeker 6",
    pillLabel: "TRS 6",
    tier: 6,
    health: 5670,
    authorityCost: 1,
    tags: ["specialist", "ranged"],
    isHuman: !0,
    strength: 1890,
    playerBattleStrengthMultiplier: 2,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        flying: 254,
        melee: 198
    }
}, {
    id: "grim-stalker-6",
    name: "Grim Stalker 6",
    pillLabel: "GST 6",
    tier: 6,
    health: 5400,
    authorityCost: 1,
    tags: ["guardsmen", "ranged"],
    isHuman: !0,
    strength: 1800,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 710
    }
}, {
    id: "wasp-man-6",
    name: "Wasp-Man 6",
    pillLabel: "WSP 6",
    tier: 6,
    health: 5550,
    authorityCost: 1,
    tags: ["guardsmen", "flying"],
    isHuman: !0,
    strength: 1850,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        swarmUnits: 710
    }
}, {
    id: "abomination-6",
    name: "Abomination 6",
    pillLabel: "ABM 6",
    tier: 6,
    health: 39e4,
    authorityCost: 68,
    tags: ["melee", "beast", "monster"],
    isHuman: !1,
    strength: 13e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 540
    },
    strengthAgainst: {
        elementals: 50,
        ranged: 60
    }
}, {
    id: "trebuchet-6",
    name: "Trebuchet 6",
    pillLabel: "TRB 6",
    tier: 6,
    health: 57e3,
    authorityCost: 10,
    tags: ["engineers"],
    isHuman: !0,
    strength: 9500,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 80
    },
    strengthAgainst: {
        fortifications: 494
    },
    fortificationStrengthMultiplier: 20
}, {
    id: "fireworm-rider-5",
    name: "Fireworm Rider 5",
    pillLabel: "FWR 5",
    tier: 5,
    health: 15e4,
    authorityCost: 48,
    tags: ["mounted", "monster"],
    isHuman: !1,
    strength: 5e4,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 380
    },
    strengthAgainst: {
        ranged: 55
    }
}, {
    id: "ifrit-5",
    name: "Ifrit 5",
    pillLabel: "IFR 5",
    tier: 5,
    health: 132e3,
    authorityCost: 42,
    tags: ["flying", "elemental", "monster"],
    isHuman: !1,
    strength: 44e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 330
    },
    strengthAgainst: {
        dragons: 40,
        melee: 70
    }
}, {
    id: "unicorn-rider-5",
    name: "Unicorn Rider 5",
    pillLabel: "UNR 5",
    tier: 5,
    health: 81e3,
    authorityCost: 26,
    tags: ["mounted", "monster"],
    isHuman: !1,
    strength: 27e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 200
    },
    strengthAgainst: {
        ranged: 65
    }
}, {
    id: "bull-rider-5",
    name: "Bull Rider 5",
    pillLabel: "BLR 5",
    tier: 5,
    health: 87e3,
    authorityCost: 28,
    tags: ["mounted", "monster"],
    isHuman: !1,
    strength: 29e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 220
    },
    strengthAgainst: {
        ranged: 55
    }
}, {
    id: "epic-monster-hunter-5",
    name: "Epic Monster Hunter 5",
    pillLabel: "EMH 5",
    tier: 5,
    health: 3150,
    authorityCost: 1,
    tags: ["guardsmen"],
    isHuman: !1,
    strength: 1050,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        epicMonsters: 373
    }
}, {
    id: "swift-marksman-5",
    name: "Swift Marksman 5",
    pillLabel: "SWM 5",
    tier: 5,
    health: 3150,
    authorityCost: 1,
    tags: ["ranged", "guardsmen"],
    isHuman: !0,
    strength: 1050,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 8
    },
    strengthAgainst: {
        flying: 339,
        melee: 263
    }
}, {
    id: "bear-5",
    name: "Bear 5",
    pillLabel: "BER 5",
    tier: 5,
    health: 66e3,
    authorityCost: 21,
    tags: ["melee", "beast", "monster"],
    isHuman: !1,
    strength: 22e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 160
    },
    strengthAgainst: {
        elementals: 50,
        mounted: 70
    }
}, {
    id: "gargoyle-5",
    name: "Gargoyle 5",
    pillLabel: "GRG 5",
    tier: 5,
    health: 57e3,
    authorityCost: 19,
    tags: ["flying", "beast", "monster"],
    isHuman: !1,
    strength: 19e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 150
    },
    strengthAgainst: {
        elementals: 45,
        mounted: 70
    }
}, {
    id: "cyclops-5",
    name: "Cyclops 5",
    pillLabel: "CYC 5",
    tier: 5,
    health: 135e3,
    authorityCost: 43,
    tags: ["ranged", "giant", "monster"],
    isHuman: !1,
    strength: 45e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 340
    },
    strengthAgainst: {
        beasts: 40,
        melee: 45,
        fortifications: 100
    }
}, {
    id: "scorpion-rider-5",
    name: "Scorpion Rider 5",
    pillLabel: "SCR 5",
    tier: 5,
    health: 111e3,
    authorityCost: 36,
    tags: ["mounted", "monster"],
    isHuman: !1,
    strength: 37e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 280
    },
    strengthAgainst: {
        ranged: 40
    }
}, {
    id: "giant-zombie-5",
    name: "Giant Zombie 5",
    pillLabel: "GZM 5",
    tier: 5,
    health: 99e3,
    authorityCost: 32,
    tags: ["melee", "giant", "monster"],
    isHuman: !1,
    strength: 33e3,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 250
    },
    strengthAgainst: {
        beasts: 45,
        mounted: 70
    }
}, {
    id: "scorpion-5",
    name: "Scorpion 5",
    pillLabel: "SC 5",
    tier: 5,
    health: 32e3,
    authorityCost: 10,
    tags: ["engineers"],
    isHuman: !0,
    strength: 5250,
    playerBattleStrengthMultiplier: 1,
    revivalCost: {
        gold: 80
    },
    strengthAgainst: {
        fortifications: 329
    },
    fortificationStrengthMultiplier: 20
}];

const battleReportData = (() => {
    const classes = ['melee', 'ranged', 'mounted', 'flying', 'engineer'];
    const groups = ['guardsmen', 'specialist', 'engineers'];

    function classEntry(troop, selection, group, category) {
        return {
            id: troop.id,
            selection,
            key: `${group}:${category}`,
            group,
            classKey: `report.class.${category}`
        };
    }

    function namedEntry(troop, selection, group, prefix) {
        const family = troop.id.replace(/-\d+$/, '');
        return {
            id: troop.id,
            selection,
            key: `${group}:${family}`,
            group,
            nameKey: `${prefix}.${family}`,
            name: troop.name.replace(/\s+\d+$/, '')
        };
    }

    return [
        ...troopData.map((troop) => classEntry(
            troop,
            'troops',
            troop.group,
            troop.category
        )),
        ...monstersData.map((troop) => namedEntry(troop, 'troops', 'monsters', 'troop')),
        ...mercenariesData.map((troop) => {
            const group = groups.find((value) => troop.tags.includes(value));
            const category = group === 'engineers' ? 'engineer' :
                classes.find((value) => troop.tags.includes(value));
            const entry = namedEntry(troop, 'mercenaries', group ||
                (troop.tags.includes('monster') ? 'monsters' : 'mercenaries'), 'merc.item');
            return {
                ...entry,
                key: `mercenaries:${troop.id.replace(/-\d+$/, '')}`,
                legacyKey: group && category ? `${group}:${category}` : null
            };
        })
    ];
})();

const capitans = {
    "Aydae": {
        bonusKey: "guardsmen",
        baseMultiplierStrength: 1,
        baseMultiplierHealth: 1,
        strengthBonuses: [0, 15, 15, 45, 45, 105, 105],
        healthBonuses: [0, 0, 15, 15, 45, 45, 105]
    },
    "Cleopatra": {
        bonusKey: "army",
        baseMultiplierStrength: 1,
        baseMultiplierHealth: 0,
        strengthBonuses: [0, 15, 30, 60, 90, 150, 210],
        healthBonuses: [0, 0, 0, 0, 0, 0, 0]
    },
    "Minamoto": {
        bonusKey: "ranged",
        baseMultiplierStrength: 2,
        baseMultiplierHealth: 1,
        strengthBonuses: [0, 40, 40, 120, 120, 280, 280],
        healthBonuses: [0, 0, 40, 40, 120, 120, 280]
    },
    "Leonidas": {
        bonusKey: "melee",
        baseMultiplierStrength: 2,
        baseMultiplierHealth: 1,
        strengthBonuses: [0, 40, 40, 120, 120, 280, 280],
        healthBonuses: [0, 0, 40, 40, 120, 120, 280]
    },
    "Alexander": {
        bonusKey: "mounted",
        baseMultiplierStrength: 2,
        baseMultiplierHealth: 1,
        strengthBonuses: [0, 40, 40, 120, 120, 280, 280],
        healthBonuses: [0, 0, 40, 40, 120, 120, 280]
    },
    "Beowulf": {
        bonusKey: "army",
        baseMultiplierStrength: 1,
        baseMultiplierHealth: 1,
        healthBonuses: [0, 70, 140, 210, 280, 350, 420],
        strengthBonuses: [0, 70, 140, 210, 280, 350, 420]
    },
    "Skadi": {
        bonusKey: "guardsmen",
        baseMultiplierStrength: 2,
        baseMultiplierHealth: 2,
        strengthBonuses: [0, 140, 280, 420, 560, 700, 840],
        healthBonuses: [0, 140, 280, 420, 560, 700, 840]
    },
    "Heimdall": {
        bonusKey: "army",
        baseMultiplierStrength: 1.5,
        baseMultiplierHealth: 1,
        strengthBonuses: [0, 110, 220, 330, 440, 550, 660],
        healthBonuses: [0, 0, 0, 0, 0, 0, 0]
    },
    "Hercules": {
        bonusKey: "army",
        baseMultiplierStrength: 2,
        baseMultiplierHealth: 0,
        strengthBonuses: [0, 30, 90, 180, 300, 510, 860],
        healthBonuses: [0, 0, 0, 0, 0, 0, 0]
    },
    "Wu Zetian": {
        bonusKey: "flying",
        baseMultiplierStrength: 2,
        baseMultiplierHealth: 1,
        healthBonuses: [0, 0, 40, 40, 120, 120, 280],
        strengthBonuses: [0, 40, 40, 120, 120, 280, 280]
    }
}
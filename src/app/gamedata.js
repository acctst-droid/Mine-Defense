import Copper from "../../public/Copper.png";
import Oil from "../../public/Oil.png";
import Gold from "../../public/Gold.png"
import Iron from "../../public/Iron.png"
import Uranium from "../../public/Uranium.png"
import Coal from "../../public/Coal.png"
import Stone from "../../public/Stone.png"
import Furnace from "../../public/Furnace.png"
import IronPlate from "../../public/Iron Plate.png"
import GoldPlate from "../../public/Gold Plate.png"
import CopperPlate from "../../public/Copper Plate.png"
import Brick from "../../public/Brick.png"
import Pistol from "../../public/Pistol.png"
import PistolAmmo from "../../public/Pistol Ammo.png"
import Wall from "../../public/Wall.png"
import CoalGenerator from "../../public/Coal Generator.png"
import CoalDrill from "../../public/Coal Drill.png"
import CopperDrill from "../../public/Copper Drill.png"
import IronDrill from "../../public/Iron Drill.png"
import StoneDrill from "../../public/Stone Drill.png"
import UraniumDrill from "../../public/Uranium Drill.png"
import GoldDrill from "../../public/Gold Drill.png"
import BasicCircuit from "../../public/BasicCircuit.png"
import BasicBattery from "../../public/BasicBattery.png"
import ARAmmo from "../../public/AR Ammo.png"
import Rifle from "../../public/Rifle.png"
import RifleAmmo from "../../public/Rifle Ammo.png"
import AssaultRifle from "../../public/Assault Rifle.png"
import WaterPump from "../../public/Water Pump.png"
import Water from "../../public/Water.png"
import SteamEngine from "../../public/Steam Engine.png"
import Steel from "../../public/Steel.png"
import Boiler from "../../public/Boiler.png"
export const initial_state = {
  version: "beta 1.0",
  inventory: {
    Stone: 0,
    Coal: 0,
    Copper: 0,
    Iron: 0,
    Gold: 0,
    Oil: 0,
    Uranium: 0,
    Furnace: 0,
    "Iron Plate": 0,
    "Copper Plate": 0,
    "Gold Plate": 0,
    Brick: 0,
    Pistol: 0,
    "Pistol Ammo": 0,
    Wall: 0,
    "Coal Generator": 0,
    "Stone Drill": 0,
    "Coal Drill": 0,
    "Copper Drill": 0,
    "Iron Drill": 0,
    "Gold Drill": 0,
    "Uranium Drill": 0,
    "Basic Circuit": 0,
    "Basic Battery": 0,
    Rifle: 0,
    "Rifle Ammo": 0,
    "Assault Rifle": 0,
    "AR Ammo": 0,
    "Water Pump": 0,
    Water: 0,
    "Steam Engine": 0,
    Steel: 0,
    Boiler: 0,
  },
  raidStatus: {
    timeuntilraid: 600,
    timepassed: 0,
    monstersalive: 0,
    totalmonsters: 0,
    raidwave: 1,
    waving: false,
  },
  energystatus: {
    capacity: 0,
    energy: 0,
    spent: 0,
    gain: 0,
  },
  basestatus: {
    maxbasehp: 100,
    basehp: 100,
  },
  drillstatus: {

  },
  furnacesStatus: {},
  coalGeneratorStatus: {},
  waterpumpstatus: {},
  steamenginestatus: {},
}
export const Images = {
  Water: Water,
  Furnace: Furnace,
  Stone: Stone,
  Coal: Coal,
  Copper: Copper,
  Oil: Oil,
  Gold: Gold,
  Uranium: Uranium,
  Iron: Iron,
  "Iron Plate": IronPlate,
  "Gold Plate": GoldPlate,
  Brick: Brick,
  "Copper Plate": CopperPlate,
  Pistol: Pistol,
  "Pistol Ammo": PistolAmmo,
  Rifle: Rifle,
  "Rifle Ammo": RifleAmmo,
  "Assault Rifle": AssaultRifle,
  "AR Ammo": ARAmmo,
  Wall: Wall,
  "Coal Generator": CoalGenerator,
  "Coal Drill": CoalDrill,
  "Copper Drill": CopperDrill,
  "Iron Drill": IronDrill,
  "Stone Drill": StoneDrill,
  "Uranium Drill": UraniumDrill,
  "Gold Drill": GoldDrill,
  "Basic Circuit": BasicCircuit,
  "Basic Battery": BasicBattery,
  "Water Pump": WaterPump,
  "Steam Engine": SteamEngine,
  Steel: Steel,
  Boiler: Boiler,
}

export const StoneOre = {
  Ore: "Stone",
  timeToMine: 0.5,
  color: "#2B3E25",
  meltable: true,
  melttime: 1,
}
export const CopperOre = {
  Ore: "Copper",
  timeToMine: 2,
  color: "#B87333",
  meltable: true,
  melttime: 2
}
export const IronOre = {
  Ore: "Iron",
  timeToMine: 3,
  color: "#7b7a7d",
  meltable: true,
  melttime: 3
}
export const GoldOre = {
  Ore: "Gold",
  timeToMine: 5,
  color: "#D4AF37",
  meltable: true,
  melttime: 5,
}
export const UraniumOre = {
  Ore: "Uranium",
  timeToMine: 10,
  color: "#4CBB17",
  meltable: false,
  melttime: null,
}
export const OilMine = {
  Ore: "Oil",
  timeToMine: 5,
  color: "#1a1a1a",
  meltable: false,
  melttime: null,
}
export const CoalOre = {
  Ore: "Coal",
  timeToMine: 1,
  color: "#4F4F4F",
  meltable: false,
  melttime: null,
}

export const OreCards = {
  Stone: StoneOre,
  Coal: CoalOre,
  Copper: CopperOre,
  Iron: IronOre,
  Gold: GoldOre,
  Uranium: UraniumOre,
  Oil: OilMine,
  "Iron Plate": {
    Ore: "Iron Plate",
    meltable: true,
    melttime: 10,
  }
}

export const FurnaceCraft = {
  item: "Furnace",
  cost: [
    { resource: "Stone", amount: 10 }
  ],
  color: "#5A5A5A",
}

export const PistolCraft = {
  item: "Pistol",
  cost: [
    { resource: "Iron Plate", amount: 3 }
  ],
  color: "#4b4a4d",
  description: "25 damage"
}

export const PistolAmmoCraft = {
  item: "Pistol Ammo",
  cost: [
    { resource: "Iron Plate", amount: 1 }
  ],
  color: "#c7aa54"
}

export const WallCraft = {
  item: "Wall",
  cost: [
    { resource: "Brick", amount: 10 }
  ],
  color: "#0d3b08",
  description: "+10 HP (up to 10000)"
}

export const CoalGeneratorCraft = {
  item: "Coal Generator",
  cost: [
    { resource: "Iron Plate", amount: 5 },
    { resource: "Basic Circuit", amount: 2 }
  ],
  color: "#222324",
  description: "Energy generator"
}

export const CoalDrillCraft = {
  item: "Coal Drill",
  cost: [
    { resource: "Iron Plate", amount: 3 },
    { resource: "Basic Circuit", amount: 3 }
  ],
  color: "#1f2021",
  description: "Mine coal"
}

export const CopperDrillCraft = {
  item: "Copper Drill",
  cost: [
    { resource: "Iron Plate", amount: 6 },
    { resource: "Basic Circuit", amount: 2 }
  ],
  color: "#783813",
  description: "Mine copper"
}

export const IronDrillCraft = {
  item: "Iron Drill",
  cost: [
    { resource: "Iron Plate", amount: 15 },
    { resource: "Basic Circuit", amount: 5 }
  ],
  color: "#727372",
  description: "Mine iron"
}

export const GoldDrillCraft = {
  item: "Gold Drill",
  cost: [
    { resource: "Iron Plate", amount: 13 },
    { resource: "Basic Circuit", amount: 10 }
  ],
  color: "#edba21",
  description: "Mine gold"
}

export const UraniumDrillCraft = {
  item: "Uranium Drill",
  cost: [
    { resource: "Gold Plate", amount: 15 },
    { resource: "Basic Circuit", amount: 20 }
  ],
  color: "#0aa116",
  description: "Mine uranium"
}

export const StoneDrillCraft = {
  item: "Stone Drill",
  cost: [
    { resource: "Iron Plate", amount: 4 },
    { resource: "Basic Circuit", amount: 1 }
  ],
  color: "#515251",
  description: "Mine stone"
}

export const BasicCircuitCraft = {
  item: "Basic Circuit",
  cost: [
    { resource: "Copper Plate", amount: 2 }
  ],
  color: "#076e08",
}

export const BasicBatteryCraft = {
  item: "Basic Battery",
  cost: [
    { resource: "Iron Plate", amount: 3 },
    { resource: "Basic Circuit", amount: 4 }
  ],
  color: "#783813",
  description: "Stores energy"
}
export const RifleCraft = {
  item: "Rifle",
  cost: [
    { resource: "Iron Plate", amount: 10 },
    { resource: "Basic Circuit", amount: 2 }
  ],
  color: "#a86932",
  description: "50 damage"
}
export const RifleAmmoCraft = {
  item: "Rifle Ammo",
  cost: [
    { resource: "Steel", amount: 1 }
  ],
  color: "#bd7639",
  description: ""
}
export const AssaultRifleCraft = {
  item: "Assault Rifle",
  cost: [
    { resource: "Steel", amount: 10 },
    { resource: "Basic Circuit", amount: 4 }
  ],
  color: "#878480",
  description: "100 damage"
}
export const ARAmmoCraft = {
  item: "AR Ammo",
  cost: [
    { resource: "Steel", amount: 4 },
    { resource: "Basic Circuit", amount: 1 }
  ],
  color: "#5c5b5b",
  description: ""
}

const WaterPumpCraft = {
  item: "Water Pump",
  cost: [
    { resource: "Iron Plate", amount: 5, },
    { resource: "Basic Circuit", amount: 2 }
  ],
  
  color: "#0c17b0",
  description: "Pumps water"
}
const SteamEngineCraft = {
  item: "Steam Engine",
  cost: [
    { resource: "Steel", amount: 5, },
    { resource: "Basic Circuit", amount: 12 },
    { resource: "Gold Plate", amount: 2 },
    { resource: "Boiler", amount: 1 },
  ],
  color: "#48524c",
  description: "Generates energy"
}
const boilerCraft = {
  item: "Boiler",
  cost: [
    { resource: "Steel", amount: 2 },
    { resource: "Basic Circuit", amount: 2 },
    { resource: "Basic Battery", amount: 1}
  ],
  color: "#0c381e",
  description: ""
}
export const Craftables = {
  Furnace: FurnaceCraft,
  Pistol: PistolCraft,
  "Pistol Ammo": PistolAmmoCraft,
  "Rifle": RifleCraft,
  "Rifle Ammo": RifleAmmoCraft,
  "Assault Rifle": AssaultRifleCraft,
  "AR Ammo": ARAmmoCraft,
  Wall: WallCraft,
  "Basic Circuit": BasicCircuitCraft,
  "Basic Battery": BasicBatteryCraft,
  "Coal Generator": CoalGeneratorCraft,
  "Water Pump": WaterPumpCraft,
  Boiler: boilerCraft,
  "Steam Engine": SteamEngineCraft,
  "Stone Drill": StoneDrillCraft,
  "Coal Drill": CoalDrillCraft,
  "Copper Drill": CopperDrillCraft,
  "Iron Drill": IronDrillCraft,
  "Gold Drill": GoldDrillCraft,
  "Uranium Drill": UraniumDrillCraft,
}
export const MaxStack = {

  Furnace: 1,
  Pistol: 1,
  "Coal Generator": 1,
  "Water Pump": 1,
  "Steam Engine": 1,
  "Stone Drill": "Drill",
  "Coal Drill": "Drill",
  "Copper Drill": "Drill",
  "Iron Drill": "Drill",
  "Gold Drill": "Drill",
  "Uranium Drill": "Drill",
}
export const MeltingResults = {
  Iron: "Iron Plate",
  Copper: "Copper Plate",
  Gold: "Gold Plate",
  Stone: "Brick",
  "Iron Plate": "Steel",

}
export const Guns = {
  Pistol: {
    damage: 25,
    ammo: "Pistol Ammo"
  },
  Rifle: {
    damage: 50,
    ammo: "Rifle Ammo",
  },
  "Assault Rifle": {
    damage: 100,
    ammo: "AR Ammo"
  }
}
export const DrillEnergyNeeded = {
  Coal: 3,
  Copper: 3,
  Iron: 5,
  Gold: 10,
  Uranium: 20,
  Stone: 1,
} 
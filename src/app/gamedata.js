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
export const Images = {
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
  Wall: Wall,
  "Coal Generator": CoalGenerator,
  "Stone Drill": StoneDrill,
  "Coal Drill": CoalDrill,
  "Copper Drill": CopperDrill,
  "Iron Drill": IronDrill,
  "Stone Drill": StoneDrill,
  "Uranium Drill": UraniumDrill,
  "Gold Drill": GoldDrill,
  "Basic Circuit": BasicCircuit,
  "Basic Battery": BasicBattery,
}

export const StoneOre = {
  Ore: "Stone",
  timeToMine: 1,
  color: "#2B3E25",
  meltable: true,
  melttime: 2,
}
export const CopperOre = {
  Ore: "Copper",
  timeToMine: 3,
  color: "#B87333",
  meltable: true,
  melttime: 4
}
export const IronOre = {
  Ore: "Iron",
  timeToMine: 6,
  color: "#7b7a7d",
  meltable: true,
  melttime: 6
}
export const GoldOre = {
  Ore: "Gold",
  timeToMine: 10,
  color: "#D4AF37",
  meltable: true,
  melttime: 10,
}
export const UraniumOre = {
  Ore: "Uranium",
  timeToMine: 20,
  color: "#4CBB17",
  meltable: false,
  melttime: null,
}
export const OilMine = {
  Ore: "Oil",
  timeToMine: 10,
  color: "#1a1a1a",
  meltable: false,
  melttime: null,
}
export const CoalOre = {
  Ore: "Coal",
  timeToMine: 1.5,
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
}

export const FurnaceCraft = {
  item: "Furnace",
  resource: "Stone",
  resourceNeeded: 10,
  resource2: null,
  resourceNeeded2: null,
  color: "#5A5A5A",
}
export const PistolCraft = {
  item: "Pistol",
  resource: "Iron Plate",
  resourceNeeded: 5,
  resource2: null,
  resourceNeeded2: null,
  color: "#4b4a4d",
  description: "15 damage"

}
export const PistolAmmoCraft = {
  item: "Pistol Ammo",
  resource: "Iron Plate",
  resourceNeeded: 1,
  resource2: null,
  resourceNeeded2: null,
  color: "#c7aa54"
}
export const WallCraft = {
  item: "Wall",
  resource: "Brick",
  resourceNeeded: 5,
  resource2: null,
  resourceNeeded2: null,
  color: "#0d3b08",
  description: "+25 HP"
}
export const CoalGeneratorCraft = {
  item: "Coal Generator",
  resource: "Iron Plate",
  resourceNeeded: 5,
  resource2: "Basic Circuit",
  resourceNeeded2: 2,
  color: "#222324",
  description: "Energy generator"
}
export const CoalDrillCraft = {
  item: "Coal Drill",
  resource: "Iron Plate",
  resourceNeeded: 3,
  resource2: "Basic Circuit",
  resourceNeeded2: 3,
  color: "#1f2021",
  description: "Mine coal"
}
export const CopperDrillCraft = {
  item: "Copper Drill",
  resource: "Iron Plate",
  resourceNeeded: 6,
  resource2: "Basic Circuit",
  resourceNeeded2: 2,
  color: "#783813",
  description: "Mine copper"
}
export const IronDrillCraft = {
  item: "Iron Drill",
  resource: "Iron Plate",
  resourceNeeded: 15,
  resource2: "Basic Circuit",
  resourceNeeded2: 5,
  color: "#727372",
  description: "Mine iron"
}
export const GoldDrillCraft = {
  item: "Gold Drill",
  resource: "Iron Plate",
  resourceNeeded: 13,
  resource2: "Basic Circuit",
  resourceNeeded2: 10,
  color: "#edba21",
  description: "Mine gold"
}
export const UraniumDrillCraft = {
  item: "Uranium Drill",
  resource: "Gold Plate",
  resourceNeeded:  15,
  resource2: "Basic Circuit",
  resourceNeeded2: 20,
  color: "#0aa116",
  description: "Mine uranium"
}
export const StoneDrillCraft = {
  item: "Stone Drill",
  resource: "Iron Plate",
  resourceNeeded:  4,
  resource2: "Basic Circuit",
  resourceNeeded2: 1,
  color: "#515251",
  description: "Mine stone"
}
export const BasicCircuitCraft = {
  item: "Basic Circuit",
  resource: "Copper Plate",
  resourceNeeded: 2,
  resource2: null,
  resourceNeeded2: null,
  color: "#076e08",
}
export const BasicBatteryCraft = {
  item: "Basic Battery",
  resource: "Iron Plate",
  resourceNeeded: 6,
  resource2: "Basic Circuit",
  resourceNeeded2: 6,
  color: "#783813",
  description: "Stores energy"
}
export const Craftables = {
  Furnace: FurnaceCraft,
  Pistol: PistolCraft,
  "Pistol Ammo": PistolAmmoCraft,
  Wall: WallCraft,
  "Basic Circuit": BasicCircuitCraft,
  "Basic Battery": BasicBatteryCraft,
  "Coal Generator": CoalGeneratorCraft,
  "Stone Drill": StoneDrillCraft,
  "Coal Drill": CoalDrillCraft,
  "Copper Drill": CopperDrillCraft,
  "Iron Drill": IronDrillCraft,
  "Gold Drill": GoldDrillCraft,
  "Uranium Drill": UraniumDrillCraft,
}
export const MaxStack = {
  Stone: null,
  Coal: null,
  Copper: null,
  Iron: null,
  Gold: null,
  Oil: null,
  Uranium: null,
  "Iron Plate": null,
  "Gold Plate": null,
  "Copper Plate": null,
  "Brick": null,
  Furnace: 1,
  Pistol: 1,
  "Pistol Ammo": null,
  Wall: null,
  "Coal Generator": 1,
  "Stone Drill": "Drill",
  "Coal Drill": "Drill",
  "Copper Drill": "Drill",
  "Iron Drill": "Drill",
  "Gold Drill": "Drill",
  "Uranium Drill": "Drill",
  "Basic Circuit": null,
  "Basic Battery": null,
}
export const MeltingResults = {
  Iron: "Iron Plate",
  Copper: "Copper Plate",
  Gold: "Gold Plate",
  Stone: "Brick",

}
export const Guns = {
  Pistol: {
    damage: 15,
    ammo: "Pistol Ammo"
  },
}
export const DrillEnergyNeeded = {
  Coal: 2,
  Copper: 2,
  Iron: 5,
  Gold: 8,
  Uranium: 20,
  Stone: 1,
} 
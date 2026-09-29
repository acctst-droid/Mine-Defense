'use client'
import Image from "next/image";
import { Pickaxe, Clock, PaperBag, Hammer, Key, Trash, Outdent } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import BasicCircuit from "../../public/BasicCircuit.png"
import BasicBattery from "../../public/BasicBattery.png"
const Images = {
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
  "Coal Drill": CoalDrill,
  "Copper Drill": CopperDrill,
  "Basic Circuit": BasicCircuit,
  "Basic Battery": BasicBattery,
}

const StoneOre = {
  Ore: "Stone",
  timeToMine: 1,
  color: "#2B3E25",
  Auto: false,
  meltable: true,
  melttime: 2,
}
const CopperOre = {
  Ore: "Copper",
  timeToMine: 3,
  color: "#B87333",
  Auto: false,
  meltable: true,
  melttime: 4
}
const IronOre = {
  Ore: "Iron",
  timeToMine: 6,
  color: "#7b7a7d",
  Auto: false,
  meltable: true,
  melttime: 6
}
const GoldOre = {
  Ore: "Gold",
  timeToMine: 10,
  color: "#D4AF37",
  Auto: false,
  meltable: true,
  melttime: 10,
}
const UraniumOre = {
  Ore: "Uranium",
  timeToMine: 20,
  color: "#4CBB17",
  Auto: false,
  meltable: false,
  melttime: null,
}
const OilMine = {
  Ore: "Oil",
  timeToMine: 10,
  color: "#1a1a1a",
  Auto: false,
  meltable: false,
  melttime: null,
}
const CoalOre = {
  Ore: "Coal",
  timeToMine: 1.5,
  color: "#4F4F4F",
  Auto: false,
  meltable: false,
  melttime: null,
}

const OreCards = {
  Stone: StoneOre,
  Coal: CoalOre,
  Copper: CopperOre,
  Iron: IronOre,
  Gold: GoldOre,
  Uranium: UraniumOre,
  Oil: OilMine,
}

const FurnaceCraft = {
  item: "Furnace",
  resource: "Stone",
  resourceNeeded: 10,
  resource2: null,
  resourceNeeded2: null,
  color: "#5A5A5A",
}
const PistolCraft = {
  item: "Pistol",
  resource: "Iron Plate",
  resourceNeeded: 5,
  resource2: null,
  resourceNeeded2: null,
  color: "#4b4a4d",
  description: "15 damage"

}
const PistolAmmoCraft = {
  item: "Pistol Ammo",
  resource: "Iron Plate",
  resourceNeeded: 1,
  resource2: null,
  resourceNeeded2: null,
  color: "#c7aa54"
}
const WallCraft = {
  item: "Wall",
  resource: "Brick",
  resourceNeeded: 5,
  resource2: null,
  resourceNeeded2: null,
  color: "#0d3b08",
  description: "+25 HP"
}
const CoalGeneratorCraft = {
  item: "Coal Generator",
  resource: "Iron Plate",
  resourceNeeded: 5,
  resource2: "Basic Circuit",
  resourceNeeded2: 2,
  color: "#222324",
  description: "Energy generator"
}
const CoalDrillCraft = {
  item: "Coal Drill",
  resource: "Iron Plate",
  resourceNeeded: 3,
  resource2: "Basic Circuit",
  resourceNeeded2: 3,
  color: "#1f2021",
  description: "Mine coal"
}
const CopperDrillCraft = {
  item: "Copper Drill",
  resource: "Iron Plate",
  resourceNeeded: 6,
  resource2: "Basic Circuit",
  resourceNeeded2: 2,
  color: "#783813",
  description: "Mine copper"
}
const BasicCircuitCraft = {
  item: "Basic Circuit",
  resource: "Copper Plate",
  resourceNeeded: 2,
  resource2: null,
  resourceNeeded2: null,
  color: "#076e08",
}
const BasicBatteryCraft = {
  item: "Basic Battery",
  resource: "Iron Plate",
  resourceNeeded: 6,
  resource2: "Basic Circuit",
  resourceNeeded2: 6,
  color: "#783813",
  description: "Stores energy"
}
const Craftables = {
  Furnace: FurnaceCraft,
  Pistol: PistolCraft,
  "Pistol Ammo": PistolAmmoCraft,
  Wall: WallCraft,
  "Basic Circuit": BasicCircuitCraft,
  "Basic Battery": BasicBatteryCraft,
  "Coal Generator": CoalGeneratorCraft,
  "Coal Drill": CoalDrillCraft,
  "Copper Drill": CopperDrillCraft,
}
const MaxStack = {
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
  "Coal Drill": "Drill",
  "Copper Drill": "Drill",
  "Basic Circuit": null,
  "Basic Battery": null,
}
const MeltingResults = {
  Iron: "Iron Plate",
  Copper: "Copper Plate",
  Gold: "Gold Plate",
  Stone: "Brick",

}
const Guns = {
  Pistol: {
    damage: 15,
    ammo: "Pistol Ammo"
  },
}
export default function Home() {
  const [activeGui, setActiveGui] = useState(null)
  const [mine, canMine] = useState(true)
  const [basestatus, setbasehp] = useState({
    maxbasehp: 100,
    basehp: 100,
  })
  const [raidStatus, setRaidStatus] = useState({
    timeuntilraid: 420,
    timepassed: 0,
    monstersalive: 0,
    totalmonsters: 0,
    raidwave: 1,
    waving: false,

  })
  const [energystatus, setEnergystatus] = useState({
    capacity: 0,
    energy: 0,
  })
  const [lastmine, setLastMine] = useState(null)
  const [gameover, setgameover] = useState(false)
  const [miningBar, setMiningBar] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [openFurnace, setOpenFurnace] = useState(null)
  const [furnacesStatus, setfurnacesStatus] = useState({})
  const [openCoalGenerator, setOpenCoalGenerator] = useState(null)
  const raidstatusref = useRef(raidStatus)
  const basehpref = useRef(basestatus)
  const [coalGeneratorStatus, setCoalGeneratorStatus] = useState({})
  const coalgeneratorref = useRef(coalGeneratorStatus)
  const energystatusref = useRef(energystatus)
  useEffect(() => {
    energystatusref.current = energystatus
  }, [energystatus])
  useEffect(() => {
    const interval = setInterval(() => {
    }, 3000);
    return () => clearInterval(interval)

  }, [])
  useEffect(() => {
    coalgeneratorref.current = coalGeneratorStatus
  }, [coalGeneratorStatus])
  useEffect(() => {
    raidstatusref.current = raidStatus
  }, [raidStatus])
  useEffect(() => {
    basehpref.current = basestatus
  }, [basestatus])
  const furnacesRef = useRef(furnacesStatus)
  useEffect(() => {
    furnacesRef.current = furnacesStatus
  }, [furnacesStatus])

  const [inventory, setInventory] = useState({
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
    "Coal Drill": 0,
    "Copper Drill": 0,
    "Basic Circuit": 0,
    "Basic Battery": 0,
  })
  const inventoryRef = useRef(inventory)
  useEffect(() => {
    inventoryRef.current = inventory
  }, [inventory])


  useEffect(() => {
    const interval = setInterval(() => {
      let spentcoal = 0;
      // ===== Lógica do primeiro useEffect (mineração) =====
      if (lastmine !== null) {
        const timetomine = OreCards[lastmine].timeToMine ?? 0;
        const timepassed = Date.now() - (startTime ?? 0);

        setMiningBar((timepassed / (timetomine * 1000)) * 100);

        if (timepassed >= timetomine * 1000) {
          setInventory(prev => ({
            ...prev,
            [lastmine]: prev[lastmine] + 1,
          }));
          canMine(prev => !prev);
          setLastMine(null);
          setStartTime(null);
        }
      }

      // ===== Lógica do segundo useEffect (fornalhas) =====
      Object.entries(furnacesRef.current).forEach(([key, value]) => {
        const canMelt = value.Input !== null;
        const hasAnDifferentOuput = (value.Output ?? false) !== (MeltingResults[value.Input] ?? false);

        if (canMelt && inventoryRef.current.Coal > 0 && value.Quantity >= 1) {
          setfurnacesStatus(prev => ({
            ...prev,
            [key]: {
              ...prev[key],
              Melting: true,
              TimeMelted: prev[key].TimeMelted + 0.1, // ajustado de 0.5 para 0.1 (100ms)
            }
          }));
        }

        if (value.TimeMelted >= value.TimeToMelt && canMelt && inventoryRef.current.Coal > 0) {
          setfurnacesStatus(prev => ({
            ...prev,
            [key]: {
              ...prev[key],
              TimeMelted: 0,
              Quantity: prev[key].Quantity - 1,
              OutputQuantity: prev[key].OutputQuantity + 1,
              Output: MeltingResults[value.Input],
            }
          }));
         spentcoal +=1
        }
      });

      // ===== Lógica do terceiro useEffect (base HP regen) =====
      if (basehpref.current.basehp < basehpref.current.maxbasehp) {
        setbasehp(prev => ({
          ...prev,
          basehp: prev.basehp + (prev.maxbasehp / 5000) // ajustado de /1000 para /5000 (100ms)
        }));
      }
      if (basehpref.current.basehp > basehpref.current.maxbasehp) {
        setbasehp(prev => ({
          ...prev,
          basehp: prev.maxbasehp
        }));
      }

      // ===== Lógica do quinto useEffect (coal generators) =====
      Object.entries(coalgeneratorref.current).forEach(([key, value]) => {
        if (!coalgeneratorref.current[key].Burning) return;
        const coalgenref = coalgeneratorref.current;

        if (coalgenref[key].TimeBurned >= 3) {
          spentcoal +=1
          setEnergystatus(prev => ({
            ...prev,
            energy: prev.energy + 5
          }));
          setCoalGeneratorStatus(prev => ({
            ...prev,
            [key]: {
              ...prev[key],
              TimeBurned: 0,
            }
          }));

          if (inventoryRef.current.Coal <= 0) {
            Object.entries(coalgeneratorref.current).forEach(([k, v]) => {
              setCoalGeneratorStatus(prev => ({
                ...prev,
                [k]: { ...prev[k], Burning: false }
              }));
            });
          }
        }

        if (inventoryRef.current.Coal > 0) {
          setCoalGeneratorStatus(prev => ({
            ...prev,
            [key]: {
              ...prev[key],
              TimeBurned: prev[key].TimeBurned + 0.1 // ajustado de 0.5 para 0.1 (100ms)
            }
          }));
        }
      });

      if (energystatusref.current.capacity < energystatusref.current.energy) {
        setEnergystatus(prev => ({
          ...prev,
          energy: prev.capacity
        }));
      }
      setInventory(prev => ({
        ...prev,
        Coal: prev.Coal - spentcoal
      }))
      if (inventoryRef.current.Coal < 0) {
        setInventory(prev => ({
          ...prev,
          Coal: 0
        }))
      }
      setEnergystatus(prev => ({
        ...prev,
        capacity: (inventoryRef.current["Basic Battery"] * 100)
      }))
    }, 100);
    return () => clearInterval(interval);
  }, [startTime, lastmine]);

  useEffect(() => {
    const minterval = setInterval(() => {
      const rsf = raidstatusref.current
      const maxbasehpcalc = 100 + (inventoryRef.current.Wall * 25)
      setbasehp(prev => ({
        ...prev,
        maxbasehp: maxbasehpcalc
      }))
      setRaidStatus(prev => ({
        ...prev,
        timepassed: prev.timepassed + 1
      }))
      if (rsf.timepassed >= rsf.timeuntilraid) {
        setRaidStatus(prev => ({
          ...prev,
          monstersalive: prev.raidwave * 2,
          totalmonsters: prev.raidwave * 2,
          waving: true,
          timepassed: 0,
          timeuntilraid: 180,
        }))

      } else if (rsf.waving) {
        let dps = 0;



        if (rsf.monstersalive <= 0) {
          setRaidStatus(prev => ({
            ...prev,
            waving: false,
            raidwave: prev.raidwave + 1,
            monstersalive: prev.totalmonsters,

          }))
        }
        if (basehpref.current.basehp <= 0) {
          setgameover(true)
        } else {
          setbasehp(prev => ({
            ...prev,
            basehp: prev.basehp - (rsf.monstersalive * 5)
          }))
        }
        Object.entries(Guns).forEach(([key, value]) => {
          if (inventoryRef.current[key] >= 0 && inventoryRef.current[value.ammo] >= inventoryRef.current[key]) {
            dps = (dps + inventoryRef.current[key] * value.damage)

            setInventory(prev => ({
              ...prev,
              [value.ammo]: prev[value.ammo] - prev[key]
            }))
          }
        })
        setRaidStatus(prev => ({
          ...prev,
          monstersalive: prev.monstersalive - (dps / 100)

        }))



      }
    }, 1000);
    return () => clearInterval(minterval)
  }, [])

  return (
    <>
      <div className="select-none flex justify-start items-center h-screen">
        <div className="relative h-150 w-50  bg-slate-900/80 border border-slate-700/50 rounded-xl ml-10 flex justify-start flex-col items-center shadow-inner ">
          <div className="mt-5 bg-zinc-700 cursor-pointer flex justify-center items-center gap-1 h-10 w-40 rounded-xl drop-shadow-2xl botaogenerico" onClick={() => setActiveGui(prev => prev === "Mine" ? null : "Mine")}
          >
            <Pickaxe color=""></Pickaxe>
            <span className="text-2xl">Mine</span>
          </div>
          <div className="mt-5 bg-amber-900 cursor-pointer flex justify-center items-center gap-1 h-10 w-40 rounded-xl drop-shadow-2xl botaogenerico" onClick={() => setActiveGui(prev => prev === "Inventory" ? null : "Inventory")}
          >
            <PaperBag></PaperBag>
            <span className="text-2xl">Inventory</span>
          </div>
          <div className="mt-5 bg-[#2A9D8F] cursor-pointer flex justify-center items-center gap-1 h-10 w-40 rounded-xl drop-shadow-2xl botaogenerico" onClick={() => setActiveGui(prev => prev === "Craft" ? null : "Craft")}
          >
            <Hammer></Hammer>
            <span className="text-2xl">Craft</span>
          </div>
        </div>
        {activeGui === "Mine" && <div className=" w-300 z-20 h-150 bg-slate-900/80 border overflow-auto border-slate-700/50 rounded-xl ml-10 grid grid-rows-2 grid-cols-6  justify-start flex-row items-start shadow-inner">
          {Object.entries(OreCards).map(([key, value]) => (
            <div key={key} className="w-40 h-60 rounded-xl flex justify-start items-center flex-col gap-2 ml-5 mt-5 p-4" style={{ backgroundColor: value.color }}>
              <span className="text-2xl font-bold">{value.Ore}</span>
              <Image src={Images[value.Ore]} alt="Copper" width={70} height={70}></Image>
              {lastmine !== value.Ore && mine && <button className="px-10 bg-green-500 rounded-xl cursor-pointer " onClick={() => {
                canMine(!mine);
                setStartTime(Date.now())
                setLastMine(value.Ore)
              }
              }>Mine</button>}
              {lastmine === value.Ore && <div className="relative bg-gray-200/60 rounded-[5px] w-full h-5 flex justify-start items-center overflow-hidden">
                <div
                  key={lastmine + "-" + startTime}
                  className="bg-green-500 h-full rounded-[5px] duration-100 ease-linear transition-[width]"
                  style={{ width: (miningBar ?? 0) + "%" }}
                ></div>
                <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">{Math.round(miningBar ?? 0) + "%"}</span></div>}
              <div className="flex justify-center items-center flex-row gap-0.5">
                <Clock></Clock>
                <span>{value.timeToMine + "s"}</span>
              </div>
            </div>
          ))}
        </div>}

        {activeGui === "Inventory" && <div className="relative z-20 w-300 h-150 p-6 bg-slate-900/80 border overflow-auto border-slate-700/50 rounded-xl ml-10 grid auto-rows-auto gap-6 grid-cols-6  justify-start flex-row items-start shadow-inner">
          {Object.entries(inventory).map(([key, value]) => {
            if (value === 0) return null;
            if (!Images[key]) return null;
            if ((MaxStack[key] === null)) {
              return (
                <div key={key} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60 rounded-2xl gap-2 p-3 ">
                  <span className="text-auto font-bold">{key}</span>
                  <Image src={Images[key]} alt={key} width={50} height={50}></Image>
                  <span className="text-bold text-2xl">{value}</span>
                </div>
              )
            } else if (key === "Furnace") {
              return Array.from({ length: value }, (_, i) => (
                <div key={key + i} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60  rounded-2xl gap-2 p-3 ">
                  <span className="text-auto font-bold">{key}</span>
                  <Image src={Images[key]} alt={key} width={50} height={50}></Image>
                  <button className="px-6 bg-green-500 rounded-2xl font-bold botaogenerico" onClick={() => {
                    setOpenFurnace(key + i)
                  }}>Use</button>

                </div>
              ))
            } else if (key === "Coal Generator") {
              return Array.from({ length: value }, (_, i) => (
                <div key={key + i} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60  rounded-2xl gap-2 p-3">
                  <span className="text-auto font-bold">{key}</span>
                  <Image src={Images[key]} alt={key} width={50} height={50}></Image>
                  <button className="px-6 bg-green-500 rounded-2xl font-bold botaogenerico" onClick={() => {
                    setOpenCoalGenerator(key + i)
                  }}>Use</button>

                </div>


              ))
            }
            else {
              if (MaxStack[key] === "Drill") return null;

              return (
                <div key={key} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60 rounded-2xl gap-2 p-3 ">
                  <span className="text-auto font-bold">{key}</span>
                  <Image src={Images[key]} alt={key} width={50} height={50}></Image>
                  <span className="text-bold text-2xl">{value}</span>
                </div>
              )
            }
          })}
          {openCoalGenerator !== null && <div className="absolute w-100 h-100 bg-zinc-600  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-start items-center gap-2 p-5 rounded-2xl">
            <Image src={Images["Coal Generator"]} width={150} height={150} alt="Coal Generator"></Image>
            <span className="w-10 h-10 absolute font-bold text-center flex justify-center items-center botaogenerico  text-3xl top-3 right-3 bg-red-500 rounded"
              onClick={() => {
                setOpenCoalGenerator(null)
              }}
            >X</span>
            <div className="relative flex justify-start items-center h-10 w-80 rounded bg-zinc-300/60 overflow-hidden">
              <span className="absolute left-1/2 -translate-x-1/2 text-auto font-bold z-10">{"3s"}</span>
              {coalGeneratorStatus[openCoalGenerator]?.Burning && (
                <div
                  className="bg-green-500 h-10 rounded duration-100 ease-linear transition-[width]"
                  style={{ width: ((coalGeneratorStatus[openCoalGenerator]?.TimeBurned ?? 0) / 3) * 100 + "%" }}
                ></div>
              )}
            </div>

            <button className={`${coalGeneratorStatus[openCoalGenerator].Burning ? "w-40 botaogenerico h-10 rounded-2xl font-bold text-auto bg-green-500" : "w-40 botaogenerico h-10 rounded-2xl font-bold text-auto bg-red-500"} `}
              onClick={() => {
                if (!coalGeneratorStatus[openCoalGenerator].Burning) {
                  if (inventory.Coal > 0) {
                    setInventory(prev => ({
                      ...prev,
                      Coal: prev.Coal - 1
                    }))
                    setCoalGeneratorStatus(prev => ({
                      ...prev,
                      [openCoalGenerator]: {


                        ...prev[openCoalGenerator],
                        Burning: true
                      }

                    }))
                  }
                } else {
                  setCoalGeneratorStatus(prev => ({
                    ...prev,
                    [openCoalGenerator]: {
                      ...prev[openCoalGenerator],
                      Burning: false,
                    }
                  }))
                }

              }}
            >Generate</button>
            <div className="rounded h-20 w-20 bg-zinc-800/60 flex flex-col justify-center items-center">
              <Image src={Images.Coal} width={70} height={70} alt="Coal Image"></Image></div>
            <span className="font-bold text-2xl">{inventory.Coal}</span>
            <span className="text-[15px]">Generate 5 Energy per coal</span>
          </div>
          }
          {openFurnace !== null && <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-120 h-100 bg-zinc-500 rounded-2xl flex flex-col justify-start items-center gap-2 p-5">
            <span className="w-10 h-10 absolute font-bold text-center flex justify-center items-center botaogenerico  text-3xl top-3 right-3 bg-red-500 rounded" onClick={() => {
              setOpenFurnace(null)
            }}>X</span>
            <div className="flex justify-center items-center">
              <span className="text-3xl font-bold">Furnace</span>
            </div>
            <div className="h-20 w-100 rounded-2xl overflow-x-auto overflow-y-hidden flex bg-zinc-600/80 p-3 gap-3 justify-start items-center">
              {Object.entries(OreCards).map(([key, value]) => {
                if (value.meltable === false | inventory[value.Ore] <= 0) return null;
                return (

                  <div key={key} className="h-15 w-15 rounded p-3 botaogenerico flex justify-center items-center flex-col bg-zinc-300/60"
                    onClick={() => {
                      if (furnacesStatus[openFurnace].OutputQuantity > 0 && furnacesStatus[openFurnace].Output !== MeltingResults[value.Ore]) return;
                      if (furnacesStatus[openFurnace].Input !== value.Ore) {
                        const oldinputore = furnacesStatus[openFurnace].Input

                        setInventory(prev => ({
                          ...prev,
                          [oldinputore]: prev[oldinputore] + furnacesStatus[openFurnace].Quantity
                        }))
                        setfurnacesStatus(prev => ({
                          ...prev,
                          [openFurnace]: {
                            ...prev[openFurnace],
                            Quantity: 0,
                          }
                        }))
                      }
                      setfurnacesStatus(prev => ({
                        ...prev,
                        [openFurnace]: {
                          ...prev[openFurnace],

                          TimeToMelt: value.melttime,
                          TimeMelted: prev[openFurnace].TimeMelted,
                          Input: value.Ore,
                          Quantity: prev[openFurnace].Quantity + 1,
                          Output: MeltingResults[value.Ore]
                        }
                      }))
                      setInventory(prev => ({
                        ...prev,
                        [value.Ore]: prev[value.Ore] - 1
                      }))
                  
                    }}>
                    <Image className="mt-2" src={Images[value.Ore]} height={30} width={30} alt={value.Ore}></Image>
                    <span>{inventory[value.Ore]}</span>
                  </div>
                )
              })}</div>
            <div className="h-15 w-110 rounded mt-5 flex justify-between p-2 items-center">
              <div className="rounded h-20 w-12 bg-zinc-800/60 flex flex-col justify-center items-center">
                {furnacesStatus[openFurnace].Input !== null &&
                  <>
                    <Image src={Images[furnacesStatus[openFurnace].Input] ?? null} width={44} height={44} alt="Input"></Image>
                    <span className="">{furnacesStatus[openFurnace].Quantity}</span>

                  </>}
              </div>
              <div className="rounded relative h-12 w-75 bg-zinc-300/60 flex justify-start items-center overflow-hidden">
                {furnacesStatus[openFurnace].TimeMelted > 0 &&
                  <span className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold z-10">
                    {Math.round(furnacesStatus[openFurnace].TimeToMelt - furnacesStatus[openFurnace].TimeMelted) + "s"}
                  </span>}
                {furnacesStatus[openFurnace].TimeMelted > 0 && furnacesStatus[openFurnace].TimeToMelt &&
                  <div
                    key={openFurnace + "-" + furnacesStatus[openFurnace].Quantity}
                    className="bg-green-500 h-12 rounded duration-100 ease-linear transition-[width]"
                    style={{ width: ((furnacesStatus[openFurnace].TimeMelted ?? 0) / (furnacesStatus[openFurnace].TimeToMelt ?? 1)) * 100 + "%" }}
                  ></div>
                }
              </div>
              <div className="rounded h-20 w-12 bg-zinc-800/60 flex flex-col justify-center items-center botaogenerico" onClick={() => {
                if (furnacesStatus[openFurnace].OutputQuantity > 0) {
                  setInventory(prev => ({
                    ...prev,
                    [furnacesStatus[openFurnace].Output]: prev[furnacesStatus[openFurnace].Output] + furnacesStatus[openFurnace].OutputQuantity
                  }))
                  setfurnacesStatus(prev => ({
                    ...prev,
                    [openFurnace]: {

                      ...prev[openFurnace],
                      OutputQuantity: 0,
                    }



                  }))
                }
              }}>

                {furnacesStatus[openFurnace].Output !== null && furnacesStatus[openFurnace].OutputQuantity > 0 &&
                  <>
                    <Image src={Images[furnacesStatus[openFurnace].Output]} width={44} height={44} alt="Input"></Image>
                    <span className="">{furnacesStatus[openFurnace].OutputQuantity}</span>

                  </>}
              </div>
            </div>
            <div className="rounded p-2 h-12 w-12 bg-zinc-800/60">
              <Image src={Images.Coal} alt="Coal"></Image></div>
            <span>{inventory.Coal}</span>
          </div>}

        </div>}

        {activeGui === "Craft" && <div className="z-20 w-300 h-150 p-6 bg-slate-900/80 overflow-y-auto overflow-x-hidden gap-6 border overflow-auto border-slate-700/50 rounded-xl ml-10 grid auto-rows-min grid-cols-5 justify-start flex-row items-start shadow-inner">
          {Object.entries(Craftables).map(([key, value]) => {
            const inventoryresource = inventory[value.resource]
            const inventoryresource2 = inventory[value.resource2]
            const inventoryitem = inventory[value.item]
            const resourcephoto = Images[value.resource]
            const resourcephoto2 = Images[value.resource2]
            return (
              <div className="w-50 h-80 justify-start items-center flex flex-col  p-3 rounded-2xl m-5 gap-1" style={{ backgroundColor: value.color }} key={key}>
                <Image src={Images[value.item]} alt={value.item} height={70} width={70}></Image>
                <span className="font-bold text-2xl">{value.item}</span>
                <div className="flex flex-row justify-center items-center gap-1">
                  <Image src={resourcephoto} alt={value.resource} height={30} width={30}></Image>
                  <span className={` ${inventoryresource >= value.resourceNeeded ? "text-white" : "text-red-500"}`}
                  >{value.resourceNeeded + " " + value.resource + " (" + inventoryresource + ")"}</span>
                </div>
                {value.resource2 && <div className="flex flex-row justify-center items-center gap-1">
                  <Image src={resourcephoto2} alt={value.resource2} height={30} width={30}></Image>
                  <span className={` ${inventoryresource2 >= (value.resourceNeeded2 ?? 0) ? "text-white" : "text-red-500"}`}
                  >{value.resourceNeeded2 + " " + value.resource2 + " (" + inventoryresource2 + ")"}</span>
                </div>

                }

                <button className="mt-2 bg-green-500 rounded-2xl botaogenerico font-bold text-2xl px-6"
                  onClick={() => {

                    if (value.resource2 === null) {
                      if (inventoryresource >= value.resourceNeeded) {

                        setInventory(prev => ({
                          ...prev,
                          [value.resource]: prev[value.resource] - value.resourceNeeded,
                          [value.item]: prev[value.item] + 1,
                        }))
                        if (key === "Furnace") {
                          const furnaceId = "Furnace" + inventory.Furnace
                          setfurnacesStatus(prev => ({
                            ...prev,
                            [furnaceId]: {
                              Melting: true,
                              TimeToMelt: null,
                              TimeMelted: 0,
                              Input: null,
                              Quantity: 0,
                              Output: null,
                              OutputQuantity: 0,
                            }
                          }))
                        }
                      }
                    } else if (value.resource2 !== null) {
                      if (inventoryresource >= (value.resourceNeeded) && inventoryresource2 >= (value.resourceNeeded2 ?? 0)) {
                        const resource2 = value.resource2
                        setInventory(prev => ({
                          ...prev,
                          [value.resource]: prev[value.resource] - value.resourceNeeded,
                          [resource2]: prev[value.resource2] - (value.resourceNeeded2 ?? 0),
                          [value.item]: prev[value.item] + 1,
                        }))
                        if (key === "Coal Generator") {
                          const coalgeneratorid = "Coal Generator" + inventory["Coal Generator"]
                          setCoalGeneratorStatus(prev => ({
                            ...prev,
                            [coalgeneratorid]: {
                              Burning: false,
                              TimeBurned: 0,

                            }
                          }))
                        }
                      }
                    }
                  }}>Craft</button>
                <span className="font-bold mt-2">{Craftables[key].description ?? ""}</span>
              </div>
            )
          })}
        </div>}
        <div className="absolute top-1 left-1/2 -translate-x-1/2">

          {!raidStatus.waving &&
            <div className="flex-col flex text-center">
              <span className="text-2xl font-bold">Wave level: {raidStatus.raidwave}</span>
              <span className=" text-2xl font-bold  ">Next wave: <TimeFormatter seconds={raidStatus.timeuntilraid - raidStatus.timepassed} /></span>
              <div className="flex justify-start items-center rounded relative bg-zinc-300/60">
                <div className=" h-10 bg-green-500 rounded transition-[width] duration-100 ease-linear" style={{ width: (basestatus.basehp / basestatus.maxbasehp) * 100 + "%" }}></div>
                <span className="absolute font-bold text-2xl left-1/2 -translate-x-1/2">{Math.round(basestatus.basehp) + "/" + Math.round(basestatus.maxbasehp) + "HP"}</span>
              </div>
            </div>
          }
          {raidStatus.waving &&
            <div className=" flex-col justify-center items-center">
              <span className=" text-2xl font-bold  ">MONSTERS ARE RAIDING!</span>
              <div className="flex justify-start items-center rounded relative bg-zinc-300/60">
                <span className="absolute font-bold text-2xl left-1/2 -translate-x-1/2">{Math.round(basestatus.basehp) + "/" + Math.round(basestatus.maxbasehp) + "HP"}</span>
                <div className=" h-10 bg-green-500 rounded transition-[width] duration-100 ease-linear" style={{ width: (basestatus.basehp / basestatus.maxbasehp) * 100 + "%" }}></div>
              </div>
              <div className="flex  mt-2 justify-start items-center rounded relative bg-zinc-300/60">
                <span className="absolute text-[20px] text-nowrap font-bold left-1/2 -translate-x-1/2">{"Monsters alive: " + Math.max(1, Math.round(raidStatus.monstersalive))}</span>
                <div className=" h-10 bg-red-500 rounded transition-[width] duration-100 ease-linear" style={{ width: (raidStatus.monstersalive / raidStatus.totalmonsters) * 100 + "%" }}></div>
              </div>
            </div>}


        </div>
        {gameover && (
          <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
            <span className="text-6xl font-bold text-red-500">GAME OVER</span>
          </div>
        )}
        {energystatus.capacity > 0 &&
          <div className="absolute bg-zinc-300/80 bottom-2 flex justify-start items-center right-2 w-60 h-9 z-20 rounded-xl">
            <div className="bg-amber-300 h-9 rounded-xl transition-[width] duration-100 ease-linear " style={{ width: (energystatus.energy / energystatus.capacity) * 100 + "%" }}>
              <span className=" text-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-zinc-900/50  font-bold">{Math.round(energystatus.energy) + "e/" + Math.round(energystatus.capacity) + "e"}</span></div></div>}

      </div >

    </>
  );
}
export function TimeFormatter(props) {
  const seconds = props.seconds;

  const formatTime = (totalSeconds) => {
    const secs = Math.max(0, Math.floor(totalSeconds || 0));

    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return formatTime(seconds);
}
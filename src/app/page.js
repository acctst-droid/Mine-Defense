'use client'
import Image from "next/image";
import { Pickaxe, Clock, PaperBag, Hammer, Key, Trash, Drill } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Images, Craftables, MaxStack, OreCards,
  MeltingResults, Guns, DrillEnergyNeeded, initial_state
} from "./gamedata.js"

export default function Home() {
  const [gamestatus, setGamestatus] = useState(
    initial_state)

  const gamestatusref = useRef(gamestatus)
  useEffect(() => { gamestatusref.current = gamestatus }, [gamestatus])
  useEffect(() => {
    const gamedata = JSON.parse(localStorage.getItem("gamestatus"))
    if (gamedata !== null) {
      setGamestatus(gamedata)

    }
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("gamestatus", JSON.stringify(gamestatusref.current))
    }, 5000);
    return () => clearInterval(interval)
  }, [])
  const [activeGui, setActiveGui] = useState(null)
  const [mine, canMine] = useState(true)
  const [lastmine, setLastMine] = useState(null)
  const [miningBar, setMiningBar] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [openFurnace, setOpenFurnace] = useState(null)
  const [openCoalGenerator, setOpenCoalGenerator] = useState(null)
  const [gameover, setgameover] = useState(false)
  const [openwaterpump, setopenwaterpump] = useState(null)
  const [opensteamengine, setopensteamengine] = useState(null)

  const lastmineref = useRef(lastmine)
  useEffect(() => { lastmineref.current = lastmine }, [lastmine])
  const starttimeref = useRef(startTime)
  useEffect(() => { starttimeref.current = startTime }, [startTime])

  useEffect(() => {
    const interval = setInterval(() => {
      let spentcoal = 0;
      const availableenergy = gamestatusref.current.energystatus.energy
      let energyspent = 0;
      let energygain = 0;
      let spentwater = 0;

      // ===== Mineração manual =====
      if (lastmineref.current !== null) {
        const timetomine = OreCards[lastmineref.current].timeToMine ?? 0;
        const timepassed = Date.now() - (starttimeref.current ?? 0);

        setMiningBar((timepassed / (timetomine * 1000)) * 100);

        if (timepassed >= timetomine * 1000) {
          const ore = lastmineref.current
          setGamestatus(prev => ({
            ...prev,
            inventory: { ...prev.inventory, [ore]: prev.inventory[ore] + 1 }
          }));
          canMine(prev => !prev);
          setLastMine(null);
          setStartTime(null);
        }
      }

      // ===== Fornalhas =====
      Object.entries(gamestatusref.current.furnacesStatus).forEach(([key, value]) => {
        const canMelt = value.Input !== null;

        if (canMelt && gamestatusref.current.inventory.Coal > 0 && value.Quantity >= 1) {
          setGamestatus(prev => ({
            ...prev,
            furnacesStatus: {
              ...prev.furnacesStatus,
              [key]: {
                ...prev.furnacesStatus[key],
                Melting: true,
                TimeMelted: prev.furnacesStatus[key].TimeMelted + 0.1,
              }
            }
          }));
        }

        if (value.TimeMelted >= value.TimeToMelt && canMelt && gamestatusref.current.inventory.Coal > 0) {
          setGamestatus(prev => ({
            ...prev,
            furnacesStatus: {
              ...prev.furnacesStatus,
              [key]: {
                ...prev.furnacesStatus[key],
                TimeMelted: 0,
                Quantity: prev.furnacesStatus[key].Quantity - 1,
                OutputQuantity: prev.furnacesStatus[key].OutputQuantity + 1,
                Output: MeltingResults[value.Input],
              }
            }
          }));
          spentcoal += 1
        }
      });

      // ===== Regeneração da base =====
      if (gamestatusref.current.basestatus.basehp < gamestatusref.current.basestatus.maxbasehp) {
        setGamestatus(prev => ({
          ...prev,
          basestatus: {
            ...prev.basestatus,
            basehp: prev.basestatus.basehp + (prev.basestatus.maxbasehp / 1200)
          }
        }));
      }
      if (gamestatusref.current.basestatus.basehp > gamestatusref.current.basestatus.maxbasehp) {
        setGamestatus(prev => ({
          ...prev,
          basestatus: {
            ...prev.basestatus,
            basehp: prev.basestatus.maxbasehp
          }
        }));
      }

      // ===== Coal Generators =====
      Object.entries(gamestatusref.current.coalGeneratorStatus).forEach(([key, value]) => {
        if (!value.Burning) return;

        if (value.TimeBurned >= 3) {
          spentcoal += 1
          setGamestatus(prev => ({
            ...prev,
            coalGeneratorStatus: {
              ...prev.coalGeneratorStatus,
              [key]: { ...prev.coalGeneratorStatus[key], TimeBurned: 0 }
            }
          }));

          if (gamestatusref.current.inventory.Coal <= 0) {
            setGamestatus(prev => {
              const updated = {}
              Object.keys(prev.coalGeneratorStatus).forEach(k => {
                updated[k] = { ...prev.coalGeneratorStatus[k], Burning: false }
              })
              return { ...prev, coalGeneratorStatus: updated }
            });
          }
        }

        if (gamestatusref.current.inventory.Coal > 0) {
          setGamestatus(prev => ({
            ...prev,
            coalGeneratorStatus: {
              ...prev.coalGeneratorStatus,
              [key]: { ...prev.coalGeneratorStatus[key], TimeBurned: prev.coalGeneratorStatus[key].TimeBurned + 0.1 }
            }
          }));
          energygain += 1
        }
      });

      // ===== Drills =====
      Object.entries(gamestatusref.current.drillstatus).forEach(([key, value]) => {
        if (value.Mining && availableenergy >= DrillEnergyNeeded[value.Ore]) {
          energyspent += DrillEnergyNeeded[value.Ore] / 10
          setGamestatus(prev => ({
            ...prev,
            drillstatus: {
              ...prev.drillstatus,
              [key]: { ...prev.drillstatus[key], timemined: prev.drillstatus[key].timemined + 0.1 }
            }
          }))
          if (value.timemined >= value.timetomine) {
            setGamestatus(prev => ({
              ...prev,
              drillstatus: {
                ...prev.drillstatus,
                [key]: { ...prev.drillstatus[key], timemined: 0 }
              },
              inventory: {
                ...prev.inventory,
                [value.Ore]: prev.inventory[value.Ore] + 1
              }
            }))
          }
        }
      })
      Object.entries(gamestatusref.current.waterpumpstatus).map(([key, value]) => {
        if (availableenergy < 1 || !value.working) return
        energyspent += 0.3
        setGamestatus(prev => {
          const pump = prev.waterpumpstatus[key]
          let newprocess = pump.process + 0.1
          let newinventory = prev.inventory
          if (newprocess >= 1) {
            newprocess = 0,
              newinventory = { ...prev.inventory, Water: prev.inventory.Water + 3 }
          }
          return {
            ...prev,
            inventory: newinventory,
            waterpumpstatus: {
              ...prev.waterpumpstatus,
              [key]: { ...prev.waterpumpstatus[key], process: Math.min(1, newprocess) }
            }
          }

        })
      })
      Object.entries(gamestatusref.current.steamenginestatus).map(([key, value]) => {
        if (gamestatusref.current.inventory.Coal > 0 && value.working && gamestatusref.current.inventory.Water > 2) {
          energygain += 5

          if (value.process >= 3) {
            spentcoal += 1,
            spentwater +=3
              setGamestatus(prev => ({
                ...prev,
                steamenginestatus: {
                  ...prev.steamenginestatus,
                  [key]: {
                    ...prev.steamenginestatus[key],
                    process: 0,
                  }
                }
              }))
          }
          setGamestatus(prev => ({
            ...prev,
            steamenginestatus: {
              ...prev.steamenginestatus,
              [key]: {
                ...prev.steamenginestatus[key],
                process: Math.min(3, prev.steamenginestatus[key].process + 0.1)
              }
            }
          }))
        }
      })


      // ===== Consome carvão =====
      if (spentcoal > 0) {
        setGamestatus(prev => ({
          ...prev,
          inventory: {
            ...prev.inventory,
            Coal: Math.max(0, prev.inventory.Coal - spentcoal)
          }
        }))
      }
      if (spentwater > 0) {
        setGamestatus(prev => ({
          ...prev,
          inventory: {
            ...prev.inventory,
            Water: Math.max(0, prev.inventory.Water - spentwater)
          }
        }))
      }
      // ===== Atualiza energia =====
      const energychange = energygain - energyspent
      setGamestatus(prev => ({
        ...prev,
        energystatus: {
          energy: Math.min(prev.energystatus.capacity, prev.energystatus.energy + energychange),
          capacity: prev.inventory["Basic Battery"] * 100,
          gain: energygain,
          spent: energyspent,
        }
      }))
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const minterval = setInterval(() => {
      const gs = gamestatusref.current
      const rsf = gs.raidStatus
      const baseHp = 100;
      const hpPerWall = 10;
      const MAX_BASE_HP_LIMIT = 10000;
      const maxbasehpcalc = Math.min(
        MAX_BASE_HP_LIMIT,
        baseHp + (gs.inventory.Wall * hpPerWall)
      );

      setGamestatus(prev => ({
        ...prev,
        basestatus: { ...prev.basestatus, maxbasehp: maxbasehpcalc },
        raidStatus: { ...prev.raidStatus, timepassed: prev.raidStatus.timepassed + 1 }
      }))

      // ===== Começa uma raid nova =====
      if (rsf.timepassed >= rsf.timeuntilraid) {
        const w = gamestatusref.current.raidStatus.raidwave;
        const monsterCount = Math.ceil(1.2 * Math.pow(1.7, w));

        setGamestatus(prev => ({
          ...prev,
          raidStatus: {
            ...prev.raidStatus,
            monstersalive: monsterCount,
            totalmonsters: monsterCount,
            waving: true,
            timepassed: 0,
            timeuntilraid: 300,
          }
        }))
      }
      else if (rsf.waving) {
        let dps = 0;

        if (rsf.monstersalive <= 0) {
          setGamestatus(prev => ({
            ...prev,

            raidStatus: {
              ...prev.raidStatus,
              waving: false,
              raidwave: prev.raidStatus.raidwave + 1,
              monstersalive: prev.raidStatus.totalmonsters,
            }
          }))
        }
        if (gs.basestatus.basehp <= 0) {
          setgameover(true)
          setTimeout(() => {
            setGamestatus(initial_state)
            setLastMine(null)
            setStartTime(null)
            setOpenCoalGenerator(null)
            setOpenFurnace(null)
            setMiningBar(null)
            setgameover(false)
          }, 5000);
        }
        // Base viva: armas atiram
        else {
          Object.entries(Guns).forEach(([key, value]) => {
            if (gs.inventory[key] > 0 && gs.inventory[value.ammo] >= gs.inventory[key]) {
              dps += gs.inventory[key] * value.damage

              setGamestatus(prev => ({
                ...prev,
                inventory: {
                  ...prev.inventory,
                  [value.ammo]: prev.inventory[value.ammo] - prev.inventory[key]
                },

              }))
            }
          })

          setGamestatus(prev => ({
            ...prev,
            raidStatus: {
              ...prev.raidStatus,
              monstersalive: prev.raidStatus.monstersalive - (dps / 100)
            },
            basestatus: {
              ...prev.basestatus,
              basehp: prev.basestatus.basehp - ((rsf.monstersalive * prev.raidStatus.raidwave) * 2.5)
            },
          }))
        }
      }
    }, 1000);
    return () => clearInterval(minterval)
  }, [])
  const inventory = gamestatus.inventory
  const raidStatus = gamestatus.raidStatus
  const energystatus = gamestatus.energystatus
  const drillstatus = gamestatus.drillstatus
  const furnacesStatus = gamestatus.furnacesStatus
  const coalGeneratorStatus = gamestatus.coalGeneratorStatus

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
          <div className="mt-5 bg-[#c25710] cursor-pointer flex justify-center items-center gap-1 h-10 w-40 rounded-xl drop-shadow-2xl botaogenerico" onClick={() => setActiveGui(prev => prev === "Drill" ? null : "Drill")}
          >
            <Drill></Drill>
            <span className="text-2xl">Drill</span>
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
              <span className="font-bold">{inventory[value.Ore]}</span>
            </div>
          ))}
        </div>}

        {activeGui === "Inventory" && <div className="relative z-20 w-300 h-150 p-6 bg-slate-900/80 border overflow-auto border-slate-700/50 rounded-xl ml-10 grid auto-rows-auto gap-6 grid-cols-6  justify-start flex-row items-start shadow-inner">
          {Object.entries(inventory).map(([key, value]) => {
            if (value === 0) return null;
            if (!Images[key]) return null;
            if ((MaxStack[key] == null)) {
              return (
                <div key={key} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60 rounded-2xl gap-2 p-3 ">
                  <span className="text-auto font-bold">{key}</span>
                  <Image src={Images[key]} alt={key} width={50} height={50}></Image>
                  <span className="text-bold text-2xl">{value}</span>

                </div>
              )
            } else if (key === "Furnace") {
              {
                return Object.entries(gamestatus.furnacesStatus).map(([furnaceid, furnace]) => (
                  <div key={furnaceid} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60  rounded-2xl gap-2 p-3 ">
                    <span className="text-auto font-bold">Furnace</span>
                    <Image src={Images.Furnace} alt="Furnace" width={50} height={50}></Image>
                    {furnace.Input !== null && <Image src={Images[furnace.Input]} alt="FurnaceInput" width={20} height={20} className="mt-15 absolute"></Image>}

                    <button className="px-6 bg-green-500 rounded-2xl font-bold botaogenerico" onClick={() => {
                      setOpenFurnace(furnaceid)
                    }}>Use</button>
                    <Trash className="bg-red-500 rounded botaogenerico"
                      onClick={() => {
                        setOpenFurnace(null)

                        setGamestatus(prev => {
                          const copia = { ...prev.furnacesStatus }
                          delete copia[furnaceid]
                          return {
                            ...prev,
                            furnacesStatus: copia,
                            inventory: {
                              ...prev.inventory,
                              Furnace: prev.inventory.Furnace - 1
                            },
                          }
                        })
                      }
                      }
                    ></Trash>

                  </div>
                ))
              }

            } else if (key === "Coal Generator") {
              return Object.entries(gamestatus.coalGeneratorStatus).map(([generatorid, generator]) => (
                <div key={generatorid} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60  rounded-2xl gap-2 p-3">
                  <span className="text-auto font-bold">Coal Generator</span>
                  <Image src={Images["Coal Generator"]} alt="Coal Generator" width={50} height={50}></Image>
                  <button className="px-6 bg-green-500 rounded-2xl font-bold botaogenerico" onClick={() => {
                    setOpenCoalGenerator(generatorid)
                  }}>Use</button>
                  <Trash className="bg-red-500 rounded botaogenerico"
                    onClick={() => {
                      setGamestatus(prev => {
                        const copia = { ...prev.coalGeneratorStatus }
                        delete copia[generatorid]
                        return {
                          ...prev,
                          coalGeneratorStatus: copia,
                          inventory: {
                            ...prev.inventory,
                            "Coal Generator": prev.inventory["Coal Generator"] - 1
                          }
                        }
                      })
                    }}
                  ></Trash>

                </div>
              ))
            } else if (key === "Water Pump") {
              return Object.entries(gamestatus.waterpumpstatus).map(([waterpump, value]) => (
                <div key={waterpump} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60  rounded-2xl gap-2 p-3">
                  <span className="text-auto font-bold">Water Pump</span>
                  <Image src={Images["Water Pump"]} alt="Water Pump" width={40} height={30}></Image>
                  <button className="px-6 bg-green-500 rounded-2xl font-bold botaogenerico" onClick={() => {
                    setopenwaterpump(waterpump)
                  }}>Use</button>
                  <Trash className="bg-red-500 rounded botaogenerico"
                    onClick={() => {
                      setGamestatus(prev => {
                        const copia = { ...prev.waterpumpstatus }
                        delete copia[waterpump]
                        return {
                          ...prev,
                          waterpumpstatus: copia,
                          inventory: {
                            ...prev.inventory,
                            "Water Pump": prev.inventory["Water Pump"] - 1
                          }
                        }
                      })
                    }}
                  ></Trash>

                </div>
              ))
            } else if (key === "Steam Engine") {
              return Object.entries(gamestatus.steamenginestatus).map(([steamengine, value]) => (
                <div key={steamengine} className="w-40 h-40 flex justify-start flex-col items-center bg-zinc-300/60  rounded-2xl gap-2 p-3">
                  <span className="text-auto font-bold">Steam Engine</span>
                  <Image src={Images["Steam Engine"]} alt="Steam Engine" width={50} height={50}></Image>
                  <button className="px-6 bg-green-500 rounded-2xl font-bold botaogenerico" onClick={() => {
                    setopensteamengine(steamengine)
                  }}>Use</button>
                  <Trash className="bg-red-500 rounded botaogenerico"
                    onClick={() => {
                      setGamestatus(prev => {
                        const copia = { ...prev.steamenginestatus }
                        delete copia[steamengine]
                        return {
                          ...prev,
                          steamenginestatus: copia,
                          inventory: {
                            ...prev.inventory,
                            "Steam Engine": prev.inventory["Steam Engine"] - 1
                          }
                        }
                      })
                    }}
                  ></Trash>

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
                    setGamestatus(prev => ({
                      ...prev,
                      inventory: { ...prev.inventory, Coal: prev.inventory.Coal - 1 },
                      coalGeneratorStatus: {
                        ...prev.coalGeneratorStatus,
                        [openCoalGenerator]: {
                          ...prev.coalGeneratorStatus[openCoalGenerator],
                          Burning: true
                        }
                      }
                    }))
                  }
                } else {
                  setGamestatus(prev => ({
                    ...prev,
                    coalGeneratorStatus: {
                      ...prev.coalGeneratorStatus,
                      [openCoalGenerator]: {
                        ...prev.coalGeneratorStatus[openCoalGenerator],
                        Burning: false,
                      }
                    }
                  }))
                }

              }}
            >Generate</button>
            <div className="rounded h-20 w-20 bg-zinc-800/60 flex flex-col justify-center items-center">
              <Image src={Images.Coal} width={70} height={70} alt="Coal Image"></Image></div>
            <span className="font-bold text-2xl">{inventory.Coal}</span>
            <span className="text-[15px]">Generate 30 Energy per coal</span>
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
                if (value.meltable === false || inventory[value.Ore] <= 0) return null;
                return (

                  <div key={key} className="h-15 w-15 rounded p-3 botaogenerico flex justify-center items-center flex-col bg-zinc-300/60"
                    onClick={() => {
                      if (furnacesStatus[openFurnace].OutputQuantity > 0 && furnacesStatus[openFurnace].Output !== MeltingResults[value.Ore]) return;
                      if (furnacesStatus[openFurnace].Input !== value.Ore) {
                        const oldinputore = furnacesStatus[openFurnace].Input
                        if (gamestatus.inventory[value.Ore] >= 50) {
                          setGamestatus(prev => ({
                            ...prev,
                            inventory: {
                              ...prev.inventory,
                              [oldinputore]: prev.inventory[oldinputore] + prev.furnacesStatus[openFurnace].Quantity,
                              [value.Ore]: prev.inventory[value.Ore] - 50,
                            },
                            furnacesStatus: {
                              ...prev.furnacesStatus,
                              [openFurnace]: {
                                ...prev.furnacesStatus[openFurnace],
                                TimeToMelt: value.melttime,
                                Input: value.Ore,
                                Quantity: prev.furnacesStatus[openFurnace].Quantity + 50,
                                Output: MeltingResults[value.Ore]
                              }
                            }
                          }))
                        } else {
                          setGamestatus(prev => ({
                            ...prev,
                            inventory: {
                              ...prev.inventory,
                              [oldinputore]: prev.inventory[oldinputore] + prev.furnacesStatus[openFurnace].Quantity,
                              [value.Ore]: 0,
                            },
                            furnacesStatus: {
                              ...prev.furnacesStatus,
                              [openFurnace]: {
                                ...prev.furnacesStatus[openFurnace],
                                TimeToMelt: value.melttime,
                                Input: value.Ore,
                                Quantity: prev.furnacesStatus[openFurnace].Quantity + prev.inventory[value.Ore],
                                Output: MeltingResults[value.Ore]
                              }
                            }
                          }))
                        }

                      } else {
                        if (gamestatus.inventory[value.Ore] >= 50) {
                          setGamestatus(prev => ({
                            ...prev,
                            inventory: { ...prev.inventory, [value.Ore]: prev.inventory[value.Ore] - 50 },
                            furnacesStatus: {
                              ...prev.furnacesStatus,
                              [openFurnace]: {
                                ...prev.furnacesStatus[openFurnace],
                                TimeToMelt: value.melttime,
                                Input: value.Ore,
                                Quantity: prev.furnacesStatus[openFurnace].Quantity + 50,
                                Output: MeltingResults[value.Ore]
                              }
                            }
                          }))
                        } else {
                          setGamestatus(prev => ({
                            ...prev,
                            inventory: { ...prev.inventory, [value.Ore]: 0 },
                            furnacesStatus: {
                              ...prev.furnacesStatus,
                              [openFurnace]: {
                                ...prev.furnacesStatus[openFurnace],
                                TimeToMelt: value.melttime,
                                Input: value.Ore,
                                Quantity: prev.furnacesStatus[openFurnace].Quantity + prev.inventory[value.Ore],
                                Output: MeltingResults[value.Ore]
                              }
                            }
                          }))
                        }

                      }
                    }}>
                    <Image className="mt-2" src={Images[value.Ore]} height={30} width={30} alt={value.Ore}></Image>
                    <span>{inventory[value.Ore]}</span>
                  </div>
                )
              })}</div>
            <div className="h-15 w-110 rounded mt-5 flex justify-between p-2 items-center">
              <div className="rounded h-20 w-12 bg-zinc-800/60 flex botaogenerico flex-col justify-center items-center"
                onClick={() => {
                  if (gamestatus.furnacesStatus[openFurnace].Input === null) return null;
                  const oldquantity = gamestatus.furnacesStatus[openFurnace].Quantity
                  const oldInput = gamestatus.furnacesStatus[openFurnace].Input
                  const oldoutput = gamestatus.furnacesStatus[openFurnace].Output
                  const oldoutputquantity = gamestatus.furnacesStatus[openFurnace].OutputQuantity
                  if (gamestatus.furnacesStatus[openFurnace].Output === null) {
                    setGamestatus(prev => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        [oldInput]: prev.inventory[oldInput] + oldquantity,


                      },
                      furnacesStatus: {
                        ...prev.furnacesStatus,
                        [openFurnace]: {
                          Melting: false,
                          TimeToMelt: null,
                          TimeMelted: 0,
                          Input: null,
                          Quantity: 0,
                          Output: null,
                          OutputQuantity: null,

                        }
                      }
                    }))
                  } else {

                    setGamestatus(prev => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        [oldInput]: prev.inventory[oldInput] + oldquantity,
                        [oldoutput]: prev.inventory[oldoutput] + oldoutputquantity


                      },
                      furnacesStatus: {
                        ...prev.furnacesStatus,
                        [openFurnace]: {
                          Melting: false,
                          TimeToMelt: null,
                          TimeMelted: 0,
                          Input: null,
                          Quantity: 0,
                          Output: null,
                          OutputQuantity: 0,

                        }
                      }
                    }))
                  }
                }}>

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
                  setGamestatus(prev => ({
                    ...prev,
                    inventory: {
                      ...prev.inventory,
                      [prev.furnacesStatus[openFurnace].Output]: prev.inventory[prev.furnacesStatus[openFurnace].Output] + prev.furnacesStatus[openFurnace].OutputQuantity
                    },
                    furnacesStatus: {
                      ...prev.furnacesStatus,
                      [openFurnace]: {
                        ...prev.furnacesStatus[openFurnace],
                        OutputQuantity: 0,
                      }
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
          {openwaterpump !== null && <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-120 h-100 bg-zinc-500 rounded-2xl flex flex-col justify-start items-center gap-2 p-5">
            <span className="w-10 h-10 absolute font-bold text-center flex justify-center items-center botaogenerico  text-3xl top-3 right-3 bg-red-500 rounded" onClick={() => {
              setopenwaterpump(null)
            }}>X</span>
            <Image src={Images["Water Pump"]} alt="Water Pump" width={100} height={100}></Image>
            <div className="relative  w-90 h-10 bg-zinc-300/60 rounded-2xl overflow-hidden">
              <div className="h-10 bg-green-500 duration-100 ease-linear transition-[width]" style={{ width: (gamestatus.waterpumpstatus[openwaterpump].process) * 100 + "%" }}></div>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">{Math.round(gamestatus.waterpumpstatus[openwaterpump].process * 100) + "%"}</span>
            </div>
            <button className={`${gamestatus.waterpumpstatus[openwaterpump].working ? "botaogenerico w-40 h-10 text-2xl font-bold rounded-2xl bg-green-500 " : "botaogenerico font-bold text-2xl w-40 h-10 rounded-2xl bg-red-500"}`}
              onClick={() => {
                setGamestatus(prev => ({
                  ...prev,
                  waterpumpstatus: {
                    ...prev.waterpumpstatus,
                    [openwaterpump]: {
                      ...prev.waterpumpstatus[openwaterpump],
                      working: !prev.waterpumpstatus[openwaterpump].working
                    }
                  }
                }))
              }}
            >Pump</button>
            <span className="absolute bottom-1">Pumps water every second</span>
          </div>}
          {opensteamengine !== null && <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-120 h-100 bg-zinc-500 rounded-2xl flex flex-col justify-start items-center gap-2 p-5">
            <span className="w-10 h-10 absolute font-bold text-center flex justify-center items-center botaogenerico  text-3xl top-3 right-3 bg-red-500 rounded" onClick={() => {
              setopensteamengine(null)

            }}>X</span>
            <Image src={Images["Steam Engine"]} alt="Steam Engine" width={150} height={150}></Image>
            <div className="relative overflow-hidden bg-zinc-300/60 w-100 h-10 rounded-2xl">
              <span className="absolute text-2xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{Math.round(3 - gamestatus.steamenginestatus[opensteamengine].process) + "s"}</span>
              <div className="bg-green-500 h-10 rounded-2xl transition-[width] duration-100 ease-linear" style={{ width: Math.round((gamestatus.steamenginestatus[opensteamengine].process / 3) * 100) + "%" }}></div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center bg-zinc-300/60 rounded-2xl w-12 h-12">
                  <Image src={Images.Coal} width={40} height={40} alt={"Coal"}></Image></div>
                <span>{gamestatus.inventory.Coal}</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center bg-zinc-300/60 rounded-2xl w-12 h-12">
                  <Image src={Images.Water} width={56} height={56} alt={"Water"}></Image></div>
                <span>{gamestatus.inventory.Water}</span>
              </div>
            </div>
            <button className={`${gamestatus.steamenginestatus[opensteamengine].working ? "botaogenerico w-40 h-12 bg-green-500 font-bold text-2xl rounded-2xl" : "botaogenerico w-40 h-12 rounded-2xl bg-red-500 font-bold text-2xl"}`}
              onClick={() => {
                if (gamestatus.inventory.Coal < 1 || gamestatus.inventory.Water < 3) return
                const status = gamestatus.steamenginestatus[opensteamengine].working
                let coaladd = 0
                let wateradd = 0
                if (status === false) {
                  coaladd = 1
                  wateradd = 3
                }
                setGamestatus(prev => ({
                  ...prev,
                  inventory: {
                    ...prev.inventory,
                    Coal: prev.inventory.Coal - coaladd,
                    Water: prev.inventory.Water - wateradd,
                  },
                  steamenginestatus: {
                    ...prev.steamenginestatus,
                    [opensteamengine]: {
                      ...prev.steamenginestatus[opensteamengine],
                      working: !prev.steamenginestatus[opensteamengine].working
                    }
                  }
                }))
              }}
            >Generate</button>
            <span>Generates 150 energy per coal</span>
          </div>}
        </div>}

        {activeGui === "Craft" && <div className="z-20 w-300 h-150 p-6 bg-slate-900/80 overflow-y-auto overflow-x-hidden gap-6 border overflow-auto border-slate-700/50 rounded-xl ml-10 grid auto-rows-min grid-cols-5 justify-start items-start shadow-inner">
          {Object.entries(Craftables).map(([key, value]) => {
            const inv = gamestatus.inventory

            return (
              <div className="w-50 h-90 justify-between items-center flex flex-col  p-3 rounded-2xl m-5 gap-1" style={{ backgroundColor: value.color }} key={key}>
                <div className="flex justify-center items-center flex-col">

                  <Image src={Images[value.item]} alt={value.item} height={70} width={70}></Image>
                  <span className="font-bold text-2xl">{value.item}</span>
                  {value.cost.map((c, i) => {
                    return <div key={i} className="flex flex-row justify-center items-center gap-1">
                      <Image src={Images[c.resource]} alt={c.resource} height={30} width={30}></Image>
                      <span className={` ${inv[c.resource] >= c.amount ? "text-white" : "text-red-500"}`}
                      >{c.amount + " " + c.resource + " (" + inv[c.resource] + ")"}</span>
                    </div>
                  })}
                </div>
                <div className="flex-col justify-center items-center flex">
                  <span className="font-bold ">{Craftables[key].description ?? ""}</span>
                  <button className=" bg-green-500 rounded-2xl botaogenerico font-bold text-2xl px-6"
                    onClick={() => {
                      const canCraft = value.cost.every((cx) => inv[cx.resource] >= cx.amount)

                      if (canCraft) {
                        setGamestatus(prev => ({
                          ...prev,
                          inventory: {
                            ...prev.inventory,
                            [value.item]: (prev.inventory[value.item] ?? 0) + 1
                          }
                        }))
                        value.cost.map((c, i) => (
                          setGamestatus(prev => ({
                            ...prev,
                            inventory: {
                              ...prev.inventory,
                              [c.resource]: prev.inventory[c.resource] - c.amount,
                            }
                          }))
                        ))


                        if (key.includes("Drill")) {
                          const mine = key.split(" ")[0]
                          const drillid = mine + " " + Date.now() + Math.random()
                          setGamestatus(prev => ({
                            ...prev,
                            drillstatus: {
                              ...prev.drillstatus,
                              [drillid]: {
                                Mining: false,
                                timetomine: OreCards[key.split(" ")[0]].timeToMine,
                                timemined: 0,
                                Ore: OreCards[key.split(" ")[0]].Ore,
                              }
                            }
                          }))
                        }
                        if (key === "Furnace") {
                          const furnaceId = "Furnace" + Date.now() + Math.random()
                          setGamestatus(prev => ({
                            ...prev,
                            furnacesStatus: {
                              ...prev.furnacesStatus,
                              [furnaceId]: {
                                Melting: true,
                                TimeToMelt: null,
                                TimeMelted: 0,
                                Input: null,
                                Quantity: 0,
                                Output: null,
                                OutputQuantity: 0,
                              }
                            }
                          }))
                        }
                        if (key === "Coal Generator") {
                          const coalgeneratorid = "Coal Generator" + Date.now() + Math.random()
                          setGamestatus(prev => ({
                            ...prev,
                            coalGeneratorStatus: {
                              ...prev.coalGeneratorStatus,
                              [coalgeneratorid]: {
                                Burning: false,
                                TimeBurned: 0,
                              }
                            }
                          }))

                        }
                        if (key === "Water Pump") {
                          const waterpumpid = "Water Pump" + Date.now() + Math.random()
                          setGamestatus(prev => ({
                            ...prev,
                            waterpumpstatus: {
                              ...prev.waterpumpstatus,
                              [waterpumpid]: {
                                process: 0,
                                working: false,
                              }
                            }
                          }))
                        }
                        if (key === "Steam Engine") {
                          const steamengineid = "Steam Engine" + Date.now() + Math.random()
                          setGamestatus(prev => ({
                            ...prev,

                            steamenginestatus: {
                              ...prev.steamenginestatus,
                              [steamengineid]: {
                                process: 0,
                                working: false,

                              }
                            }
                          }))
                        }



                      }
                    }}>Craft</button>

                </div>
              </div>
            )
          })}
        </div>}

        {activeGui === "Drill" && (
          <div className="z-20 w-300 h-150 p-6 bg-slate-900/80 overflow-y-auto overflow-x-hidden gap-6 border overflow-auto border-slate-700/50 rounded-xl ml-10 grid auto-rows-min grid-cols-5 justify-start items-start shadow-inner">
            {Object.entries(gamestatus.drillstatus).map(([key, value]) => {
              const orename = key.split(" ")[0];
              const drillname = orename + " Drill"
              const drillid = key; // ou o valor correto para o id
              const drillstatus = value
              return (
                <div
                  key={drillid}
                  className="w-50 h-90 rounded-2xl flex justify-start p-5 gap-3 flex-col items-center"
                  style={{ backgroundColor: Craftables[drillname].color }}
                >
                  <span className="text-2xl font-bold">{drillname}</span>
                  <Image width={150} height={150} src={Images[drillname]} alt="Drill Image" />
                  <button
                    className={`${drillstatus.Mining
                      ? "text-2xl font-bold text-auto rounded-xl w-30 botaogenerico bg-green-500"
                      : "text-2xl font-bold text-auto rounded-xl w-30 botaogenerico bg-red-500"
                      }`}
                    onClick={() => {
                      setGamestatus(prev => ({
                        ...prev,
                        drillstatus: {
                          ...prev.drillstatus,
                          [drillid]: {
                            ...prev.drillstatus[drillid],
                            Mining: !prev.drillstatus[drillid].Mining,
                          },
                        },
                      }));
                    }}
                  >
                    Mine
                  </button>
                  <span>{"Spent " + DrillEnergyNeeded[orename] + "e per second"}</span>
                  <div className="w-40 overflow-hidden h-7 relative flex justify-start items-center bg-zinc-300/60 rounded-2xl">
                    <span className="absolute left-1/2 font-bold -translate-x-1/2">
                      {Math.round(drillstatus.timetomine - drillstatus.timemined) + "s"}
                    </span>
                    <div
                      className="h-7 bg-green-500 transition-[width] ease-linear duration-100 rounded-xl"
                      style={{ width: (drillstatus.timemined / drillstatus.timetomine) * 100 + "%" }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="absolute top-1 left-1/2 -translate-x-1/2">

          {!gamestatus.raidStatus.waving &&
            <div className="flex-col flex text-center">
              <span className="text-2xl font-bold">Wave level: {raidStatus.raidwave}</span>
              <span className=" text-2xl font-bold  ">Next wave: <TimeFormatter seconds={raidStatus.timeuntilraid - raidStatus.timepassed} /></span>
              <div className="flex justify-start items-center rounded relative bg-zinc-300/60">
                <div className=" h-10 bg-green-500 rounded transition-[width] duration-100 ease-linear" style={{ width: (gamestatus.basestatus.basehp / gamestatus.basestatus.maxbasehp) * 100 + "%" }}></div>
                <span className="absolute font-bold text-2xl left-1/2 -translate-x-1/2">{Math.round(gamestatus.basestatus.basehp) + "/" + Math.round(gamestatus.basestatus.maxbasehp) + "HP"}</span>
              </div>
            </div>
          }
          {gamestatus.raidStatus.waving &&
            <div className=" flex-col justify-center items-center">
              <span className=" text-2xl font-bold  ">MONSTERS ARE RAIDING!</span>
              <div className="flex justify-start items-center rounded relative bg-zinc-300/60">
                <span className="absolute font-bold text-2xl left-1/2 -translate-x-1/2">{Math.round(gamestatus.basestatus.basehp) + "/" + Math.round(gamestatus.basestatus.maxbasehp) + "HP"}</span>
                <div className=" h-10 bg-green-500 rounded transition-[width] duration-100 ease-linear" style={{ width: (gamestatus.basestatus.basehp / gamestatus.basestatus.maxbasehp) * 100 + "%" }}></div>
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
        {gamestatus.energystatus.capacity > 0 && (
          <span className="absolute right-2 w-60 text-center bottom-10 font-bold z-20">
            {"+" + gamestatus.energystatus.gain.toFixed(2) + "/" + "-" + gamestatus.energystatus.spent.toFixed(2)}
          </span>
        )}

        {gamestatus.energystatus.capacity > 0 && (
          <div className="absolute bg-zinc-300/80 bottom-2 flex justify-start overflow-hidden items-center right-2 w-60 h-9 z-20 rounded-xl">
            <div
              className="bg-amber-300 h-9 rounded-xl transition-[width] duration-100 ease-linear"
              style={{ width: (energystatus.energy / energystatus.capacity) * 100 + "%" }}
            >
              <span className="text-zinc-900/50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold">
                {Math.round(energystatus.energy) + "e/" + Math.round(energystatus.capacity) + "e"}
              </span>
            </div>
          </div>
        )}
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
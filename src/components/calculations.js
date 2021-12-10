
//Calculations
function CalculateStats(Ownership,Main,SubOne,SubTwo){
    let stats ={
      hp:0,
      patk:0,
      pdef:0,
      matk:0,
      mdef:0,
    }
    if (Main === SubOne || Main === SubTwo || SubOne === SubTwo){
      return stats
    }
    else{
      const MainUnit = Ownership.find(Ownership => Ownership.uid === Main)
      const SubUnitOne = Ownership.find(Ownership => Ownership.uid === SubOne)
      const SubUnitTwo = Ownership.find(Ownership => Ownership.uid === SubTwo)
      const FirstHalf = (MainUnit.class === SubUnitOne.class ? 0.4 : 0.3)
      const SecondHalf = (MainUnit.class === SubUnitTwo.class ? 0.4 : 0.3)
      stats ={
          Main:MainUnit,
          SubOne:SubUnitOne,
          SubTwo:SubUnitTwo,
          hp: MainUnit.hp + FirstHalf*SubUnitOne.hp+SecondHalf*SubUnitTwo.hp,
          patk: MainUnit.patk + FirstHalf*SubUnitOne.patk+SecondHalf*SubUnitTwo.patk,
          pdef: MainUnit.pdef + FirstHalf*SubUnitOne.pdef+SecondHalf*SubUnitTwo.pdef,
          matk: MainUnit.matk + FirstHalf*SubUnitOne.matk+SecondHalf*SubUnitTwo.matk,
          mdef: MainUnit.mdef + FirstHalf*SubUnitOne.mdef+SecondHalf*SubUnitTwo.mdef,
      }
    }
    return stats
  }
  
function CalculateDamage(Ownership,Main,SubOne,SubTwo){
    const stats= CalculateStats(Ownership,Main,SubOne,SubTwo)
    let collection = {
      stats:stats,
      PhyD:0,
      PhyED:0,
      MagD:0,
      R:0
    }
    const ElementTable ={
      "Water":"water_boost",
      "Fire":"fire_boost",
      "Wind":"wind_boost",
      "Earth":"earth_boost",
      "Lightning":"lightning_boost",
      "Dark":"dark_boost",
      "Light":"light_boost",
      "None":"water_boost",
    }
    if(Main === SubOne|| Main === SubTwo|| SubOne === SubTwo){
      return collection
    }
    const MainUnit= stats.Main
    const SubUnitOne= stats.SubOne
    const SubUnitTwo= stats.SubTwo
    const PhyD = stats.patk * (1+ MainUnit.phy_boost + SubUnitOne.phy_boost + SubUnitTwo.phy_boost) * 3.6
    const MagD = stats.matk * (1+ MainUnit.mag_boost + SubUnitOne.mag_boost + SubUnitTwo.mag_boost) * 3.6
    const Rec = (stats.matk * 0.8 + 120)*(1+  MainUnit.rec_boost + SubUnitOne.rec_boost + SubUnitTwo.rec_boost)
    let PhyEd = PhyD
    let MagEd = MagD
    if (MainUnit.element === "None"){
      collection = {
        stats:stats,
        PhyD:PhyD,
        PhyEd:PhyD,
        MagD:MagD,
        R:Rec
      }
      return collection
    }
    else{
      PhyEd = stats.patk * (1 + MainUnit.phy_boost + SubUnitOne.phy_boost + SubUnitTwo.phy_boost + MainUnit[ElementTable[MainUnit.element]]+SubUnitOne[ElementTable[MainUnit.element]]+SubUnitTwo[ElementTable[MainUnit.element]]) * 3.6
      MagEd = stats.matk * (1 + MainUnit.mag_boost + SubUnitOne.mag_boost + SubUnitTwo.mag_boost + MainUnit[ElementTable[MainUnit.element]]+SubUnitOne[ElementTable[MainUnit.element]]+SubUnitTwo[ElementTable[MainUnit.element]]) * 3.6
    }
    collection = {
      stats:stats,
      PhyD:PhyD,
      PhyEd:PhyEd,
      MagD:MagEd,
      R:Rec
    }
    return collection
}

function Optimize(props,ChosenUid){
    const newprops = props
    let iterated = []
    let FinalArray = []
    for (let i = 0; i < newprops.length; i++) {
        iterated.push(i)
        for (let j = 0; j < newprops.length; j++) {
            if (iterated.includes(j)){
            }
            else{
                const ThingsToPush = CalculateDamage(newprops,ChosenUid,newprops[i].uid,newprops[j].uid)
                FinalArray.push(ThingsToPush)
            }
        }
    }
    const newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    const PhyMaxV = Math.max.apply(Math,newFinalArray.map(o => o.PhyD))
    const PhyMax = newFinalArray.find(x=>x.PhyD===PhyMaxV)
    const EPhyMaxV = Math.max.apply(Math,newFinalArray.map(o => o.PhyEd))
    const EPhyMax = newFinalArray.find(x=>x.PhyEd===EPhyMaxV)
    const MagMaxV = Math.max.apply(Math,newFinalArray.map(o => o.MagD))
    const MagMax = newFinalArray.find(x=>x.MagD===MagMaxV)
    const RecMaxV = Math.max.apply(Math,newFinalArray.map(o => o.R))
    const RecMax = newFinalArray.find(x=>x.R===RecMaxV)
    const container = {
        PhyMax:PhyMax,
        EPhyMax:EPhyMax,
        MagMax:MagMax,
        RecMax:RecMax
    }
    console.log(container)
    return container
}

export default Optimize
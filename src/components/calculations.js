
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
  
function CalculateDamage(Ownership,Main,SubOne,SubTwo,MeguminSuper,OpUlt){
    const stats= CalculateStats(Ownership,Main,SubOne,SubTwo)
    let collection = {
      stats:stats,
      PhyD:0,
      PhyED:0,
      MagD:0,
      R:0
    }
    const UnitTable ={
      Kazuma:100,
      Aqua:101,
      Megumin:102,
      Darkness:103,
      Chris:104,
      Wiz:105,
      Yunyun:106,
      Iris:107,
      Komekko:108,
      Cecily:109,
      Arue:110,
      Mitsurugi:111,
      Dust:112,
      Rin:113,
      Lia:114,
      Cielo:115,
      Erika:116,
      Melissa:117,
      Mia:118,
      Amy:119,
      Vanir:128,
      Meru:151
    }
    const SuperVOne ={
      Kazuma:"None",
      Aqua:"Light",
      Megumin:"Fire",
      Darkness:"None",
      Chris:"None",
      Wiz:"Water",
      Yunyun:"Light",
      Iris:"Light",
      Komekko:"None",
      Cecily:"None",
      Arue:"Dark",
      Mitsurugi:"None",
      Dust:"None",
      Rin:"Wind",
      Lia:"None",
      Cielo:"None",
      Erika:"None",
      Melissa:"None",
      Mia:"Earth",
      Amy:"None",
      Vanir:"Earth",
      Meru:"Lightning"
    }
    const SuperVTwo ={
      Kazuma:"None",
      Aqua:"Water",
      Megumin:"Fire",
      Darkness:"None",
      Chris:"Wind",
      Wiz:"Earth",
      Yunyun:"Lightning",
      Iris:"None",
      Komekko:"Fire",
      Cecily:"Water",
      Arue:"Light",
      Mitsurugi:"Lightning",
      Dust:"Wind",
      Rin:"Dark",
      Lia:"Water",
      Cielo:"Wind",
      Erika:"Fire",
      Melissa:"Dark",
      Mia:"None",
      Amy:"Earth",
      Vanir:"None",
      Meru:"None"
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
    let UnitElement = MainUnit.element
    if (UnitTable["Megumin"] === Math.floor(MainUnit.uid/10000) && MeguminSuper){
      UnitElement ="Fire"
    }
    if (OpUlt.available){
      if(OpUlt.version === 2){
        if(Math.floor(MainUnit.uid/10000) === UnitTable[MainUnit.class]){
          UnitElement = SuperVTwo[MainUnit.class]
          if (UnitElement === "None"){
            UnitElement = MainUnit.element
          }
        }
        else{
          UnitElement = MainUnit.element
        }
      }
      else{
        if(Math.floor(MainUnit.uid/10000) === UnitTable[MainUnit.class]){
          UnitElement = SuperVOne[MainUnit.class]
          if (UnitElement === "None"){
            UnitElement = MainUnit.element
          }
        }
        else{
          UnitElement = MainUnit.element
        }
      }
    }
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
      PhyEd = stats.patk * (1 + MainUnit.phy_boost + SubUnitOne.phy_boost + SubUnitTwo.phy_boost + MainUnit[ElementTable[UnitElement]]+SubUnitOne[ElementTable[UnitElement]]+SubUnitTwo[ElementTable[UnitElement]]) * 3.6
      MagEd = stats.matk * (1 + MainUnit.mag_boost + SubUnitOne.mag_boost + SubUnitTwo.mag_boost + MainUnit[ElementTable[UnitElement]]+SubUnitOne[ElementTable[UnitElement]]+SubUnitTwo[ElementTable[UnitElement]]) * 3.6
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

function Optimize(props,ChosenUid,MeguminSuper,OpUlt){
    const newprops = props
    let iterated = []
    let FinalArray = []
    for (let i = 0; i < newprops.length; i++) {
        iterated.push(i)
        for (let j = 0; j < newprops.length; j++) {
            if (iterated.includes(j)){
            }
            else{
                const ThingsToPush = CalculateDamage(newprops,ChosenUid,newprops[i].uid,newprops[j].uid,MeguminSuper,OpUlt)
                FinalArray.push(ThingsToPush)
            }
        }
    }
    let newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    let PhyMax = []
    let EPhyMax = []
    let MagMax =[]
    let RecMax = []
    while (PhyMax.length <5) {
      const PhyMaxV = Math.max.apply(Math,newFinalArray.map(o => o.PhyD))
      PhyMax.push(newFinalArray.find(x=>x.PhyD===PhyMaxV))
      newFinalArray.splice(newFinalArray.indexOf(newFinalArray.find(x=>x.PhyD===PhyMaxV)),1)
    }
    newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    while (EPhyMax.length <5) {
      const EPhyMaxV = Math.max.apply(Math,newFinalArray.map(o => o.PhyEd))
      EPhyMax.push(newFinalArray.find(x=>x.PhyEd===EPhyMaxV))
      newFinalArray.splice(newFinalArray.indexOf(newFinalArray.find(x=>x.PhyEd===EPhyMaxV)),1)
    }
    newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    while (MagMax.length <5) {
      const MagMaxV = Math.max.apply(Math,newFinalArray.map(o => o.MagD))
      MagMax.push(newFinalArray.find(x=>x.MagD===MagMaxV))
      newFinalArray.splice(newFinalArray.indexOf(newFinalArray.find(x=>x.MagD===MagMaxV)),1)
    }
    newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    while (RecMax.length <5) {
      const RecMaxV = Math.max.apply(Math,newFinalArray.map(o => o.R))
      RecMax.push(newFinalArray.find(x=>x.R===RecMaxV))
      newFinalArray.splice(newFinalArray.indexOf(newFinalArray.find(x=>x.R===RecMaxV)),1)
    }
    const container = {
        PhyMax:PhyMax,
        EPhyMax:EPhyMax,
        MagMax:MagMax,
        RecMax:RecMax
    }
    console.log(container)
    return container
}

export {CalculateDamage}
export default Optimize

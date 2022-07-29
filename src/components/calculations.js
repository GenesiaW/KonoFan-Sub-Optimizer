
//Calculations
const class_map = {
  100:"Kazuma",
  101:"Aqua",
  102:"Megumin",
  103:"Darkness",
  104:"Chris",
  105:"Wiz",
  106:"Yunyun",
  107:"Iris",
  108:"Komekko",
  109:"Cecily",
  110:"Arue",
  111:"Mitsurugi",
  112:"Dust",
  113:"Rin",
  114:"Lia",
  115:"Cielo",
  116:"Erika",
  117:"Melissa",
  118:"Mia",
  119:"Amy",
  128:"Vanir",
  151:"Meru",
  147:"Emilia",
  150:"Rem",
  158:"Bell",
  160:"Aiz",
  163:"Ainz",
  164:"Albedo",
  165:"Shalltear",
  169:"Lolisa",
  183:"Misaka",
  184:"Kuroko",
  185:"Accelerator",
  186:"Misaka2",
  192:"Naofumi",
  193:"Raphtalia",
  194:"Filo",
}

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
      const FirstHalf = (MainUnit.bonus.includes(Math.floor(SubUnitOne.uid/10000)) ? 0.4 : 0.3)
      const SecondHalf = (MainUnit.bonus.includes(Math.floor(SubUnitTwo.uid/10000)) ? 0.4 : 0.3)
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
      R:0,
      traits:0,
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
        if(Math.floor(MainUnit.uid/10000) === UnitTable[class_map[Math.floor(MainUnit.uid/10000)]]){
          UnitElement = SuperVTwo[class_map[Math.floor(MainUnit.uid/10000)]]
          if (UnitElement === "None"){
            UnitElement = MainUnit.element
          }
        }
        else{
          UnitElement = MainUnit.element
        }
      }
      else{
        if(Math.floor(MainUnit.uid/10000) === UnitTable[class_map[Math.floor(MainUnit.uid/10000)]]){
          UnitElement = SuperVOne[class_map[Math.floor(MainUnit.uid/10000)]]
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
    let traits = [Math.round((1+ MainUnit.phy_boost + SubUnitOne.phy_boost + SubUnitTwo.phy_boost)*100)/100]
    let PhyEd = PhyD
    let MagEd = MagD
    if (MainUnit.element === "None"){
      traits.push(Math.round((1+ MainUnit.phy_boost + SubUnitOne.phy_boost + SubUnitTwo.phy_boost)*100)/100)
      traits.push(Math.round((1+ MainUnit.mag_boost + SubUnitOne.mag_boost + SubUnitTwo.mag_boost)*100)/100)
      traits.push(Math.round((1+  MainUnit.rec_boost + SubUnitOne.rec_boost + SubUnitTwo.rec_boost)*100)/100)
      collection = {
        stats:stats,
        PhyD:PhyD,
        PhyEd:PhyD,
        MagD:MagD,
        R:Rec,
        traits:traits,
      }
      return collection
    }
    else{
      PhyEd = stats.patk * (1 + MainUnit.phy_boost + SubUnitOne.phy_boost + SubUnitTwo.phy_boost + MainUnit[ElementTable[UnitElement]]+SubUnitOne[ElementTable[UnitElement]]+SubUnitTwo[ElementTable[UnitElement]]) * 3.6
      traits.push(Math.round((1 + MainUnit.phy_boost + SubUnitOne.phy_boost + SubUnitTwo.phy_boost + MainUnit[ElementTable[UnitElement]]+SubUnitOne[ElementTable[UnitElement]]+SubUnitTwo[ElementTable[UnitElement]])*100)/100)
      MagEd = stats.matk * (1 + MainUnit.mag_boost + SubUnitOne.mag_boost + SubUnitTwo.mag_boost + MainUnit[ElementTable[UnitElement]]+SubUnitOne[ElementTable[UnitElement]]+SubUnitTwo[ElementTable[UnitElement]]) * 3.6
      traits.push(Math.round((1 + MainUnit.mag_boost + SubUnitOne.mag_boost + SubUnitTwo.mag_boost + MainUnit[ElementTable[UnitElement]]+SubUnitOne[ElementTable[UnitElement]]+SubUnitTwo[ElementTable[UnitElement]])*100)/100)
      traits.push(Math.round((1 +  MainUnit.rec_boost + SubUnitOne.rec_boost + SubUnitTwo.rec_boost)*100)/100)
    }
    collection = {
      stats:stats,
      PhyD:PhyD,
      PhyEd:PhyEd,
      MagD:MagEd,
      R:Rec,
      traits:traits
    }
    return collection
}

function CheckWeapon(collection){
  let PhyMax =[]
  let PhyMaxValues = []
  let EPhyMax = []
  let EPhyMaxValues = []
  let MagMax =[]
  let MagMaxValues = []
  let RecMax =[]
  let RecMaxValues = []
  for (let i = 0; i < collection.PhyMax.length; i++) {
    PhyMax.push(collection.PhyMax[i].traits[0])
    if (PhyMax){
      if(PhyMax[i-1]<collection.PhyMax[i].traits[0]){
        let bonus_amount = Math.round((((collection.PhyMax[i-1].stats.patk*collection.PhyMax[i-1].traits[0])-(collection.PhyMax[i].stats.patk*collection.PhyMax[i].traits[0]))/(collection.PhyMax[i].traits[0]-collection.PhyMax[i-1].traits[0]))*100)/100
        PhyMaxValues.push(bonus_amount)
        PhyMax[i-1] = 'True'
        if (i === 4){
          PhyMax[i] = 'False'
        }
      }
      else{
        PhyMaxValues.push(0)
        PhyMax[i-1] = 'False'
      }
    }
    if (i === 4){
      PhyMax[i] = 'False'
    }
  }
  for (let i = 0; i < collection.EPhyMax.length; i++) {
    EPhyMax.push(collection.EPhyMax[i].traits[1])
    if (EPhyMax){
      if(EPhyMax[i-1]<collection.EPhyMax[i].traits[1]){
        let bonus_amount = Math.round((((collection.EPhyMax[i-1].stats.patk*collection.EPhyMax[i-1].traits[1])-(collection.EPhyMax[i].stats.patk*collection.EPhyMax[i].traits[1]))/(collection.EPhyMax[i].traits[1]-collection.EPhyMax[i-1].traits[1]))*100)/100
        EPhyMaxValues.push(bonus_amount)
        EPhyMax[i-1] = 'True'
      }
      else{
        EPhyMaxValues.push(0)
        EPhyMax[i-1] = 'False'
      }
    }
    if (i === 4){
      EPhyMax[i] = 'False'
    }
  }
  for (let i = 0; i < collection.MagMax.length; i++) {
    MagMax.push(collection.MagMax[i].traits[2])
    if (MagMax){
      if(MagMax[i-1]<collection.MagMax[i].traits[2]){
        let bonus_amount = Math.round((((collection.MagMax[i-1].stats.matk*collection.MagMax[i-1].traits[2])-(collection.MagMax[i].stats.matk*collection.MagMax[i].traits[2]))/(collection.MagMax[i].traits[2]-collection.MagMax[i-1].traits[2]))*100)/100
        MagMaxValues.push(bonus_amount)
        MagMax[i-1] = 'True'
      }
      else{
        MagMaxValues.push(0)
        MagMax[i-1] = 'False'
      }
    }
    if (i === 4){
      MagMax[i] = 'False'
    }
  }
  for (let i = 0; i < collection.RecMax.length; i++) {
    RecMax.push(collection.RecMax[i].traits[3])
    if (RecMax){
      if(RecMax[i-1]<collection.RecMax[i].traits[3]){
        let bonus_amount = Math.round((((collection.RecMax[i-1].traits[3])*(120+0.8*collection.RecMax[i-1].stats.matk))-((collection.RecMax[i].traits[3])*(120+0.8*collection.RecMax[i].stats.matk)))/(0.8 * collection.RecMax[i].traits[3]- 0.8* collection.RecMax[i-1].traits[3])*100)/100
        RecMaxValues.push(bonus_amount)
        RecMax[i-1] = "True"
      }
      else{
        RecMaxValues.push(0)
        RecMax[i-1] = "False"
      }
    }
    if (i === 4){
      RecMax[i] = "False"
    }
  }
  return {PhyMax:[PhyMax,PhyMaxValues],EPhyMax:[EPhyMax,EPhyMaxValues],MagMax:[MagMax,MagMaxValues],RecMax:[RecMax,RecMaxValues]}
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
    const PhyMaxV = newFinalArray.sort((a,b) => a.PhyD > b.PhyD? -1 : 1)
    let PhyMax = [PhyMaxV[0],PhyMaxV[1],PhyMaxV[2],PhyMaxV[3],PhyMaxV[4]]
    newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    const EPhyMaxV = newFinalArray.sort((a,b) => a.PhyEd > b.PhyEd? -1 : 1)
    let EPhyMax = [EPhyMaxV[0],EPhyMaxV[1],EPhyMaxV[2],EPhyMaxV[3],EPhyMaxV[4]]
    newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    const MagMaxV = newFinalArray.sort((a,b) => a.MagD > b.MagD? -1 : 1)
    let MagMax = [MagMaxV[0],MagMaxV[1],MagMaxV[2],MagMaxV[3],MagMaxV[4]]
    newFinalArray = FinalArray.filter(x => x.PhyD > 0)
    const RecMaxV = newFinalArray.sort((a,b) => a.R > b.R? -1 : 1)
    let RecMax = [RecMaxV[0],RecMaxV[1],RecMaxV[2],RecMaxV[3],RecMaxV[4]]
    let container = {
        PhyMax:PhyMax,
        EPhyMax:EPhyMax,
        MagMax:MagMax,
        RecMax:RecMax,
        WeaponCheck:0,
    }
    container.WeaponCheck = CheckWeapon(container)
    console.log(container)
    return container
}

export {CalculateDamage}
export default Optimize
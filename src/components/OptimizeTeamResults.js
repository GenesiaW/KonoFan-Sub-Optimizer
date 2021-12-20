import { CalculateDamage } from "./calculations"
import { useState,useEffect} from "react"
import {Table} from "react-bootstrap"
import UnitButton from "./UnitButton"

function OptimizeTeamResults({props,exclusions,MeguminSuper,OpUlt}) {
    const [UnitList,setUnitList] = useState([{
        PhyD:0,
        stats:{
            Main:{
                uid:1011100
            }
        },
    },
    {
        PhyD:0,
        stats:{
            Main:{
                uid:1011100
            }
        },
    },
    {
        PhyD:0,
        stats:{
            Main:{
                uid:1011100
            }
        },
    },
    {
        PhyD:0,
        stats:{
            Main:{
                uid:1011100
            }
        },
    },
    {
        PhyD:0,
        stats:{
            Main:{
                uid:1011100
            }
        },
    },
    ])
    useEffect(() =>{
        if(exclusions.length === 15){
            let ResultList = []
            let excludedList = []
            while (exclusions.length){
                excludedList.push(exclusions.splice(0,3))
            }
            for (let i = 0; i < excludedList.length; i++) {
                ResultList.push(CalculateDamage(props,excludedList[i][0],excludedList[i][1],excludedList[i][2],MeguminSuper,OpUlt))
            }
            setUnitList(ResultList)
        }
    },[exclusions,props,MeguminSuper,OpUlt])

    const UnitOne = UnitList[0]
    const UnitTwo = UnitList[1]
    const UnitThree = UnitList[2]
    const UnitFour = UnitList[3]
    const UnitFive = UnitList[4]

    console.log(UnitOne)
    return (
        <div>
            <Table striped borderless bordered size="sm" style={{textAlign:"center"}}>
                <tbody>
                    <tr>
                        <td>Main </td>                        
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitOne.stats.Main :{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitTwo.stats.Main :{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitThree.stats.Main:{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitFour.stats.Main:{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitFive.stats.Main:{uid:1001100,owned:true}}/>
                        </td> 
                    </tr>
                    <tr>
                        <td>Traits</td>                        
                        <td>
                            {UnitOne.PhyD? UnitOne.stats.Main.display_trait :"NA"}
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitTwo.stats.Main.display_trait :"NA"}    
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitThree.stats.Main.display_trait :"NA"}   
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitFour.stats.Main.display_trait :"NA"}
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitFive.stats.Main.display_trait :"NA"}
                        </td> 
                    </tr>
                    <tr>
                        <td>Sub 1</td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitOne.stats.SubOne :{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitTwo.stats.SubOne :{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitThree.stats.SubOne:{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitFour.stats.SubOne:{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitFive.stats.SubOne:{uid:1001100,owned:true}}/>
                        </td> 
                    </tr>
                    <tr>
                        <td>Traits</td>                        
                        <td>
                            {UnitOne.PhyD? UnitOne.stats.SubOne.display_trait :"NA"}
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitTwo.stats.SubOne.display_trait :"NA"}    
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitThree.stats.SubOne.display_trait :"NA"}   
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitFour.stats.SubOne.display_trait :"NA"}
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitFive.stats.SubOne.display_trait :"NA"}
                        </td> 
                    </tr>
                    <tr>
                        <td>Sub 2</td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitOne.stats.SubTwo:{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitTwo.stats.SubTwo :{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitThree.stats.SubTwo:{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitFour.stats.SubTwo:{uid:1001100,owned:true}}/>
                        </td>
                        <td>
                            <UnitButton props={UnitOne.PhyD? UnitFive.stats.SubTwo:{uid:1001100,owned:true}}/>
                        </td> 
                    </tr>
                    <tr>
                        <td>Traits</td>                        
                        <td>
                            {UnitOne.PhyD? UnitOne.stats.SubTwo.display_trait :"NA"}
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitTwo.stats.SubTwo.display_trait :"NA"}    
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitThree.stats.SubTwo.display_trait :"NA"}   
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitFour.stats.SubTwo.display_trait :"NA"}
                        </td>
                        <td>
                            {UnitOne.PhyD? UnitFive.stats.SubTwo.display_trait :"NA"}
                        </td> 
                    </tr>
                    <tr>
                        <td>Max Physical Attack</td>
                        <td>{Math.round(UnitOne.PhyD*100)/100}</td>
                        <td>{Math.round(UnitTwo.PhyD*100)/100}</td>
                        <td>{Math.round(UnitThree.PhyD*100)/100}</td>
                        <td>{Math.round(UnitFour.PhyD*100)/100}</td>
                        <td>{Math.round(UnitFive.PhyD*100)/100}</td>
                    </tr>
                    <tr>
                        <td>Max Elemental Physical Attack</td>
                        <td>{Math.round(UnitOne.PhyEd*100)/100}</td>
                        <td>{Math.round(UnitTwo.PhyEd*100)/100}</td>
                        <td>{Math.round(UnitThree.PhyEd*100)/100}</td>
                        <td>{Math.round(UnitFour.PhyEd*100)/100}</td>
                        <td>{Math.round(UnitFive.PhyEd*100)/100}</td>
                    </tr>
                    <tr>
                        <td>Max Magical Attack</td>
                        <td>{Math.round(UnitOne.MagD*100)/100}</td>
                        <td>{Math.round(UnitTwo.MagD*100)/100}</td>
                        <td>{Math.round(UnitThree.MagD*100)/100}</td>
                        <td>{Math.round(UnitFour.MagD*100)/100}</td>
                        <td>{Math.round(UnitFive.MagD*100)/100}</td>
                    </tr>
                    <tr>
                        <td>Max Recovery</td>
                        <td>{Math.round(UnitOne.R*100)/100}</td>
                        <td>{Math.round(UnitTwo.R*100)/100}</td>
                        <td>{Math.round(UnitThree.R*100)/100}</td>
                        <td>{Math.round(UnitFour.R*100)/100}</td>
                        <td>{Math.round(UnitFive.R*100)/100}</td>
                    </tr>
                    <tr>
                        <td colSpan="6"><strong>Stats</strong></td>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>{Math.round(UnitOne.stats.hp*100)/100}</td>
                        <td>{Math.round(UnitTwo.stats.hp*100)/100}</td>
                        <td>{Math.round(UnitThree.stats.hp*100)/100}</td>
                        <td>{Math.round(UnitFour.stats.hp*100)/100}</td>
                        <td>{Math.round(UnitFive.stats.hp*100)/100}</td>
                    </tr>
                    <tr>
                        <td>P.Atk</td>
                        <td>{Math.round(UnitOne.stats.patk*100)/100}</td>
                        <td>{Math.round(UnitTwo.stats.patk*100)/100}</td>
                        <td>{Math.round(UnitThree.stats.patk*100)/100}</td>
                        <td>{Math.round(UnitFour.stats.patk*100)/100}</td>
                        <td>{Math.round(UnitFive.stats.patk*100)/100}</td>
                    </tr>
                    <tr>
                        <td>M.Atk</td>
                        <td>{Math.round(UnitOne.stats.matk*100)/100}</td>
                        <td>{Math.round(UnitTwo.stats.matk*100)/100}</td>
                        <td>{Math.round(UnitThree.stats.matk*100)/100}</td>
                        <td>{Math.round(UnitFour.stats.matk*100)/100}</td>
                        <td>{Math.round(UnitFive.stats.matk*100)/100}</td>
                    </tr>
                    <tr>
                        <td>P.Def</td>
                        <td>{Math.round(UnitOne.stats.pdef*100)/100}</td>
                        <td>{Math.round(UnitTwo.stats.pdef*100)/100}</td>
                        <td>{Math.round(UnitThree.stats.pdef*100)/100}</td>
                        <td>{Math.round(UnitFour.stats.pdef*100)/100}</td>
                        <td>{Math.round(UnitFive.stats.pdef*100)/100}</td>
                    </tr>
                    <tr>
                        <td>M.Def</td>
                        <td>{Math.round(UnitOne.stats.mdef*100)/100}</td>
                        <td>{Math.round(UnitTwo.stats.mdef*100)/100}</td>
                        <td>{Math.round(UnitThree.stats.mdef*100)/100}</td>
                        <td>{Math.round(UnitFour.stats.mdef*100)/100}</td>
                        <td>{Math.round(UnitFive.stats.mdef*100)/100}</td>
                    </tr>
                    <tr>
                        <td>Agi</td>
                        <td>{UnitOne.stats.Main.agi}</td>
                        <td>{UnitTwo.stats.Main.agi}</td>
                        <td>{UnitThree.stats.Main.agi}</td>
                        <td>{UnitFour.stats.Main.agi}</td>
                        <td>{UnitFive.stats.Main.agi}</td>
                    </tr>
                    <tr>
                        <td>Dex</td>
                        <td>{UnitOne.stats.Main.dex}</td>
                        <td>{UnitTwo.stats.Main.dex}</td>
                        <td>{UnitThree.stats.Main.dex}</td>
                        <td>{UnitFour.stats.Main.dex}</td>
                        <td>{UnitFive.stats.Main.dex}</td>
                    </tr>
                    <tr>
                        <td>Luck</td>
                        <td>{UnitOne.stats.Main.luck}</td>
                        <td>{UnitTwo.stats.Main.luck}</td>
                        <td>{UnitThree.stats.Main.luck}</td>
                        <td>{UnitFour.stats.Main.luck}</td>
                        <td>{UnitFive.stats.Main.luck}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default OptimizeTeamResults

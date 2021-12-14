import { Table,DropdownButton,Dropdown } from "react-bootstrap"
import UnitButton from "./UnitButton"
import { useState } from "react"

function OptimizedContainer({props}) {
    const [CurrentIndex,setCurrentIndex] = useState(0)
    const [CurrentLabel,setLabel] = useState("Rank 1")

    const LabelHelper = {
        0:"Rank 1",
        1:"Rank 2",
        2:"Rank 3",
        3:"Rank 4",
        4:"Rank 5"
    }

    const IndexSwitch = (eventKey) => {setLabel(LabelHelper[eventKey]);setCurrentIndex(eventKey)}

    return (
        <Table striped borderless bordered size="sm" style={{textAlign:"center"}}>
            <thead>
                <tr>
                    <th></th>
                    <th>Max Physical Setup</th>
                    <th>Max Elemental Physical Setup</th>
                    <th>Max Magical Setup</th>
                    <th>Max Recovery Setup</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td>
                        <DropdownButton variant="outline-primary" title={CurrentLabel} onSelect={IndexSwitch}>
                            <Dropdown.Item eventKey={0}>Rank 1</Dropdown.Item>
                            <Dropdown.Item eventKey={1}>Rank 2</Dropdown.Item>
                            <Dropdown.Item eventKey={2}>Rank 3</Dropdown.Item>
                            <Dropdown.Item eventKey={3}>Rank 4</Dropdown.Item>
                            <Dropdown.Item eventKey={4}>Rank 5</Dropdown.Item>
                        </DropdownButton>
                        </td>
                        <td>
                            <UnitButton props={(props.PhyMax[CurrentIndex]? props.PhyMax[CurrentIndex].stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.PhyMax[CurrentIndex]? props.PhyMax[CurrentIndex].stats.SubTwo:({uid:1001100}))}/>
                        </td>
                        <td>
                            <UnitButton props={(props.EPhyMax[CurrentIndex]? props.EPhyMax[CurrentIndex].stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.EPhyMax[CurrentIndex]? props.EPhyMax[CurrentIndex].stats.SubTwo:({uid:1001100}))}/>
                        </td>
                        <td>
                            <UnitButton props={(props.MagMax[CurrentIndex]? props.MagMax[CurrentIndex].stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.MagMax[CurrentIndex]? props.MagMax[CurrentIndex].stats.SubTwo:({uid:1001100}))}/>
                        </td>
                        <td>
                            <UnitButton props={(props.RecMax[CurrentIndex]? props.RecMax[CurrentIndex].stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.RecMax[CurrentIndex]? props.RecMax[CurrentIndex].stats.SubTwo:({uid:1001100}))}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Physical Damage</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].PhyD*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].PhyD*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].PhyD*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].PhyD*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td>Elemental Physical Damage</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].PhyEd*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].PhyEd*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].PhyEd*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].PhyEd*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td>Magical Damage</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].MagD*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].MagD*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].MagD*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].MagD*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td>Recovery</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].R*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].R*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].R*100)/100 :0)}</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].R*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td colSpan="5"><strong>Stats</strong></td>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].stats.hp*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].stats.hp*100)/100 :"0")}</td>
                        <td>{(props.MagMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].stats.hp*100)/100 :"0")}</td>
                        <td>{(props.RecMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].stats.hp*100)/100 :"0")}</td>
                    </tr>
				  <tr>
                        <td>P. Atk</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].stats.patk*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].stats.patk*100)/100 :"0")}</td>
                        <td>{(props.MagMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].stats.patk*100)/100 :"0")}</td>
                        <td>{(props.RecMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].stats.patk*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>M. Atk</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].stats.matk*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].stats.matk*100)/100 :"0")}</td>
                        <td>{(props.MagMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].stats.matk*100)/100 :"0")}</td>
                        <td>{(props.RecMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].stats.matk*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>P. Def</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].stats.pdef*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].stats.pdef*100)/100 :"0")}</td>
                        <td>{(props.MagMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].stats.pdef*100)/100 :"0")}</td>
                        <td>{(props.RecMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].stats.pdef*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>M. Def</td>
                        <td>{(props.PhyMax[CurrentIndex]? Math.round(props.PhyMax[CurrentIndex].stats.mdef*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax[CurrentIndex]? Math.round(props.EPhyMax[CurrentIndex].stats.mdef*100)/100 :"0")}</td>
                        <td>{(props.MagMax[CurrentIndex]? Math.round(props.MagMax[CurrentIndex].stats.mdef*100)/100 :"0")}</td>
                        <td>{(props.RecMax[CurrentIndex]? Math.round(props.RecMax[CurrentIndex].stats.mdef*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>Agi</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.agi*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.agi*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.agi*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.agi*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>Dex</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.dex*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.dex*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.dex*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.dex*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>Luck</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.luck*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.luck*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.luck*100)/100 :"0")}</td>
                        <td>{(props.PhyMax[CurrentIndex].stats.Main? Math.round(props.PhyMax[CurrentIndex].stats.Main.luck*100)/100 :"0")}</td>
                    </tr>
                </tbody>
        </Table>
    )
}

export default OptimizedContainer

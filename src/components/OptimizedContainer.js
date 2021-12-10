import { Table } from "react-bootstrap"
import UnitButton from "./UnitButton"

function OptimizedContainer({props}) {
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
                        <td></td>
                        <td>
                            <UnitButton props={(props.PhyMax? props.PhyMax.stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.PhyMax? props.PhyMax.stats.SubTwo:({uid:1001100}))}/>
                        </td>
                        <td>
                            <UnitButton props={(props.EPhyMax? props.EPhyMax.stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.EPhyMax? props.EPhyMax.stats.SubTwo:({uid:1001100}))}/>
                        </td>
                        <td>
                            <UnitButton props={(props.MagMax? props.MagMax.stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.MagMax? props.MagMax.stats.SubTwo:({uid:1001100}))}/>
                        </td>
                        <td>
                            <UnitButton props={(props.RecMax? props.RecMax.stats.SubOne:({uid:1001100}))}/>
                            <UnitButton props={(props.RecMax? props.RecMax.stats.SubTwo:({uid:1001100}))}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Physical Damage</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.PhyD*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.EPhyMax.PhyD*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.MagMax.PhyD*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.RecMax.PhyD*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td>Elemental Physical Damage</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.PhyEd*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.EPhyMax.PhyEd*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.MagMax.PhyEd*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.RecMax.PhyEd*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td>Magical Damage</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.MagD*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.EPhyMax.MagD*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.MagMax.MagD*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.RecMax.MagD*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td>Recovery</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.R*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.EPhyMax.R*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.MagMax.R*100)/100 :0)}</td>
                        <td>{(props.PhyMax? Math.round(props.RecMax.R*100)/100 :0)}</td>
                    </tr>
                    <tr>
                        <td colSpan="5"><strong>Stats</strong></td>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.stats.hp*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax? Math.round(props.EPhyMax.stats.hp*100)/100 :"0")}</td>
                        <td>{(props.MagMax? Math.round(props.MagMax.stats.hp*100)/100 :"0")}</td>
                        <td>{(props.RecMax? Math.round(props.RecMax.stats.hp*100)/100 :"0")}</td>
                    </tr>
				  <tr>
                        <td>P. Atk</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.stats.patk*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax? Math.round(props.EPhyMax.stats.patk*100)/100 :"0")}</td>
                        <td>{(props.MagMax? Math.round(props.MagMax.stats.patk*100)/100 :"0")}</td>
                        <td>{(props.RecMax? Math.round(props.RecMax.stats.patk*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>M. Atk</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.stats.matk*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax? Math.round(props.EPhyMax.stats.matk*100)/100 :"0")}</td>
                        <td>{(props.MagMax? Math.round(props.MagMax.stats.matk*100)/100 :"0")}</td>
                        <td>{(props.RecMax? Math.round(props.RecMax.stats.matk*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>P. Def</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.stats.pdef*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax? Math.round(props.EPhyMax.stats.pdef*100)/100 :"0")}</td>
                        <td>{(props.MagMax? Math.round(props.MagMax.stats.pdef*100)/100 :"0")}</td>
                        <td>{(props.RecMax? Math.round(props.RecMax.stats.pdef*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>M. Def</td>
                        <td>{(props.PhyMax? Math.round(props.PhyMax.stats.mdef*100)/100 :"0")}</td>
                        <td>{(props.EPhyMax? Math.round(props.EPhyMax.stats.mdef*100)/100 :"0")}</td>
                        <td>{(props.MagMax? Math.round(props.MagMax.stats.mdef*100)/100 :"0")}</td>
                        <td>{(props.RecMax? Math.round(props.RecMax.stats.mdef*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>Agi</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.agi*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.agi*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.agi*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.agi*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>Dex</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.dex*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.dex*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.dex*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.dex*100)/100 :"0")}</td>
                    </tr>
                    <tr>
                        <td>Luck</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.luck*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.luck*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.luck*100)/100 :"0")}</td>
                        <td>{(props.PhyMax.stats.Main? Math.round(props.PhyMax.stats.Main.luck*100)/100 :"0")}</td>
                    </tr>
                </tbody>
        </Table>
    )
}

export default OptimizedContainer

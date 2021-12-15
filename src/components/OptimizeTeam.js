import { Modal,Button,Col,Container,Row,DropdownButton,Dropdown} from "react-bootstrap"
import Inventory from "./Inventory";
import Optimize from "./calculations"
import { useState} from "react";
import OptimizeTeamResults from "./OptimizeTeamResults";

function OptimizeTeam({props,show,handleClose,fastMode}) {
    const [counter,setCounter] = useState(0)
    const [Exclusions,setExclusions] = useState([])
    const [SubList,setSubList]= useState([])
    const [BackSubListOne,setBackSubListOne] = useState([])
    const [BackSubListTwo,setBackSubListTwo] = useState([])
    const [TempFilter,setFilter] = useState("Select a Filter")

    const FilterList = {
        "Select a Filter": (x => x.owned),
        "Fire": (x => x.element === "Fire"),
        "Water": (x => x.element === "Water"),
        "Wind": (x => x.element === "Wind"),
        "Earth": (x => x.element === "Earth"),
        "Lightning": (x => x.element === "Lightning"),
        "Light": (x => x.element === "Light"),
        "Dark": (x => x.element === "Dark"),
    }

    const handleFilter = (eventKey) => setFilter(eventKey)

    const HandleCloseWipe = () => {
        setExclusions([])
        handleClose()
    }

    const HeaderHelper = {
        0:"Team Optimizer: Select First Unit",
        1:"Team Optimizer: Select First Sub",
        2:"Team Optimizer: Select Second Sub",
        3:"Team Optimizer: Select Second Unit",
        4:"Team Optimizer: Select First Sub",
        5:"Team Optimizer: Select Second Sub",
        6:"Team Optimizer: Select Third Unit",
        7:"Team Optimizer: Select First Sub",
        8:"Team Optimizer: Select Second Sub",
        9:"Team Optimizer: Select Fourth Unit",
        10:"Team Optimizer: Select First Sub",
        11:"Team Optimizer: Select Second Sub",
        12:"Team Optimizer: Select Fifth Unit",
        13:"Team Optimizer: Select First Sub",
        14:"Team Optimizer: Select Second Sub",
        15:"Team Optimizer: Results"

    }

    const ModifyProps = (uid) => {
        let fastModeHelper = false
        if(fastMode){
            fastModeHelper = true
        }
        const newExclusion = [...Exclusions]
        newExclusion.push(uid)
        const results = Optimize(AvailUnits,uid)
        let newSubList = []
        if (fastMode){
            newSubList.push({uid:"maxphy",container:[results.PhyMax[0].stats.SubOne,results.PhyMax[0].stats.SubTwo],owned:fastModeHelper})
            newSubList.push({uid:"maxephy",container:[results.EPhyMax[0].stats.SubOne,results.EPhyMax[0].stats.SubTwo],owned:fastModeHelper})
            newSubList.push({uid:"maxmag",container:[results.MagMax[0].stats.SubOne,results.MagMax[0].stats.SubTwo],owned:fastModeHelper})
            newSubList.push({uid:"maxrec",container:[results.RecMax[0].stats.SubOne,results.RecMax[0].stats.SubTwo],owned:fastModeHelper})
        }
        else{
            newSubList.push({uid:"maxphy",container:[results.PhyMax[0].stats.SubOne,results.PhyMax[0].stats.SubTwo],owned:fastModeHelper})
            newSubList.push(results.PhyMax[0].stats.SubOne)
            newSubList.push(results.PhyMax[0].stats.SubTwo)
            newSubList.push({uid:"maxephy",container:[results.EPhyMax[0].stats.SubOne,results.EPhyMax[0].stats.SubTwo],owned:fastModeHelper})
            newSubList.push(results.EPhyMax[0].stats.SubOne)
            newSubList.push(results.EPhyMax[0].stats.SubTwo)
            newSubList.push({uid:"maxmag",container:[results.MagMax[0].stats.SubOne,results.MagMax[0].stats.SubTwo],owned:fastModeHelper})
            newSubList.push(results.MagMax[0].stats.SubOne)
            newSubList.push(results.MagMax[0].stats.SubTwo)
            newSubList.push({uid:"maxrec",container:[results.RecMax[0].stats.SubOne,results.RecMax[0].stats.SubTwo],owned:fastModeHelper})
            newSubList.push(results.RecMax[0].stats.SubOne)
            newSubList.push(results.RecMax[0].stats.SubTwo)
        }
        setSubList(newSubList)
        setBackSubListOne(newSubList)
        setExclusions(newExclusion)
    }
    const SelectSubUnits = (uid,props) => {
        const newExclusion = [...Exclusions]
        let newSubList = []
        const maxHelper = ["maxphy","maxephy","maxmag","maxrec"]
        if (fastMode){
            if (maxHelper.includes(uid)){
                newExclusion.push(props[0].uid)
                newExclusion.push(props[1].uid)
                setCounter(counter+1)
            } 
        }
        else{
            if (maxHelper.includes(uid)){
                return
            }
            else{
                newExclusion.push(uid) 
                newSubList = SubList.filter(x=>x.uid !== uid)
                setSubList(newSubList)
            }
        }
        if (newExclusion.length %3 === 2){
            setBackSubListTwo(newSubList)
        }
        setExclusions(newExclusion)
    }

    const HandleBack = () => {
        const newExclusions = [...Exclusions]
        if(Exclusions.length){
            if (counter){
                if(Exclusions.length%2){
                    newExclusions.pop()
                }
                else{
                }
                setCounter(counter-1)
            }
            newExclusions.pop()
            setExclusions(newExclusions)
        }
        if (newExclusions.length %3 === 1){
            setSubList(BackSubListOne)
        }
        else if (newExclusions.length %3 === 2){
            setSubList(BackSubListTwo)
        }
    }

    const OptimizeAgain = () => {
        setExclusions([])
    }

    const PureList = props
    const AvailUnits = props.filter(x=>x.owned).filter(x=>!(Exclusions.includes(x.uid))).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    const FilteredUnits = AvailUnits.filter(FilterList[TempFilter]).sort((a, b) => a.rarity > b.rarity ? -1 : 1)

    return(
        <div>
            <Modal            
            show={show} 
            onHide={HandleCloseWipe} 
            animation={false}
            fullscreen
            scrollable={true} 
            dialogClassName="modal-cw"
            >
               <Modal.Header closeButton>
               <Container fluid>
                        <Row>
                            <Col><Modal.Title>{HeaderHelper[Exclusions.length]}</Modal.Title></Col>
                            <Col align="end" style={{margin:"0px",padding:"0px"}}>
                                {Exclusions.length === 15?
                                null:
                                (Exclusions.length %3 ===0?
                                (<DropdownButton variant="outline-primary" title={TempFilter} onSelect={handleFilter} align="end" style={{marginRight:"10px"}}>
                                <Dropdown.Item eventKey="Select a Filter">None</Dropdown.Item>
                                <Dropdown.Item eventKey="Water">Water</Dropdown.Item>
                                <Dropdown.Item eventKey="Fire">Fire</Dropdown.Item>
                                <Dropdown.Item eventKey="Wind">Wind</Dropdown.Item>
                                <Dropdown.Item eventKey="Earth">Earth</Dropdown.Item>
                                <Dropdown.Item eventKey="Lightning">Lightning</Dropdown.Item>
                                <Dropdown.Item eventKey="Light">Light</Dropdown.Item>
                                <Dropdown.Item eventKey="Dark">Dark</Dropdown.Item>
                            </DropdownButton>):null)    
                            }
                            </Col>
                            <Col align="end" xs={2}>
                                {Exclusions.length === 15?
                                    <Button variant="outline-primary" onClick={OptimizeAgain} style={{marginLeft:"-4.5rem",whiteSpace:"nowrap"}}>Optimize Another Team</Button>:
                                    (Exclusions.length?
                                    <Button variant="outline-primary" style={{marginRight:"5px",paddingLeft:"10px"}} onClick={HandleBack}>Previous Step</Button>
                                    :<Button variant="outline-primary" style={{marginRight:"5px",paddingLeft:"10px"}} disabled>Previous Step</Button>)   
                                    }
                            </Col>
                        </Row>
                    </Container>
               </Modal.Header>
               <Modal.Body>
                   {Exclusions[0]? 
                   (Exclusions.length === 15 ? 
                    <OptimizeTeamResults props={PureList} exclusions={Exclusions}/>:
                   (Exclusions.length % 3? (<Inventory props={SubList} SelectSubUnits={SelectSubUnits}/>)
                   :(<Inventory props={FilteredUnits} setMultiProps={ModifyProps}/>))):
                   (<Inventory props={FilteredUnits} setMultiProps={ModifyProps}/>)}                  
                </Modal.Body>
           </Modal>
        </div>
    )
}

export default OptimizeTeam

import { Modal,Button,Col,Container,Row,DropdownButton,Dropdown} from "react-bootstrap"
import Inventory from "./Inventory";
import Optimize from "./calculations"
import { useState,useEffect} from "react";
import OptimizeTeamResults from "./OptimizeTeamResults";

function OptimizeTeamFast({props,show,handleClose,MeguminSuper,OpUlt}) {
    const [Exclusions,setExclusions] = useState([])
    const [ClassFilter,setClassFilter] = useState([])
    const [SetupList,setSetupList] = useState([])
    const [InputFieldValue, SetInputFieldValue] = useState()
    const SubList =[{uid:"maxphy",owned:true},{uid:"maxephy",owned:true},{uid:"maxmag",owned:true},{uid:"maxrec",owned:true}]
    const [TempFilter,setFilter] = useState("Select a Filter")
    const [TempSort,setSort] = useState("Sort By")

    const getFilteredResults = (FilteredUnits,InputFieldValue) => {
        if (InputFieldValue){
            return FilteredUnits.filter(x=> (x.class).toLowerCase().includes(InputFieldValue.toLowerCase()) || (x.display_trait).toLowerCase().includes(InputFieldValue.toLowerCase()));
        }
        else{
            return FilteredUnits
        }
    }

    const SortList = {
        "Sort By": ((a, b) => a.rarity > b.rarity ? -1 : 1),
        "Rarity Ascending": ((a, b) => a.rarity > b.rarity ? 1 : -1),
        "P.Atk Ascending": ((a, b) => a.patk > b.patk ? 1 : -1),
        "P.Atk Descending": ((a, b) => a.patk > b.patk ? -1 : 1),
        "M.Atk Ascending": ((a, b) => a.matk > b.matk ? 1 : -1),
        "M.Atk Descending": ((a, b) => a.matk > b.matk ? -1 : 1),
    }
    const handleSort = (eventKey) => setSort(eventKey)
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
        setClassFilter([])
        setSetupList([])
        SetInputFieldValue();
        handleClose()
    }

    const HeaderHelper = {
        0:"Team Optimizer: Select First Unit",
        1:"Team Optimizer: Select Criteria to Optimize",
        2:"Team Optimizer: Select Second Unit",
        3:"Team Optimizer: Select Criteria to Optimize",
        4:"Team Optimizer: Select Third Unit",
        5:"Team Optimizer: Select Criteria to Optimize",
        6:"Team Optimizer: Select Fourth Unit",
        7:"Team Optimizer: Select Criteria to Optimize",
        8:"Team Optimizer: Select Fifth Unit",
        9:"Team Optimizer: Select Criteria to Optimize",
        15:"Team Optimizer: Results"

    }

    const ModifyProps = (uid) => {
        const newExclusion = [...Exclusions]
        const newClassFilter =[...ClassFilter]
        newExclusion.push(uid)
        newClassFilter.push(Math.floor(uid/10000))
        setExclusions(newExclusion)
        setClassFilter(newClassFilter)
        SetInputFieldValue();
    }
    const SelectSubUnits = (uid) => {
        const newSetupList = [...SetupList,uid]
        setSetupList(newSetupList)
    }

    const HandleBack = () => {
        const newExclusions = [...Exclusions]
        const newSetupList = [...SetupList]
        const newClassFilter =[...ClassFilter]
        SetInputFieldValue();
        if((Exclusions.length+SetupList.length)%2){
            newExclusions.pop()
            newClassFilter.pop()
            setExclusions(newExclusions)
            setClassFilter(newClassFilter)
        }
        else{
            newSetupList.pop()
            setSetupList(newSetupList)
        }
    }

    const OptimizeAgain = () => {
        setExclusions([])
        setClassFilter([])
        SetInputFieldValue();
        setSetupList([])
    }
    const PureList = props
    const AvailUnits = props.filter(x=>x.owned).filter(x=>!(Exclusions.includes(x.uid))&&!(ClassFilter.includes(Math.floor(x.uid/10000)))).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    const FilteredUnits = getFilteredResults(AvailUnits,InputFieldValue).filter(FilterList[TempFilter]).sort(SortList[TempSort])

    useEffect(() => {
        let FinalExclusion = []
        if (Exclusions.length+SetupList.length === 10){
            let ExclusionsCopy = [...Exclusions]
            let SetupListCopy = [...SetupList]
            const SetupHelper ={
                "maxphy":"PhyMax",
                "maxephy":"EPhyMax",
                "maxmag":"MagMax",
                "maxrec":"RecMax",
            }
            while(ExclusionsCopy.length){
                let uid = ExclusionsCopy.shift()
                const FavailUnits = props.filter(x=>x.owned).filter(x=>!(ExclusionsCopy.includes(x.uid)) && !(FinalExclusion.includes(x.uid))).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
                let criteria =SetupListCopy.shift()
                let result= Optimize(FavailUnits,uid,MeguminSuper,OpUlt)[SetupHelper[criteria]][0]
                FinalExclusion.push(uid)
                FinalExclusion.push(result.stats.SubOne.uid)
                FinalExclusion.push(result.stats.SubTwo.uid)
            }
        }
        if (FinalExclusion.length === 15){
            setExclusions(FinalExclusion)
            setSetupList([])
        }
    }, [Exclusions,SetupList,props,MeguminSuper,OpUlt])

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
                            <Col><Modal.Title>{HeaderHelper[(Exclusions.length + SetupList.length)]}</Modal.Title></Col>
                                {(Exclusions.length + SetupList.length) === 15?
                                null:
                                ((Exclusions.length + SetupList.length) %2 ===0?
                                (
                                <>
                                <Col align="end" style={{marginTop:"5px", marginLeft:"-10px"}}>
                                    <input value={InputFieldValue} placeholder="Search By Name or Trait" onChange={(e) => SetInputFieldValue(e.target.value)}/>
                                </Col>
                                <Col align="end" style={{maxWidth:"133.3px",marginRight:"20px",marginLeft:"-10px"}}>
                                <DropdownButton variant="outline-primary" title={TempSort} onSelect={handleSort} align="end">
                                    <Dropdown.Item eventKey="Sort By">Rarity Descending</Dropdown.Item>
                                    <Dropdown.Item eventKey="Rarity Ascending">Rarity Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="P.Atk Ascending">P.Atk Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="P.Atk Descending">P.Atk Descending</Dropdown.Item>
                                    <Dropdown.Item eventKey="M.Atk Ascending">M.Atk Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="M.Atk Descending">M.Atk Descending</Dropdown.Item>
                                </DropdownButton></Col>
                                <Col align="end"  style={{maxWidth:"133.3px",marginRight:"20px",marginLeft:"-10px"}}>
                                    <DropdownButton variant="outline-primary" title={TempFilter} onSelect={handleFilter}>
                                        <Dropdown.Item eventKey="Select a Filter">None</Dropdown.Item>
                                        <Dropdown.Item eventKey="Water">Water</Dropdown.Item>
                                        <Dropdown.Item eventKey="Fire">Fire</Dropdown.Item>
                                        <Dropdown.Item eventKey="Wind">Wind</Dropdown.Item>
                                        <Dropdown.Item eventKey="Earth">Earth</Dropdown.Item>
                                        <Dropdown.Item eventKey="Lightning">Lightning</Dropdown.Item>
                                        <Dropdown.Item eventKey="Light">Light</Dropdown.Item>
                                        <Dropdown.Item eventKey="Dark">Dark</Dropdown.Item>
                                    </DropdownButton>
                                    </Col></>
                                ):null)    
                            }
                            <Col align="end" xs={2}>
                                {(Exclusions.length + SetupList.length) === 15?
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
                   ((Exclusions.length + SetupList.length) === 15 ? 
                    <OptimizeTeamResults props={PureList} exclusions={Exclusions} MeguminSuper={MeguminSuper} OpUlt={OpUlt}/>:
                   ((Exclusions.length + SetupList.length) % 2? (<Inventory props={SubList} SelectSubUnits={SelectSubUnits}/>)
                   :(<Inventory props={FilteredUnits} setMultiProps={ModifyProps}/>))):
                   (<Inventory props={FilteredUnits} setMultiProps={ModifyProps}/>)}                  
                </Modal.Body>
           </Modal>
        </div>
    )
}

export default OptimizeTeamFast

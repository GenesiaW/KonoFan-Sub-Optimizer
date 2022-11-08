import {Button,Modal,Container,Row,Col,Dropdown,DropdownButton} from "react-bootstrap"
import Inventory from "./Inventory"
import { useState} from "react"
import ReactGA from 'react-ga';

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
  195:"Maple",
  196:"Sally",
  197:"Kasumi",
}

function UnitExclusionModule({UnitExclusionProps,ToggleExclusion,setExclusionList,ExclusionList,setUnitExclusion}) {
    const [show, setShow] = useState(false);
    const [TempFilter,setFilter] = useState("Select a Filter")
    const [InputFieldValue, SetInputFieldValue] = useState()
    const getFilteredResults = (FilteredUnits,InputFieldValue) => {
      if (InputFieldValue){
          return FilteredUnits.filter(x=> (class_map[Math.floor(x.uid/10000)]).toLowerCase().includes(InputFieldValue.toLowerCase()) || (x.display_trait).toLowerCase().includes(InputFieldValue.toLowerCase()));
      }
      else{
          return FilteredUnits
      }
    }
    const FilterList = {
        "Select a Filter": (x => x),
        "Excluded":(x=> !x.owned),
        "Fire": (x => x.element === "Fire"),
        "Water": (x => x.element === "Water"),
        "Wind": (x => x.element === "Wind"),
        "Earth": (x => x.element === "Earth"),
        "Lightning": (x => x.element === "Lightning"),
        "Light": (x => x.element === "Light"),
        "Dark": (x => x.element === "Dark"),
    }
    const handleClear= () => {
      const newProps = [...UnitExclusionProps]
      ExclusionList.forEach(element => {
        let individual = newProps.find(x=> x.uid === element)
        individual.owned = true
      })
      setUnitExclusion(newProps)
      setExclusionList([])
    }
    const handleFilter = (eventKey) => setFilter(eventKey)

    const handleClose = () => {ReactGA.pageview("/unitex-to-root");setShow(false);}
    const handleShow = () => {
        ReactGA.modalview("/unit-ex")
        ReactGA.event({category:"User",
        action:"Unit Exclusion"});
        setShow(true);
      }
    const AvailFUnits = UnitExclusionProps.sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    const FilteredUnits = getFilteredResults(AvailFUnits,InputFieldValue).filter(FilterList[TempFilter]).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    return (
        <div>
            <Button variant="outline-light" align="end" onClick={handleShow} style={{marginRight:"10px"}}>Unit Exclusion</Button>
            <Modal 
            show={show} 
            onHide={handleClose} 
            animation={false} 
            centered 
            scrollable={true} 
            fullscreen="md-down"
            dialogClassName="modal-cw">
            <Modal.Header closeButton>
              <Container fluid>
                <Row>
                  <Col align="start"><Modal.Title>Unit Exclusion</Modal.Title></Col>
                  <Col align="end" style={{marginTop:"5px", marginRight:"-15px"}}>
                    <input value={InputFieldValue} placeholder="Search By Name or Trait" onChange={(e) => SetInputFieldValue(e.target.value)}/>
                  </Col>
                  <Col align="end" style={{maxWidth:"133.3px",marginRight:"5px",marginLeft:"-15px"}}>
                  <Button variant="outline-primary" onClick={handleClear}>Clear All</Button></Col>
                  <Col align="end" style={{maxWidth:"133.3px",marginRight:"20px",marginLeft:"-10px"}}>
                  <DropdownButton variant="outline-primary" title={TempFilter} onSelect={handleFilter} align="end" style={{marginRight:"10px"}}>
                                <Dropdown.Item eventKey="Select a Filter">None</Dropdown.Item>
                                <Dropdown.Item eventKey="Excluded">Excluded</Dropdown.Item>
                                <Dropdown.Item eventKey="Water">Water</Dropdown.Item>
                                <Dropdown.Item eventKey="Fire">Fire</Dropdown.Item>
                                <Dropdown.Item eventKey="Wind">Wind</Dropdown.Item>
                                <Dropdown.Item eventKey="Earth">Earth</Dropdown.Item>
                                <Dropdown.Item eventKey="Lightning">Lightning</Dropdown.Item>
                                <Dropdown.Item eventKey="Light">Light</Dropdown.Item>
                                <Dropdown.Item eventKey="Dark">Dark</Dropdown.Item>
                            </DropdownButton>
                  </Col>
                </Row>
              </Container>
          </Modal.Header>
            <Modal.Body>
              <Inventory props={FilteredUnits} ToggleExclusion={ToggleExclusion}/>
            </Modal.Body>
        </Modal>
        </div>
    )
}

export default UnitExclusionModule

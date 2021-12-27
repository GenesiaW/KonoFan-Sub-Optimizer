import Inventory from "./Inventory"
import { Modal, Button,DropdownButton, Dropdown, Container,Row,Col } from "react-bootstrap"
import { useState } from "react"
import ReactGA from 'react-ga';


function InventoryButton({Ownership,ToggleOwned}) {
    // Modal
    const [show, setShow] = useState(false);
    const [InputFieldValue, SetInputFieldValue] = useState()
    const handleClose = () => {ReactGA.pageview("/inventory-to-root");setShow(false);SetInputFieldValue();}
    const getFilteredResults = (FilteredUnits,InputFieldValue) => {
      if (InputFieldValue){
          return FilteredUnits.filter(x=> (x.class).toLowerCase().includes(InputFieldValue.toLowerCase()) || (x.display_trait).toLowerCase().includes(InputFieldValue.toLowerCase()));
      }
      else{
          return FilteredUnits
      }
    }
    const handleShow = () => {
      ReactGA.modalview("/inventory")
      ReactGA.event({category:"User",
      action:"Inventory Management"});
      setShow(true);
    }
    //Menu Filter
    const [TempFilter,setFilter] = useState("Select a Filter")
    const FilterList = {
        "Select a Filter": (x => x),
        "New": (x => x.new),
        "Owned": (x => x.owned),
        "Not Owned": (x => !x.owned),
        "4★": (x=> x.rarity === 4),
        "3★": (x=> x.rarity === 3),
        "2★": (x=> x.rarity === 2),
        "1★": (x=> x.rarity === 1),
    }
    const handleFilter = (eventKey) => setFilter(eventKey)
    const NewOwnership = getFilteredResults(Ownership,InputFieldValue).filter(FilterList[TempFilter]).sort((a, b) => a.uid > b.uid ? 1 : -1)
    
    return (
    <div>
        <Button align="end" variant="outline-light" onClick={handleShow} style={{marginRight:"0.5rem"}}>Inventory</Button>  
     <Modal 
      show={show} 
      onHide={handleClose} 
      animation={false} 
      centered 
      scrollable={true} 
      fullscreen="md-down"
      dialogClassName="modal-cw">
            <Modal.Header closeButton>
              <Container>
                <Row>
                  <Col><Modal.Title>Inventory</Modal.Title></Col>
                  <Col align="end" style={{marginTop:"5px", marginLeft:"-10px"}}>
                    <input value={InputFieldValue} placeholder="Search By Name or Trait" onChange={(e) => SetInputFieldValue(e.target.value)}/>
                  </Col>
                  <Col align="end" style={{maxWidth:"133.3px",marginRight:"20px",marginLeft:"-10px"}}>
                    <DropdownButton variant="outline-primary" title={TempFilter} onSelect={handleFilter} align="end">
                      <Dropdown.Item eventKey="Select a Filter">Show All</Dropdown.Item>
                      <Dropdown.Item eventKey="New">New</Dropdown.Item>
                      <Dropdown.Item eventKey="Owned">Owned</Dropdown.Item>
                      <Dropdown.Item eventKey="Not Owned">Not Owned</Dropdown.Item>
                      <Dropdown.Item eventKey="4★">4 ★</Dropdown.Item> 
                      <Dropdown.Item eventKey="3★">3 ★</Dropdown.Item> 
                      <Dropdown.Item eventKey="2★">2 ★</Dropdown.Item> 
                      <Dropdown.Item eventKey="1★">1 ★</Dropdown.Item>  
                    </DropdownButton>
                  </Col>
                </Row>
              </Container>
          </Modal.Header>
            <Modal.Body className="Inventory">
              <Inventory props={NewOwnership} ToggleOwned={ToggleOwned}/>
            </Modal.Body>
        </Modal>
            
    </div>
    )
}

export default InventoryButton

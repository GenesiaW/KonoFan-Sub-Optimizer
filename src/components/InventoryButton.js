import Inventory from "./Inventory"
import { Modal, Button,DropdownButton, Dropdown, Container,Row,Col } from "react-bootstrap"
import { useState } from "react"


function InventoryButton({Ownership,ToggleOwned}) {
    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Menu Filter
    const [TempFilter,setFilter] = useState("Select a Filter")
    const FilterList = {
        "Select a Filter": (x => x),
        "Owned": (x => x.owned),
        "Not Owned": (x => !x.owned),
        "4★": (x=> x.rarity === 4),
        "3★": (x=> x.rarity === 3),
        "2★": (x=> x.rarity === 2),
        "1★": (x=> x.rarity === 1),
    }
    const handleFilter = (eventKey) => setFilter(eventKey)
    const NewOwnership = Ownership.filter(FilterList[TempFilter])
    
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
                  <Col align="end">
                    <DropdownButton variant="outline-primary" title={TempFilter} onSelect={handleFilter} align="end">
                      <Dropdown.Item eventKey="Select a Filter">Show All</Dropdown.Item>
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

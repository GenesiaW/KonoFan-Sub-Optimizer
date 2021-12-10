import { useState } from "react";
import Inventory from "./Inventory";
import { Modal,Dropdown,Container,Row,Col,DropdownButton} from "react-bootstrap";

export default function LargeMember({props,setUid,ChosenUid,Header}) {
    const [show, setShow] = useState(false);
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFilter = (eventKey) => setFilter(eventKey)

    const AvailUnits = props.filter(x => x.owned).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    const FilteredUnits = AvailUnits.filter(FilterList[TempFilter]).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    
    const logo = 'https://raw.githubusercontent.com/GenesiaW/KonoFan-Sub-Optimizer/main/src/assets/LargeMember/' + ChosenUid + '.png'
    return (    
        <>  
            <button onClick={handleShow} className="card" style={{width:"100%",height:"100%"}}>
                <img src={logo} alt={ChosenUid} 
                draggable={false}
                style={{width:"100%",height:"100%"}}
                />
            </button>
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
                            <Col><Modal.Title>Select Main Unit</Modal.Title></Col>
                            <Col align="end">
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
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body className="Inventory">
                    <Inventory props={FilteredUnits} setUid={setUid} handleClose={handleClose}/>
                </Modal.Body>
            </Modal>
    </>
    )
}

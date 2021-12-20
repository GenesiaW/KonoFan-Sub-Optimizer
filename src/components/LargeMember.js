import { useState } from "react";
import Inventory from "./Inventory";
import { Modal,Dropdown,Container,Row,Col,DropdownButton} from "react-bootstrap";
import ReactGA from 'react-ga';

export default function LargeMember({props,setUid,ChosenUid,Header}) {
    const [show, setShow] = useState(false);
    const [TempFilter,setFilter] = useState("Select a Filter")
    const [TempSort,setSort] = useState("Sort By")
    const SortList = {
        "Sort By": ((a, b) => a.rarity > b.rarity ? -1 : 1),
        "Rarity Ascending": ((a, b) => a.rarity > b.rarity ? 1 : -1),
        "P.Atk Ascending": ((a, b) => a.patk > b.patk ? 1 : -1),
        "P.Atk Descending": ((a, b) => a.patk > b.patk ? -1 : 1),
        "M.Atk Ascending": ((a, b) => a.matk > b.matk ? 1 : -1),
        "M.Atk Descending": ((a, b) => a.matk > b.matk ? -1 : 1),
    }
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

    const handleClose = () => {ReactGA.pageview("/singleop-to-root");setShow(false);}
    const handleShow = () => {
        ReactGA.modalview("/single-unit-optimize")
        ReactGA.event({category:"User",
        action:"Optimize Single unit"});
        setShow(true);
      }

    const handleFilter = (eventKey) => setFilter(eventKey)
    const handleSort = (eventKey) => setSort(eventKey)

    const AvailUnits = props.filter(x => x.owned).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    const FilteredUnits = AvailUnits.filter(FilterList[TempFilter]).sort(SortList[TempSort])
    
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
                            <DropdownButton variant="outline-primary" title={TempSort} onSelect={handleSort} align="end">
                                <Dropdown.Item eventKey="Sort By">Rarity Descending</Dropdown.Item>
                                <Dropdown.Item eventKey="Rarity Ascending">Rarity Ascending</Dropdown.Item>
                                <Dropdown.Item eventKey="P.Atk Ascending">P.Atk Ascending</Dropdown.Item>
                                <Dropdown.Item eventKey="P.Atk Descending">P.Atk Descending</Dropdown.Item>
                                <Dropdown.Item eventKey="M.Atk Ascending">M.Atk Ascending</Dropdown.Item>
                                <Dropdown.Item eventKey="M.Atk Descending">M.Atk Descending</Dropdown.Item>
                            </DropdownButton>
                            </Col>
                            <Col align="end" style={{maxWidth:"133.3px",marginRight:"20px",marginLeft:"-10px"}}>
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

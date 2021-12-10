import React, {useState, useEffect} from "react";
import Inventory from "./components/Inventory";
import data from "./data/database.json";
import SubOptimizer from "./components/SubOptimizer";
import InventoryImport from "./components/InventoryImport";
import OptimizeTeam from "./components/OptimizeTeam";
import KFAlerts from "./components/KFAlerts";
import {Modal,Container, Button,Navbar, DropdownButton,Dropdown,Row,Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Optimize from "./components/calculations";

const FilteredData = data.filter(x => x.available === true)
const Version = data[data.length-1].version

const LOCAL_STORAGE_KEY = "konofan-optimizer.inv"
const version_key ="konofan-optimizer.version"

function App() {
  //Ownership
  const [Ownership,setOwned] = useState([])

  useEffect(() => {
    const Inv = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const StoredVersion = JSON.parse(localStorage.getItem(version_key))
    setOwned(FilteredData)
    if (Inv && StoredVersion.version === Version){
      setOwned(Inv)
      console.log("Inventory Loaded")
    }
    else if (Inv){
      const FilteredInv = Inv.filter(x => x.owned === false)
      for (let i = 0; i < FilteredInv.length; i++) {
        FilteredData.forEach(element => {
          if (element.uid === FilteredInv[i].uid){
            element.owned = FilteredInv[i].owned
          }
        });  
      }
      setOwned(FilteredData)
      localStorage.setItem(version_key,JSON.stringify({"version":Version}))
      console.log("Version Updated and Inventory updated")
    }
    else{
      setOwned(FilteredData)
      localStorage.setItem(version_key,JSON.stringify({"version":Version}))
      console.log("Fresh Data")
    }
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(Ownership))
    localStorage.setItem(version_key,JSON.stringify({"version":Version}))
  }, [Ownership])

  const ToggleOwned = (uid) => {
    const newOwned = [...Ownership]
    const Ownerships = newOwned.find(Ownership => Ownership.uid === uid)
    Ownerships.owned = !Ownerships.owned
    setOwned(newOwned)
  }
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
  }
  const handleFilter = (eventKey) => setFilter(eventKey)
  // Sub Optimizer
  const [ChosenUid, ChangeUid] = useState(1001100)
  const setUid = (uid) => {
    ChangeUid(uid)
  }
  //Alerts
  const [showAlert, setAlertShow] = useState(false);
  const [AlertText,setAlertText] = useState("This is an Alert");

  const handleAlertShow = () =>setAlertShow(true);
  const handleAlertClose = () =>setAlertShow(false);

  //Optimizer
  const [OptimizedResults,modifyResult] = useState({
    PhyMax:{
        stats:{
            SubOne:{uid:1001100,owned:true},
            SubTwo:{uid:1001100,owned:true}
        }
    },
    EPhyMax:{
        stats:{
            SubOne:{uid:1001100,owned:true},
            SubTwo:{uid:1001100,owned:true}
        }
    },
    MagMax:{
        stats:{
            SubOne:{uid:1001100,owned:true},
            SubTwo:{uid:1001100,owned:true}
        }
    },
    RecMax:{
        stats:{
            SubOne:{uid:1001100,owned:true},
            SubTwo:{uid:1001100,owned:true}
        }
    },
})
  useEffect(() => {
    const FilteredOwnership= Ownership.filter(x=>x.owned)
    if (FilteredOwnership.find(x => x.uid === ChosenUid)){
      modifyResult(Optimize(FilteredOwnership,ChosenUid))
    }
  }, [Ownership,ChosenUid])
  const NewOwnership = Ownership.filter(FilterList[TempFilter])

  return (
    <div className="ContainerWrapper">
        <Container fluid>
          <Row>
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand style={{marginLeft:"0.5rem"}}>KonoFan Sub Optimizer</Navbar.Brand>
                <Col align="end"><OptimizeTeam props={Ownership}/></Col>
                <InventoryImport align="end" props={Ownership} setOwned={setOwned} setAlert={setAlertText} handleAlertShow={handleAlertShow}/>
                <Button align="end" variant="outline-light" onClick={handleShow} style={{marginRight:"0.5rem"}}>Inventory</Button>
        </Navbar>
        </Row>
        <KFAlerts setShow={handleAlertClose} text={AlertText} show={showAlert}/>
        <Row>
        <SubOptimizer props={Ownership} setUid={setUid} ChosenUid={ChosenUid} results={OptimizedResults}>
        </SubOptimizer>
        </Row>
      </Container>
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
                    <DropdownButton variant="outline-primary" title={TempFilter} onSelect={handleFilter}>
                      <Dropdown.Item eventKey="Select a Filter">Show All</Dropdown.Item>
                      <Dropdown.Item eventKey="Owned">Owned</Dropdown.Item>
                      <Dropdown.Item eventKey="Not Owned">Not Owned</Dropdown.Item> 
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
    );
}

export default App;

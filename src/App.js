import React, {useState, useEffect} from "react";
import InventoryButton from "./components/InventoryButton";
import data from "./data/database.json";
import SubOptimizer from "./components/SubOptimizer";
import InventoryImport from "./components/InventoryImport";
// import ExportInventory from "./components/ExportInventory";
import OptimizeTeam from "./components/OptimizeTeam";
import Changelogs from "./components/Changelogs";
import KFAlerts from "./components/KFAlerts";
import {Container, Navbar, Row,Dropdown,DropdownButton, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Optimize from "./components/calculations";

const FilteredData = data.filter(x => x.available === true)
const Version = data.pop().version

const LOCAL_STORAGE_KEY = "konofan-optimizer.inv"
const version_key ="konofan-optimizer.version"

function App() {
  //Ownership
  const [Ownership,setOwned] = useState([])

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
      PhyMax:[{
          stats:{
              SubOne:{uid:1001100,owned:true},
              SubTwo:{uid:1001100,owned:true}
          }
      }],
      EPhyMax:[{
          stats:{
              SubOne:{uid:1001100,owned:true},
              SubTwo:{uid:1001100,owned:true}
          }
      }],
      MagMax:[{
          stats:{
              SubOne:{uid:1001100,owned:true},
              SubTwo:{uid:1001100,owned:true}
          }
      }],
      RecMax:[{
          stats:{
              SubOne:{uid:1001100,owned:true},
              SubTwo:{uid:1001100,owned:true}
          }
      }],
  })
    useEffect(() => {
      const FilteredOwnership= Ownership.filter(x=>x.owned)
      if (FilteredOwnership.find(x => x.uid === ChosenUid)){
        modifyResult(Optimize(FilteredOwnership,ChosenUid))
      }
    }, [Ownership,ChosenUid])
    //Import Inventory Helper
    const [showImpInv, setShowImpInv] = useState(false);
  
    const handleCloseImpInv = () => setShowImpInv(false);
    const handleShowImpInv = () => setShowImpInv(true);
    //Optimize Team Helper
    const [showOpTeam, setShowOpTeam] = useState(false);
  
    const handleCloseOpTeam = () => setShowOpTeam(false);
    const handleShowOpTeam = () => setShowOpTeam(true);
  
    //Changelogs Helper
    const [showCL, setShowCL] = useState(false);
  
    const handleCloseCL= () => setShowCL(false);
    const handleShowCL = () => setShowCL(true);

    //Export Inventory Helper
    // const [showEI, setShowEI] = useState(false);
  
    // const handleCloseEI= () => setShowEI(false);
    // const handleShowEI = () => setShowEI(true);

    const FuncHelper = {
      "ImpInv":handleShowImpInv,
      "OpTeam":handleShowOpTeam,
      "CL":handleShowCL,
      // "EI":handleShowEI,
    }
  
    const HandleFuncHelper = (eventKey) => {
      FuncHelper[eventKey]()
    } 

  useEffect(() => {
    const Inv = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const StoredVersion = JSON.parse(localStorage.getItem(version_key))
    setOwned(FilteredData)
    if (Inv && StoredVersion.version === Version){
      setOwned(Inv)
      console.log("Inventory Loaded!")
      setAlertText("Inventory Loaded!")
      handleAlertShow()
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
      console.log("Inventory updated with latest units")
      handleShowCL()
      setAlertText("Inventory updated with latest units")
      handleAlertShow()
    }
    else{
      setOwned(FilteredData)
      localStorage.setItem(version_key,JSON.stringify({"version":Version}))
      console.log("Inventory Initialized.")
      setAlertText("Inventory Initialized.")
      handleAlertShow()
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

  return (
    <div className="ContainerWrapper">
        <Container fluid>
          <Row>
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand style={{marginLeft:"0.5rem"}}>KonoFan Sub Optimizer</Navbar.Brand>
                <Col align="end">
                <DropdownButton variant="outline-light" title="More" onSelect={HandleFuncHelper} align="end" style={{marginRight:"10px"}}>
                  <Dropdown.Item eventKey="OpTeam">Optimize Team</Dropdown.Item>
                  {/* <Dropdown.Item eventKey="EI">Import/Export Inventory</Dropdown.Item> */}
                  <Dropdown.Item eventKey="ImpInv">Import Inventory (Sheets)</Dropdown.Item>
                  <Dropdown.Item eventKey="CL">Changelog</Dropdown.Item>
                </DropdownButton>
                </Col>
                <InventoryImport props={Ownership} setOwned={setOwned} setAlert={setAlertText} handleAlertShow={handleAlertShow} show={showImpInv} handleClose={handleCloseImpInv}/>
                <Changelogs show={showCL} handleClose={handleCloseCL} />
                <OptimizeTeam props={Ownership} show={showOpTeam} handleClose={handleCloseOpTeam}/>
                {/* <ExportInventory show={showEI} handleClose={handleCloseEI} setOwned={setOwned} Ownership={Ownership} handleAlertShow={handleAlertShow} setAlertText={setAlertText}/> */}
                <InventoryButton Ownership={Ownership} ToggleOwned={ToggleOwned}/>
        </Navbar>
        </Row>
        <KFAlerts setShow={handleAlertClose} text={AlertText} show={showAlert}/>
        <Row>
        <SubOptimizer props={Ownership} setUid={setUid} ChosenUid={ChosenUid} results={OptimizedResults}>
        </SubOptimizer>
        </Row>
      </Container>
    </div>
    );
}

export default App;

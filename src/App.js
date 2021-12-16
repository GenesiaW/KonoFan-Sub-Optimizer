import React, {useState, useEffect} from "react";
import ReactGA from 'react-ga';
import InventoryButton from "./components/InventoryButton";
import data from "./data/database.json";
import SubOptimizer from "./components/SubOptimizer";
import InventoryImport from "./components/InventoryImport";
import OptimizeTeam from "./components/OptimizeTeam";
import OptimizeTeamFast from "./components/OptimizeTeamFast";
import Changelogs from "./components/Changelogs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import KFAlerts from "./components/KFAlerts";
import Settings from "./components/Settings";
import {Container, Navbar, Row,Dropdown,DropdownButton, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Optimize from "./components/calculations";

const FilteredData = data.filter(x => x.available === true)
const Version = data.pop().version

const LOCAL_STORAGE_KEY = "konofan-optimizer.inv"
const version_key ="konofan-optimizer.version"

function App() {
  ReactGA.initialize('UA-215563439-1',{debug:true});

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

  //Megumin Ulti
  const [MeguminSuper, setMeguminSuper] = useState(false)

  const handleMeguminSuper = () => {setMeguminSuper(!MeguminSuper)}

  useEffect(() => {
    const FilteredOwnership= Ownership.filter(x=>x.owned)
    if (FilteredOwnership.find(x => x.uid === ChosenUid)){
      modifyResult(Optimize(FilteredOwnership,ChosenUid,MeguminSuper))
    }
  }, [Ownership,ChosenUid,MeguminSuper])
  //Import Inventory Helper
  const [showImpInv, setShowImpInv] = useState(false);

  const handleCloseImpInv = () => {ReactGA.pageview("/");setShowImpInv(false);}
  const handleShowImpInv = () => {ReactGA.modalview("/import-inventory");;setShowImpInv(true);}
  //Optimize Team Helper
  const [showOpTeam, setShowOpTeam] = useState(false);

  const handleCloseOpTeam = () => {ReactGA.pageview("/");setShowOpTeam(false);}
  const handleShowOpTeam = () => {ReactGA.modalview("/optimize-team");setShowOpTeam(true);}

  //Optimize Team Helper
  const [showOpTeamFast, setShowOpTeamFast] = useState(false);

  const handleCloseOpTeamFast = () => {ReactGA.pageview("/");setShowOpTeamFast(false);}
  const handleShowOpTeamFast = () => {ReactGA.modalview("/optimize-team-fast");setShowOpTeamFast(true);}

  //Changelogs Helper
  const [showCL, setShowCL] = useState(false);

  const handleCloseCL= () => {ReactGA.pageview("/");setShowCL(false);}
  const handleShowCL = () => {ReactGA.modalview("/changelog");setShowCL(true);}
  
  //Privacy Policy Helper
  const [showPP, setShowPP] = useState(false);

  const handleClosePP= () => {ReactGA.pageview("/");setShowPP(false);}
  const handleShowPP = () => {ReactGA.modalview("/privacy-policy");setShowPP(true);}

  //Settings Helper
  const [showSettings, setShowSettings] = useState(false);

  const handleCloseSettings= () => {ReactGA.pageview("/");setShowSettings(false);}
  const handleShowSettings = () => {ReactGA.modalview("/settings");setShowSettings(true);}

  const FuncHelper = {
    "ImpInv":handleShowImpInv,
    "OpTeam":handleShowOpTeam,
    "OpTeamFast":handleShowOpTeamFast,
    "CL":handleShowCL,
    "settings":handleShowSettings,
    "PP":handleShowPP,
    "null":console.log
  }

  const HandleFuncHelper = (eventKey) => {
    const AnalyticsHelper ={
      "ImpInv":"Import Inventory",
      "OpTeam": "Optimize Team (Slow)",
      "OpTeamFast":"Optimize Team (Fast)",
      "CL":"Changelog",
      "PP":"Privacy Policy",
      "settings":"Settings",
      "null":"Guide"
    }
    ReactGA.event({
      category:"User",
      action:AnalyticsHelper[eventKey]
    })
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
      handleShowPP()
      handleAlertShow()
    }
    ReactGA.pageview('/');
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
            <Navbar.Brand style={{marginLeft:"0.5rem"}}>{"KonoFan Sub Optimizer Ver. "+ Version}</Navbar.Brand>
                <Col align="end">
                <DropdownButton variant="outline-light" title="More" onSelect={HandleFuncHelper} align="end" style={{marginRight:"10px"}}>
                <Dropdown.Item eventKey="OpTeamFast">Optimize Team</Dropdown.Item>
                  <Dropdown.Item eventKey="OpTeam">Optimize Team (Slow)</Dropdown.Item>
                  <Dropdown.Item eventKey="ImpInv">Import/Export Inventory</Dropdown.Item>
                  <Dropdown.Item eventKey="null" href={"https://github.com/GenesiaW/KonoFan-Sub-Optimizer/wiki"} target="_blank" rel="noopener noreferrer" onClick={() => ReactGA.pageview("/guide")}>Guide</Dropdown.Item>
                  <Dropdown.Item eventKey="settings">Settings</Dropdown.Item>
                  <Dropdown.Item eventKey="CL">Changelog</Dropdown.Item>
                  <Dropdown.Item eventKey="PP">Privacy Policy</Dropdown.Item>
                </DropdownButton>
                </Col>
                <InventoryImport props={Ownership} setOwned={setOwned} setAlert={setAlertText} handleAlertShow={handleAlertShow} show={showImpInv} handleClose={handleCloseImpInv}/>
                <Changelogs show={showCL} handleClose={handleCloseCL} />
                <PrivacyPolicy show={showPP} handleClose={handleClosePP} />
                <OptimizeTeam props={Ownership} show={showOpTeam} handleClose={handleCloseOpTeam} MeguminSuper={MeguminSuper}/>
                <OptimizeTeamFast props={Ownership} show={showOpTeamFast} handleClose={handleCloseOpTeamFast}  MeguminSuper={MeguminSuper}/>
                <Settings show={showSettings} handleClose={handleCloseSettings} handleMeguminSuper={handleMeguminSuper} MeguminSuper={MeguminSuper}/>
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

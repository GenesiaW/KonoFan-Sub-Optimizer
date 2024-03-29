import React, {useState, useEffect} from "react";
import ReactGA from 'react-ga';
import InventoryButton from "./components/InventoryButton";
import data from "./data/database.json";
import data_jp from "./data/database_jp.json";
import SubOptimizer from "./components/SubOptimizer";
import InventoryImport from "./components/InventoryImport";
// import OptimizeTeam from "./components/OptimizeTeam";
import OptimizeTeamFast from "./components/OptimizeTeamFast";
import Changelogs from "./components/Changelogs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import KFAlerts from "./components/KFAlerts";
import Settings from "./components/Settings";
import CookieConsent, {getCookieConsentValue,Cookies} from "react-cookie-consent";
import TeamBuilder from "./components/TeamBuilder";
import UnitExclusionModule from "./components/UnitExclusionModule";
import {Container, Navbar, Row,Dropdown,DropdownButton, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Optimize from "./components/calculations";

const FilteredData = data.filter(x => x.available === true)
const Version = data.pop().version
const FilteredData_jp = data_jp.filter(x => x.available === true)
const Version_jp = "JP Mode"


const LOCAL_STORAGE_KEY = "konofan-optimizer.inv"
const version_key ="konofan-optimizer.version"
const Region_Switch ="konofan-optimizer.rs"

function App() {
  const [RegionSwitch,setRegionSwitch] = useState(false)
  const handleRegionSwitch = () =>{
    localStorage.setItem(Region_Switch,!RegionSwitch)
    setRegionSwitch(!RegionSwitch)
    window.location.reload(false)
  }
  const handleAcceptCookie = () => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
  };

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  //Ownership
  const [Ownership,setOwned] = useState([])

  //Unit Exclusions
  const [UnitExclusionProps,setUnitExclusion]=useState([])
  const [ExclusionList,setExclusionList] = useState([])

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

  //Megumin Ult
  const [MeguminSuper, setMeguminSuper] = useState(false)

  const handleMeguminSuper = () => {setMeguminSuper(!MeguminSuper)}

  //All Units Ult
  const [OpUlt,setOpUlt] = useState({    
    available:false,
    version:1,  
  })

  const handleUltVersion = () => {
    const newOpUlt = {...OpUlt}
    const VersionHelper = {
      1:2,
      2:1
    }
    newOpUlt.version = VersionHelper[OpUlt.version]
    setOpUlt(newOpUlt)
  }
  const handleOpUlt = () => {
    const newOpUlt = {...OpUlt}
    newOpUlt.available = !OpUlt.available
    setOpUlt(newOpUlt)
  }

  useEffect(() => {
    const FilteredOwnership= Ownership.filter(x=>x.owned).filter(x=>!ExclusionList.includes(x.uid))
    if (FilteredOwnership.find(x => x.uid === ChosenUid)){
      modifyResult(Optimize(FilteredOwnership,ChosenUid,MeguminSuper,OpUlt))
    }
  }, [Ownership,ChosenUid,MeguminSuper,OpUlt,ExclusionList])
  //Import Inventory Helper
  const [showImpInv, setShowImpInv] = useState(false);

  const handleCloseImpInv = () => {ReactGA.pageview("/import-to-root");setShowImpInv(false);}
  const handleShowImpInv = () => {ReactGA.modalview("/import-inventory");setShowImpInv(true);}
  //Optimize Team Helper
  // const [showOpTeam, setShowOpTeam] = useState(false);

  // const handleCloseOpTeam = () => {ReactGA.pageview("/opteam-to-root");setShowOpTeam(false);}
  // const handleShowOpTeam = () => {ReactGA.modalview("/optimize-team");setShowOpTeam(true);}

  //Optimize Team Helper
  const [showOpTeamFast, setShowOpTeamFast] = useState(false);

  const handleCloseOpTeamFast = () => {ReactGA.pageview("/opteamfast-to-root");setShowOpTeamFast(false);}
  const handleShowOpTeamFast = () => {ReactGA.modalview("/optimize-team-fast");setShowOpTeamFast(true);}

  //Changelogs Helper
  const [showCL, setShowCL] = useState(false);

  const handleCloseCL= () => {ReactGA.pageview("/changelog-to-root");setShowCL(false);}
  const handleShowCL = () => {ReactGA.modalview("/changelog");setShowCL(true);}
  
  //Privacy Policy Helper
  const [showPP, setShowPP] = useState(false);

  const handleClosePP= () => {ReactGA.pageview("/pp-to-root");setShowPP(false);}
  const handleShowPP = () => {ReactGA.modalview("/privacy-policy");setShowPP(true);}

  //Settings Helper
  const [showSettings, setShowSettings] = useState(false);

  const handleCloseSettings= () => {ReactGA.pageview("/settings-to-root");setShowSettings(false);}
  const handleShowSettings = () => {ReactGA.modalview("/settings");setShowSettings(true);}

    //TeamBuilder Helper
    const [showTeamBuilder, setShowTeamBuilder] = useState(false);
    const [count, setCount] = useState(0);

    const handleCloseTeamBuilder= () => {ReactGA.pageview("/teambuilder-to-root");setShowTeamBuilder(false);}
    const handleShowTeamBuilder = () => {ReactGA.modalview("/teambuilder");setShowTeamBuilder(true);setCount(1);}

  const FuncHelper = {
    "ImpInv":handleShowImpInv,
    // "OpTeam":handleShowOpTeam,
    "OpTeamFast":handleShowOpTeamFast,
    "CL":handleShowCL,
    "settings":handleShowSettings,
    "PP":handleShowPP,
    "TeamBuilder":handleShowTeamBuilder,
    "Guide":console.log,
    "Contact":console.log,
    "Arena Stats":console.log,
  }

  const HandleFuncHelper = (eventKey) => {
    const AnalyticsHelper ={
      "ImpInv":"Import Inventory",
      "OpTeam": "Optimize Team (Slow)",
      "OpTeamFast":"Optimize Team (Fast)",
      "CL":"Changelog",
      "PP":"Privacy Policy",
      "settings":"Settings",
      "Guide":"Guide",
      "Contact":"Contact",
      "TeamBuilder":"TeamBuilder",
      "Arena Stats":"Arena Stats"
    }
    ReactGA.event({
      category:"User",
      action:AnalyticsHelper[eventKey]
    })
    FuncHelper[eventKey]()
  } 
  useEffect(() =>{
    let temp = JSON.stringify([...Ownership])
    setUnitExclusion(JSON.parse(temp).filter(x=> x.owned))
    setExclusionList([])
  },[Ownership])

  useEffect(() => {
    if (getCookieConsentValue() === "true") {
      handleAcceptCookie();
    }
    else if (getCookieConsentValue() === "false"){
    }
    else{
      console.log("Please Accept or Decline the use of cookies")
      handleAcceptCookie();
    }
    const Inv = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const StoredVersion = JSON.parse(localStorage.getItem(version_key))
    const CurrentRegion = JSON.parse(localStorage.getItem(Region_Switch))
    setRegionSwitch(CurrentRegion)
    setOwned(FilteredData)
    if (CurrentRegion){
      if (Inv.length === FilteredData_jp.length){
        setOwned(Inv)
        console.log("Inventory Loaded!")
        setAlertText("Inventory Loaded!")
        localStorage.setItem(Region_Switch,true)
        handleAlertShow()
      }
      else{
        setOwned(FilteredData_jp)
        localStorage.setItem(Region_Switch,true)
        console.log("Inventory Initialized.")
        setAlertText("Inventory Initialized.")
        handleShowPP()
        handleAlertShow()
      }
    }
    else{
      if (Inv && StoredVersion.version === Version && Inv.length=== FilteredData.length){
        setOwned(Inv)
        console.log("Inventory Loaded!")
        setAlertText("Inventory Loaded!")
        localStorage.setItem(Region_Switch,false)
        handleAlertShow()
      }
      else if (Inv){
        const FilteredInv = Inv.filter(x => x.owned === true)
        let FilteredOwnedList = []
        FilteredInv.forEach(element => {
          FilteredOwnedList.push(element.uid)
        });
        FilteredData.forEach(element => {
          if (FilteredOwnedList.includes(element.uid)){
            element.owned = true
          }
          else{
            element.owned = false
          }
        });
        setOwned(FilteredData)
        localStorage.setItem(version_key,JSON.stringify({"version":Version}))
        console.log("Inventory updated with latest units")
        handleShowCL()
        setAlertText("Inventory updated with latest units")
        localStorage.setItem(Region_Switch,false)
        handleAlertShow()
      }
      else{
        setOwned(FilteredData)
        localStorage.setItem(version_key,JSON.stringify({"version":Version}))
        console.log("Inventory Initialized.")
        setAlertText("Inventory Initialized.")
        localStorage.setItem(Region_Switch,false)
        handleShowPP()
        handleAlertShow()
      }
    }
    ReactGA.pageview('/');
  }
  ,[])

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

  const ToggleExclusion = (uid) => {
    const newExclusion = [...UnitExclusionProps]
    const newExclusionList = [...ExclusionList]
    const Exclusions = newExclusion.find(UnitExclusionProps => UnitExclusionProps.uid === uid)
    Exclusions.owned = !Exclusions.owned
    setUnitExclusion(newExclusion)
    if (ExclusionList.includes(uid)){
      newExclusionList.splice(newExclusionList.findIndex(element => element = uid),1)
      setExclusionList(newExclusionList)
    }
    else{
      newExclusionList.push(uid)
      setExclusionList(newExclusionList)
    }
  }
  let Version_String = Version
  if (RegionSwitch){
    Version_String=Version_jp
  }
  else{
    Version_String = Version
  }
  return (
    <div className="ContainerWrapper"> 
            <CookieConsent location="bottom" buttonText="Accept" declineButtonText="Decline" enableDeclineButton onAccept={handleAcceptCookie} onDecline={handleDeclineCookie}
             >This website uses cookies to enhance the user experience. Press decline to opt out of data collection.</CookieConsent>
        <Container fluid>
          <Row>
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand style={{marginLeft:"0.5rem"}}>{"KonoFan Sub Optimizer Ver. "+ Version_String}</Navbar.Brand>
                <Col align="end">
                <DropdownButton variant="outline-light" title="More" onSelect={HandleFuncHelper} align="end" style={{marginRight:"10px"}}>
                <Dropdown.Item eventKey="OpTeamFast">Optimize Team</Dropdown.Item>
                  {/* <Dropdown.Item eventKey="OpTeam">Optimize Team (Slow)</Dropdown.Item> */}
                  <Dropdown.Item eventKey="TeamBuilder">Team Builder</Dropdown.Item>
                  <Dropdown.Item eventKey="ImpInv">Import/Export Inventory</Dropdown.Item>
                  {/* <Dropdown.Item eventKey="Arena Stats" href={"https://github.com/GenesiaW/KonoFan-Sub-Optimizer/wiki/Arena-Stats"} target="_blank" rel="noopener noreferrer" onClick={() => ReactGA.pageview("/arena-stats")}>Arena Stats</Dropdown.Item> */}
                  <Dropdown.Item eventKey="Guide" href={"https://github.com/GenesiaW/KonoFan-Sub-Optimizer/wiki"} target="_blank" rel="noopener noreferrer" onClick={() => ReactGA.pageview("/guide")}>Guide</Dropdown.Item>
                  <Dropdown.Item eventKey="settings">Settings</Dropdown.Item>
                  {/* <Dropdown.Item eventKey="Contact" href={"https://forms.gle/BHmaZJk7UD3rdsbd7"} target="_blank" rel="noopener noreferrer" onClick={() => ReactGA.pageview("/contact")}>Contact</Dropdown.Item> */}
                  <Dropdown.Item eventKey="CL">Changelog</Dropdown.Item>
                  <Dropdown.Item eventKey="PP">Privacy Policy</Dropdown.Item>
                </DropdownButton>
                </Col>
                <InventoryImport props={Ownership} setOwned={setOwned} setAlert={setAlertText} handleAlertShow={handleAlertShow} show={showImpInv} handleClose={handleCloseImpInv}/>
                <Changelogs show={showCL} handleClose={handleCloseCL} />
                <PrivacyPolicy show={showPP} handleClose={handleClosePP} />
                {/* <OptimizeTeam props={Ownership} show={showOpTeam} handleClose={handleCloseOpTeam} MeguminSuper={MeguminSuper} OpUlt={OpUlt}/> */}
                <OptimizeTeamFast props={Ownership} show={showOpTeamFast} handleClose={handleCloseOpTeamFast}  MeguminSuper={MeguminSuper} OpUlt={OpUlt}/>
                <Settings show={showSettings} handleClose={handleCloseSettings} 
                handleMeguminSuper={handleMeguminSuper} MeguminSuper={MeguminSuper} 
                OpUlt={OpUlt} handleUltVersion={handleUltVersion} handleOpUlt={handleOpUlt} onAccept={handleAcceptCookie} onDecline={handleDeclineCookie}
                RegionSwitch={RegionSwitch} handleRegionSwitch={handleRegionSwitch}/>
                <TeamBuilder props={Ownership} show={showTeamBuilder} handleClose={handleCloseTeamBuilder} count={count} setCount={setCount}/>
                <UnitExclusionModule UnitExclusionProps={UnitExclusionProps} ToggleExclusion={ToggleExclusion} setExclusionList={setExclusionList} ExclusionList={ExclusionList} setUnitExclusion={setUnitExclusion}/>
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

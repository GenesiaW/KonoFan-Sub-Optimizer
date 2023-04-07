import { Modal,Table,Dropdown,DropdownButton,Container,Row,Col} from "react-bootstrap"
import Inventory from "./Inventory"
import { CalculateDamage } from "./calculations"
import UnitButton from "./UnitButton"
import { useState,useEffect } from "react"

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
    198:"Rudeus",
    199:"Roxy",
    200:"Eris",
    181:"Funifura Dodonko",
    126:"Claire"
  }
  

function TeamBuilder({props,show,handleClose,count,setCount}) {
    const AvailUnits = props.filter(x => x.owned)
    const [TempFilter,setFilter] = useState("Select a Filter")
    const [TempSort,setSort] = useState("Sort By")
    const [InputFieldValue, SetInputFieldValue] = useState()
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
    const SortList = {
        "Sort By": ((a, b) => a.rarity > b.rarity ? -1 : 1),
        "Rarity Ascending": ((a, b) => a.rarity > b.rarity ? 1 : -1),
        "P.Atk Ascending": ((a, b) => a.patk > b.patk ? 1 : -1),
        "P.Atk Descending": ((a, b) => a.patk > b.patk ? -1 : 1),
        "M.Atk Ascending": ((a, b) => a.matk > b.matk ? 1 : -1),
        "M.Atk Descending": ((a, b) => a.matk > b.matk ? -1 : 1),
    }
    const handleSort = (eventKey) => setSort(eventKey)
    const handleFilter = (eventKey) => setFilter(eventKey)
    const [invHelper,setInvHelper] = useState({
        show:false,
        unitChange:"UnitOne",
        position:"Main"
    })
    const [CalMethod,setCalMethod] = useState({
        UnitOne:{
            available:false,
            version:1,  
        },
        UnitTwo:{
            available:false,
            version:1,  
        },
        UnitThree:{
            available:false,
            version:1,  
        },
        UnitFour:{
            available:false,
            version:1,  
        },
        UnitFive:{
            available:false,
            version:1,  
        }
    })
    const [CalSelector,setCalSelector] = useState({
        UnitOne:"Skill 1/2",
        UnitTwo:"Skill 1/2",
        UnitThree:"Skill 1/2",
        UnitFour:"Skill 1/2",
        UnitFive:"Skill 1/2",
    })
    const [Units,setUnits] = useState({
        UnitOne:{
            Main:1001100,
            SubOne:1001100,
            SubTwo:1001100,
        },
        UnitTwo:{
            Main:1001100,
            SubOne:1001100,
            SubTwo:1001100,
        },
        UnitThree:{
            Main:1001100,
            SubOne:1001100,
            SubTwo:1001100,
        },
        UnitFour:{
            Main:1001100,
            SubOne:1001100,
            SubTwo:1001100,
        },
        UnitFive:{
            Main:1001100,
            SubOne:1001100,
            SubTwo:1001100,
        },
    }) 
    const [Results,setResult] = useState({
        UnitOne:{
            stats:{
                Main:{
                    display_trait:"NA",
                    agi:0,
                    dex:0,
                    luk:0
                },
                SubOne:{
                    display_trait:"NA"
                },
                SubTwo:{
                    display_trait:"NA"
                },
                hp:0,
                patk:0,
                matk:0,
                pdef:0,
                mdef:0,
            }
        },
        UnitTwo:{
            stats:{
                Main:{
                    display_trait:"NA",
                    agi:0,
                    dex:0,
                    luk:0
                },
                SubOne:{
                    display_trait:"NA"
                },
                SubTwo:{
                    display_trait:"NA"
                },
                hp:0,
                patk:0,
                matk:0,
                pdef:0,
                mdef:0,
            }
        },
        UnitThree:{
            stats:{
                Main:{
                    display_trait:"NA",
                    agi:0,
                    dex:0,
                    luk:0
                },
                SubOne:{
                    display_trait:"NA"
                },
                SubTwo:{
                    display_trait:"NA"
                },
                hp:0,
                patk:0,
                matk:0,
                pdef:0,
                mdef:0,
            }
        },
        UnitFour:{
            stats:{
                Main:{
                    display_trait:"NA",
                    agi:0,
                    dex:0,
                    luk:0
                },
                SubOne:{
                    display_trait:"NA"
                },
                SubTwo:{
                    display_trait:"NA"
                },
                hp:0,
                patk:0,
                matk:0,
                pdef:0,
                mdef:0,
            }
        },
        UnitFive:{
            stats:{
                Main:{
                    display_trait:"NA",
                    agi:0,
                    dex:0,
                    luk:0
                },
                SubOne:{
                    display_trait:"NA"
                },
                SubTwo:{
                    display_trait:"NA"
                },
                hp:0,
                patk:0,
                matk:0,
                pdef:0,
                mdef:0,
            }
        },
    })
    useEffect(() => {
        if (count){
            let newResults = {...Results}
            newResults["UnitOne"] = CalculateDamage(AvailUnits,Units.UnitOne.Main,Units.UnitOne.SubOne,Units.UnitOne.SubTwo,false,CalMethod.UnitOne)
            newResults["UnitTwo"] = CalculateDamage(AvailUnits,Units.UnitTwo.Main,Units.UnitTwo.SubOne,Units.UnitTwo.SubTwo,false,CalMethod.UnitTwo)
            newResults["UnitThree"] = CalculateDamage(AvailUnits,Units.UnitThree.Main,Units.UnitThree.SubOne,Units.UnitThree.SubTwo,false,CalMethod.UnitThree)
            newResults["UnitFour"] = CalculateDamage(AvailUnits,Units.UnitFour.Main,Units.UnitFour.SubOne,Units.UnitFour.SubTwo,false,CalMethod.UnitFour)
            newResults["UnitFive"] = CalculateDamage(AvailUnits,Units.UnitFive.Main,Units.UnitFive.SubOne,Units.UnitFive.SubTwo,false,CalMethod.UnitFive)
            setResult(newResults)
            setCount(0)
        }
    }, [AvailUnits,props,CalMethod,Units,count,Results,setCount])
    const handleOpVer = (unitnumber) => {
        const newCalMethod = {...CalMethod}
        newCalMethod[unitnumber].available = true
        newCalMethod[unitnumber].version = 2
        setCalMethod(newCalMethod)
        setCount(1)
    }
    const handleOpS = (unitnumber) => {
        const newCalMethod = {...CalMethod}
        newCalMethod[unitnumber].available = true
        newCalMethod[unitnumber].version = 1
        setCalMethod(newCalMethod)
        setCount(1)
    }
    const handleOp = (unitnumber) => {
        const newCalMethod = {...CalMethod}
        newCalMethod[unitnumber].available = false
        newCalMethod[unitnumber].version = 1
        setCalMethod(newCalMethod)
        setCount(1)
    }
    const HandleFuncHelper = (eventKey) => {
        let newCalSelector ={...CalSelector}
        const TitleHelepr = {
            "Opp":"Skill 1/2",
            "Ops":"Super V1",
            "Ver":"Super V2",
        }
        const functionUse = {
            "Opp":handleOp,
            "Ops":handleOpS,
            "Ver":handleOpVer,
        } 
        const UnitNumber = {
            "UOne":"UnitOne",
            "UTwo":"UnitTwo",
            "UThree":"UnitThree",
            "UFour":"UnitFour",
            "UFive":"UnitFive",
        }
        let tempArray = eventKey.split(" ")
        functionUse[tempArray[0]](UnitNumber[tempArray[1]])
        newCalSelector[UnitNumber[tempArray[1]]] = TitleHelepr[tempArray[0]] 
        setCalSelector(newCalSelector)
    }
    const OpenInv = (event) => {
        const positionHelper ={
            "M":"Main",
            "O":"SubOne",
            "T":"SubTwo"
        }
        SetInputFieldValue();
        const newinvHelper = {...invHelper}
        let UnitChange = event.target.id.slice(0,event.target.id.length-1)
        let position = event.target.id[event.target.id.length-1]
        newinvHelper["unitChange"] = UnitChange
        newinvHelper["position"] = positionHelper[position]
        setInvHelper(newinvHelper)
        newinvHelper.show = true
        setInvHelper(newinvHelper)
    }
    const UnitChange = (uid) => {
        const newUnits = {...Units}
        const newinvHelper = {...invHelper}
        newUnits[invHelper.unitChange][[invHelper.position]] = uid
        setUnits(newUnits)
        newinvHelper.show = false
        setInvHelper(newinvHelper)
        setCount(1)
    }

    const handleCloseF = () => {
        const newinvHelper = {...invHelper}
        newinvHelper.show = false
        setInvHelper(newinvHelper)
        handleClose()
    }

    const getFilteredResults = (FilteredUnits,InputFieldValue) => {
        if (InputFieldValue){
            return FilteredUnits.filter(x=> (class_map[Math.floor(x.uid/10000)]).toLowerCase().includes(InputFieldValue) || (x.display_trait).toLowerCase().includes(InputFieldValue));
        }
        else{
            return FilteredUnits
        }
    }

    const FilteredUnits = getFilteredResults(AvailUnits,InputFieldValue).filter(FilterList[TempFilter]).sort(SortList[TempSort])
    return (
        <div>
            <Modal 
            show={show} 
            onHide={handleCloseF} 
            animation={false} 
            scrollable={true} 
            fullscreen
            dialogClassName="modal-TB">
            <Modal.Header closeButton>
                {invHelper.show?               
                    <Container fluid>
                    <Row>
                        <Col><Modal.Title>Team Builder: Select Unit</Modal.Title></Col>
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
                :<Modal.Title>Team Builder</Modal.Title>
                }
          </Modal.Header>
            <Modal.Body>
                {invHelper.show? <Inventory props={FilteredUnits} UnitChange={UnitChange}/>:
                    <Table striped borderless bordered size="sm" style={{textAlign:"center"}}>
                    <tbody>
                        <tr>
                            <td>Main </td>                        
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitOne.Main)} onClick={OpenInv} id="UnitOneM"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitTwo.Main)} onClick={OpenInv} id="UnitTwoM"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitThree.Main)} onClick={OpenInv} id="UnitThreeM"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitFour.Main)} onClick={OpenInv} id="UnitFourM"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitFive.Main)} onClick={OpenInv} id="UnitFiveM"/>
                            </td> 
                        </tr>
                        <tr>       
                            <td>Traits </td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Results.UnitOne.stats.Main.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Results.UnitTwo.stats.Main.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Results.UnitThree.stats.Main.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Results.UnitFour.stats.Main.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Results.UnitFive.stats.Main.display_trait:"NA"}
                            </td> 
                        </tr>
                        <tr>
                            <td>Sub 1 </td>                        
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitOne.SubOne)} onClick={OpenInv} id="UnitOneO"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitTwo.SubOne)} onClick={OpenInv} id="UnitTwoO"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitThree.SubOne)} onClick={OpenInv} id="UnitThreeO"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitFour.SubOne)} onClick={OpenInv} id="UnitFourO"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitFive.SubOne)} onClick={OpenInv} id="UnitFiveO"/>
                            </td> 
                        </tr>
                        <tr>       
                            <td>Traits </td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Results.UnitOne.stats.SubOne.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Results.UnitTwo.stats.SubOne.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Results.UnitThree.stats.SubOne.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Results.UnitFour.stats.SubOne.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Results.UnitFive.stats.SubOne.display_trait:"NA"}
                            </td> 
                        </tr>
                        <tr>
                            <td>Sub 2 </td>                        
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitOne.SubTwo)} onClick={OpenInv} id="UnitOneT"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitTwo.SubTwo)} onClick={OpenInv} id="UnitTwoT"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitThree.SubTwo)} onClick={OpenInv} id="UnitThreeT"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitFour.SubTwo)} onClick={OpenInv} id="UnitFourT"/>
                            </td>
                            <td>
                                <UnitButton props={AvailUnits.find(x=> x.uid === Units.UnitFive.SubTwo)} onClick={OpenInv} id="UnitFiveT"/>
                            </td> 
                        </tr>
                        <tr>       
                            <td>Traits </td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Results.UnitOne.stats.SubTwo.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Results.UnitTwo.stats.SubTwo.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Results.UnitThree.stats.SubTwo.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Results.UnitFour.stats.SubTwo.display_trait:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Results.UnitFive.stats.SubTwo.display_trait:"NA"}
                            </td> 
                        </tr>
                        <tr>
                            <td>Calculate By</td>
                            <td>
                                <DropdownButton variant="outline-primary" title={CalSelector["UnitOne"]} onSelect={HandleFuncHelper}>
                                    <Dropdown.Item eventKey="Opp UOne">Skill 1/2</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ops UOne">Super V1</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ver UOne">Super V2</Dropdown.Item>
                                </DropdownButton>
                            </td>
                            <td>
                                <DropdownButton variant="outline-primary" title={CalSelector["UnitTwo"]} onSelect={HandleFuncHelper}>
                                    <Dropdown.Item eventKey="Opp UTwo">Skill 1/2</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ops UTwo">Super V1</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ver UTwo">Super V2</Dropdown.Item>
                                </DropdownButton>
                            </td>
                            <td>
                                <DropdownButton variant="outline-primary" title={CalSelector["UnitThree"]} onSelect={HandleFuncHelper}>
                                    <Dropdown.Item eventKey="Opp UThree">Skill 1/2</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ops UThree">Super V1</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ver UThree">Super V2</Dropdown.Item>
                                </DropdownButton>
                            </td>
                            <td>
                                <DropdownButton variant="outline-primary" title={CalSelector["UnitFour"]} onSelect={HandleFuncHelper}>
                                    <Dropdown.Item eventKey="Opp UFour">Skill 1/2</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ops UFour">Super V1</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ver UFour">Super V2</Dropdown.Item>
                                </DropdownButton>
                            </td>
                            <td>
                                <DropdownButton variant="outline-primary" title={CalSelector["UnitFive"]} onSelect={HandleFuncHelper}>
                                    <Dropdown.Item eventKey="Opp UFive">Skill 1/2</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ops UFive">Super V1</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ver UFive">Super V2</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                        <tr>       
                            <td>Physical Damage </td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.PhyD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.PhyD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.PhyD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.PhyD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.PhyD*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>Elemental Physical Damage </td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.PhyEd*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.PhyEd*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.PhyEd*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.PhyEd*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.PhyEd*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>Magical Damage </td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.MagD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.MagD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.MagD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.MagD*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.MagD*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>Recovery</td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.R*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.R*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.R*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.R*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.R*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>
                            <td colSpan="6"><strong>Stats</strong></td>
                        </tr>
                        <tr>       
                            <td>HP</td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.stats.hp*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.stats.hp*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.stats.hp*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.stats.hp*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.stats.hp*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>P.Atk</td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.stats.patk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.stats.patk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.stats.patk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.stats.patk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.stats.patk*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>M.Atk</td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.stats.matk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.stats.matk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.stats.matk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.stats.matk*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.stats.matk*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>P.Def</td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.stats.pdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.stats.pdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.stats.pdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.stats.pdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.stats.pdef*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>M.Def</td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Math.round(Results.UnitOne.stats.mdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Math.round(Results.UnitTwo.stats.mdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Math.round(Results.UnitThree.stats.mdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Math.round(Results.UnitFour.stats.mdef*100)/100:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Math.round(Results.UnitFive.stats.mdef*100)/100:"NA"}
                            </td> 
                        </tr>
                        <tr>       
                            <td>Agi</td>               
                            <td>
                                {Results.UnitOne.stats["Main"]?Results.UnitOne.stats.Main.agi:"NA"}
                            </td>
                            <td>
                                {Results.UnitTwo.stats["Main"]?Results.UnitTwo.stats.Main.agi:"NA"}
                            </td>
                            <td>
                                {Results.UnitThree.stats["Main"]?Results.UnitThree.stats.Main.agi:"NA"}
                            </td>
                            <td>
                                {Results.UnitFour.stats["Main"]?Results.UnitFour.stats.Main.agi:"NA"}
                            </td>
                            <td>
                                {Results.UnitFive.stats["Main"]?Results.UnitFive.stats.Main.agi:"NA"}
                            </td> 
                        </tr>
                    <tr>       
                        <td>Dex</td>               
                        <td>
                            {Results.UnitOne.stats["Main"]?Results.UnitOne.stats.Main.dex:"NA"}
                        </td>
                        <td>
                            {Results.UnitTwo.stats["Main"]?Results.UnitTwo.stats.Main.dex:"NA"}
                        </td>
                        <td>
                            {Results.UnitThree.stats["Main"]?Results.UnitThree.stats.Main.dex:"NA"}
                        </td>
                        <td>
                            {Results.UnitFour.stats["Main"]?Results.UnitFour.stats.Main.dex:"NA"}
                        </td>
                        <td>
                            {Results.UnitFive.stats["Main"]?Results.UnitFive.stats.Main.dex:"NA"}
                        </td> 
                    </tr>
                    <tr>       
                        <td>Luck</td>               
                        <td>
                            {Results.UnitOne.stats["Main"]?Results.UnitOne.stats.Main.luck:"NA"}
                        </td>
                        <td>
                            {Results.UnitTwo.stats["Main"]?Results.UnitTwo.stats.Main.luck:"NA"}
                        </td>
                        <td>
                            {Results.UnitThree.stats["Main"]?Results.UnitThree.stats.Main.luck:"NA"}
                        </td>
                        <td>
                            {Results.UnitFour.stats["Main"]?Results.UnitFour.stats.Main.luck:"NA"}
                        </td>
                        <td>
                            {Results.UnitFive.stats["Main"]?Results.UnitFive.stats.Main.luck:"NA"}
                        </td> 
                    </tr>
                    </tbody>
                    </Table>
                }
            </Modal.Body>
        </Modal>
        </div>
    )
}

export default TeamBuilder

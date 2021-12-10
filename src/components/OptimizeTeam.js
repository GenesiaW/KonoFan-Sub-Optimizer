import {Button,Modal} from "react-bootstrap"
import { useState } from "react"
import Inventory from "./Inventory";

function OptimizeTeam({props}) {
    const [MultiProps,setMultiProps] = useState({
        stage:0,
        exclusion:[]
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const HeaderHelper ={
        0:"First",
        1:"Second",
        2:"Third",
        3:"Fourth",
        4:"Final",
        5:"Results"
    }
    const AvailUnits = props.filter(x => x.owned).sort((a, b) => a.rarity > b.rarity ? -1 : 1)
    return (
        <div>
           <Button variant="outline-light" style={{marginRight:"10px"}} onClick={handleShow}>Optimize Team</Button>
           <Modal            
            show={show} 
            onHide={handleClose} 
            animation={false} 
            centered 
            scrollable={true} 
            fullscreen="md-down"
            dialogClassName="modal-cw">
               <Modal.Header closeButton>
                   <Modal.Title>Select {HeaderHelper[MultiProps.stage]} Unit </Modal.Title>
               </Modal.Header>
               <Modal.Body className="Multistage">
                    <Inventory props={AvailUnits}/>
                </Modal.Body>
           </Modal>
        </div>
    )
}

export default OptimizeTeam

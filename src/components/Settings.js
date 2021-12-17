import { Modal,Form} from "react-bootstrap"

function Settings({show,handleClose,handleMeguminSuper,MeguminSuper,OpUlt,handleOpUlt,handleUltVersion}) {
    const VersionHelper = {
        1:false,
        2:true,
    }
    return (
        <div>
            <Modal 
            show={show} 
            onHide={handleClose} 
            animation={false}
            centered>
                <Modal.Header closeButton><Modal.Title>Settings</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="MeguminSuper">
                            <Form.Check type="switch" onChange={handleMeguminSuper} label="Optimize Megumin by Super" defaultChecked={MeguminSuper}/>
                        </Form.Group>
                        <Form.Group controlId="OpUlt">
                            <Form.Check type="switch" onChange={handleOpUlt} label="Optimize All Units by Super" defaultChecked={OpUlt.available}/>
                            {OpUlt.available? 
                            <Form.Check type="switch" onChange={handleUltVersion} label="Toggle for Super V2 (Not out in global yet)" defaultChecked={VersionHelper[OpUlt.version]}/>
                            :<Form.Check type="switch" onChange={handleUltVersion} label="Toggle for Super V2 (Not out in global yet)" defaultChecked={VersionHelper[OpUlt.version]} disabled/>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Settings

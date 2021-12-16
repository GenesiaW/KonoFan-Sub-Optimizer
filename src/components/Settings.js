import { Modal,Form} from "react-bootstrap"

function Settings({show,handleClose,handleMeguminSuper,MeguminSuper}) {
    const onClick = () => {
        handleMeguminSuper()}
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
                            <Form.Check type="switch" onChange={onClick} label="Optimize Megumin by Super" defaultChecked={MeguminSuper}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Settings

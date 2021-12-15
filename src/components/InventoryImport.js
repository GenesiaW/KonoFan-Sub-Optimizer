import { Modal,Button,Form,Col} from "react-bootstrap"

function InventoryImport({props,setOwned,setAlert,handleAlertShow,show,handleClose}) {
    let OwnershipList = []
    const InvProcesser = (InvCode) => {
        for (let index = 0; index < InvCode.length; index++) {
            OwnershipList.push((parseInt([InvCode[index]],36)))
        }
    }
    const HandleInvProcessing = () => {
        const InvCode = document.getElementById("InvCodeField").value
        if (!InvCode){
            return
        } 
        InvProcesser(InvCode.match(/.{1,4}/g))
        const newprops = [...props]
        for (let index = 0; index < props.length; index++) {
            if(OwnershipList.includes(props[index].uid)){
                newprops[index].owned = true
            }
            else{
                newprops[index].owned = false
            }
        }
        setOwned(newprops)
        console.log("Inventory Imported Successfully")
        setAlert("Inventory Imported Successfully")
        handleClose()
        handleAlertShow()
    }
    const ExportOnClick = () =>{
        document.getElementById("InvCodeField").value = "";
        let ExportText =""
        props.forEach(element => {
            if (element.owned){
                ExportText += element.uid.toString(36)
            }
        });
        document.getElementById("InvCodeField").value = ExportText
        navigator.clipboard.writeText(ExportText)
        setAlert("Inventory code copied onto Clipboard")
        handleAlertShow()
    }
    return (
        <div>
            <Modal 
            show={show} 
            onHide={handleClose} 
            animation={false}
            centered 
            dialogClassName="modal-cw">
                <Modal.Header closeButton><Modal.Title>Import/Export Inventory</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="InvCodeField">
                            <Form.Control as="textarea" rows={5} placeholder="Paste Inventory Code Here"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Col align="start"><Button variant="secondary" onClick={handleClose}>Close</Button></Col>
                    <Col align="end"><Button variant="primary" onClick={ExportOnClick}>Export</Button></Col>
                    <Button variant="primary" onClick={HandleInvProcessing}>Import</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InventoryImport

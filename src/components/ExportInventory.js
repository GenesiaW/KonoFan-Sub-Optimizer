import { Button, Modal, Form,Col,Row} from "react-bootstrap"

function ExportInventory({show,handleClose,ToggleOwned,Ownership,setAlertText,handleAlertShow}) {
    let DownloadData = {}
    Ownership.forEach(element => {
        if(element.owned){
            DownloadData[element.uid] = true
        }
        else{
            DownloadData[element.uid]=false
        }
    })

    const onDownload = () => {
        setAlertText("Inventory has been exported!")
        handleAlertShow()
        handleClose()
    }

    const ImportData = () => {
        const file = document.getElementById("formFile")
        console.log(file)
    }

    return (
        <Modal 
        show={show} 
        onHide={handleClose} 
        animation={false} 
        centered 
        scrollable={true} 
        fullscreen="md-down">
                <Modal.Header closeButton><Modal.Title>Import/Export Inventory</Modal.Title></Modal.Header>
                <Modal.Body>
                        <Form.Group controlId="formFile" style={{marginBottom:"10px"}}>
                            <Form.Label>Import Inventory from Local File</Form.Label>
                            <Form.Control type="file"/>
                        </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="outline-primary" href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(DownloadData))}`} download="Inventory.json" onClick={onDownload}>Export Inventory</Button>
                        </Col>
                    <Col align="end"><Button variant="outline-primary" onClick={ImportData}>Import Inventory</Button></Col>
                    </Row>
                </Modal.Body>
        </Modal>
    )
}

export default ExportInventory

import { Modal,Button, ModalTitle, Form} from "react-bootstrap"
import { useState } from "react";

function InventoryImport({props,setOwned,setAlert,handleAlertShow}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ExcelValues = {
        "001":1001100,
        "002":1002100,
        "003":1002102,
        "004":1003100,
        "005":1003104,
        "065":1003107,
        "0A6":1003129,
        "006":1004100,
        "077":1004116,
        "087":1004119,
        "007":1011100,
        "008":1012100,
        "009":1012102,
        "00A":1013100,
        "00B":1013104,
        "078":1013116,
        "084":1013120,
        "0A5":1013129,
        "00C":1014100,
        "066":1014107,
        "090":1014123,
        "0AD":1474132,
        "0AF":1014132,
        "00D":1021100,
        "00E":1022100,
        "00F":1022102,
        "010":1023100,
        "011":1023104,
        "064":1023107,
        "091":1023123,
        "012":1024100,
        "06E":1024113,
        "080":1024118,
        "0AE":1504132,
        "0B0":1024132,
        "013":1031100,
        "014":1032100,
        "015":1032102,
        "016":1033100,
        "017":1033104,
        "06B":1033113,
        "018":1034100,
        "067":1034107,
        "08D":1034123,
        "019":1041100,
        "01A":1042100,
        "01B":1042102,
        "01C":1043100,
        "070":1043114,
        "01D":1044100,
        "07D":1044117,
        "094":1044125,
        "01E":1051100,
        "01F":1052100,
        "020":1052102,
        "021":1053100,
        "07E":1053115,
        "022":1054100,
        "06D":1054113,
        "092":1054123,
        "023":1061100,
        "024":1062100,
        "025":1062102,
        "026":1063100,
        "06C":1063113,
        "075":1063116,
        "08E":1063123,
        "027":1064100,
        "081":1064118,
        "0A3":1064129,
        "028":1071100,
        "029":1072100,
        "02A":1072102,
        "02B":1073100,
        "02C":1074100,
        "073":1074114,
        "0A4":1074129,
        "02D":1091100,
        "02E":1092100,
        "02F":1092102,
        "030":1093100,
        "08A":1093123,
        "031":1094100,
        "071":1094114,
        "032":1101100,
        "033":1102100,
        "034":1102102,
        "035":1103100,
        "036":1104100,
        "037":1111100,
        "038":1112100,
        "039":1112102,
        "03A":1113100,
        "0AC":1113131,
        "03B":1114100,
        "072":1114114,
        "03C":1121100,
        "03D":1122100,
        "03E":1122102,
        "03F":1123100,
        "040":1124100,
        "069":1124110,
        "041":1131100,
        "042":1132100,
        "043":1132102,
        "044":1133100,
        "045":1134100,
        "06A":1134110,
        "08B":1134123,
        "046":1141100,
        "047":1142100,
        "048":1142102,
        "049":1143100,
        "06F":1143112,
        "093":1143123,
        "04A":1144100,
        "04B":1151100,
        "04C":1152100,
        "04D":1152102,
        "04E":1153100,
        "074":1153112,
        "04F":1154100,
        "050":1161100,
        "051":1162100,
        "052":1162102,
        "053":1163100,
        "068":1163111,
        "054":1164100,
        "055":1171100,
        "056":1172100,
        "057":1172102,
        "058":1173100,
        "059":1174100,
        "08C":1174123,
        "05A":1181100,
        "05B":1182100,
        "05C":1182102,
        "05D":1183100,
        "08F":1183123,
        "05E":1184100,
        "05F":1191100,
        "060":1192100,
        "061":1192100,
        "062":1193100,
        "063":1194100
    }
    let OwnershipList = []
    const InvProcesser = (InvCode) => {
        for (let index = 0; index < InvCode.length; index++) {
            OwnershipList.push(ExcelValues[InvCode[index]])
        }
    }
    const HandleInvProcessing = () => {
        const InvCode = document.getElementById("InvCodeField").value
        if (!InvCode){
            return
        } 
        InvProcesser(InvCode.match(/.{1,3}/g))
        console.log(OwnershipList)
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
    return (
        <div>
            <Button variant="outline-light" onClick={handleShow} style={{marginRight:"0.5rem"}}>Import Inventory</Button>
            <Modal 
            show={show} 
            onHide={handleClose} 
            animation={false} 
            dialogClassName="modal-cw">
                <Modal.Header closeButton><ModalTitle>Import from Google Sheets Version</ModalTitle></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="InvCodeField">
                            <Form.Control as="textarea" rows={3} placeholder="Paste Inventory Code Here"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={HandleInvProcessing}>Import</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InventoryImport

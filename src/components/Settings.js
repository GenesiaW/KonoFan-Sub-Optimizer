import { Modal,Form} from "react-bootstrap"
import {getCookieConsentValue,Cookies} from "react-cookie-consent";

function Settings({show,handleClose,handleMeguminSuper,MeguminSuper,OpUlt,handleOpUlt,handleUltVersion,onAccept,onDecline}) {
    const HandleConsent = () => {
        if(getCookieConsentValue()){
            onDecline()
            Cookies.set("CookieConsent",false)
        }
        else{
            onAccept()
            Cookies.set("CookieConsent",true)
        }
    }
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
                    <Form.Group controlId="GAConsent">
                            <Form.Check type="switch" onChange={HandleConsent} label="Consent to Google Analytics (Please refresh after opting out.)" defaultChecked={getCookieConsentValue()}/>
                        </Form.Group>
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

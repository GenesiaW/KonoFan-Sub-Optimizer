import { Modal,Form} from "react-bootstrap"
import {getCookieConsentValue,Cookies} from "react-cookie-consent";

function Settings({show,handleClose,handleMeguminSuper,MeguminSuper,OpUlt,handleOpUlt,handleUltVersion,onAccept,onDecline,handleRegionSwitch,RegionSwitch}) {
    const HandleConsent = () => {
        if(getCookieConsentValue() === "true"){
            onDecline()
            Cookies.set("CookieConsent","false")
        }
        else{
            onAccept()
            Cookies.set("CookieConsent","true")
        }
    }
    const CheckHelper ={
        "false":false,
        "true":true,
        "undefined":true,
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
                        <Form.Group controlId="RegionSwitch">
                            <Form.Check type="checkbox" onChange={handleRegionSwitch} label="Switch to Japan Server" defaultChecked={RegionSwitch}/>
                        </Form.Group>
                        <Form.Group controlId="GAConsent">
                            <Form.Check type="switch" onChange={HandleConsent} label="Consent to Google Analytics (Please refresh after opting out.)" defaultChecked={CheckHelper[getCookieConsentValue()]}/>
                        </Form.Group>
                        <Form.Group controlId="MeguminSuper">
                            <Form.Check type="switch" onChange={handleMeguminSuper} label="Optimize Megumin by Super" defaultChecked={MeguminSuper}/>
                        </Form.Group>
                        <Form.Group controlId="OpUlt">
                            <Form.Check type="switch" onChange={handleOpUlt} label="Optimize All Units by Super" defaultChecked={OpUlt.available}/>
                            {OpUlt.available? 
                            <Form.Check type="switch" onChange={handleUltVersion} label="Toggle for Super V2" defaultChecked={VersionHelper[OpUlt.version]}/>
                            :<Form.Check type="switch" onChange={handleUltVersion} label="Toggle for Super V2" defaultChecked={VersionHelper[OpUlt.version]} disabled/>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Settings

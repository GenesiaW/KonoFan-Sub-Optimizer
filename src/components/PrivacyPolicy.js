import { Modal } from "react-bootstrap"

function PrivacyPolicy({show,handleClose}) {
    return (
        <Modal 
        show={show} 
        onHide={handleClose} 
        animation={false} 
        centered 
        scrollable={true} 
        fullscreen="md-down"
        dialogClassName="modal-cw">
            <Modal.Header closeButton><Modal.Title>Privacy Policy</Modal.Title></Modal.Header>
            <Modal.Body>
                <div>
                    <p>Over at KonoFan Sub Optimizer, we value privacy and transparency. As such, 
                        we would like to inform you that we are using Google Analytics to optimize our web app performance.
                        The following user data are collected to aid the process: 
                    </p>
                    <ul>• Time Spent on each function</ul>
                    <ul>• Time Taken to load function</ul>
                    <ul>• Traffic Sources</ul>

                    <p>Your data will only be used for optimizing and improving the load time of the features. By using the web app, you
                        are consenting to the collection of the above mentioned data.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PrivacyPolicy

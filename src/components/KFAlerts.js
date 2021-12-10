import Toast from 'react-bootstrap/Toast'

function KFAlerts({text,show,setShow}) {
    return (
        <Toast variant="light" position="bottom-end" style={{position:"absolute", bottom:0,right:0, zIndex:1}}onClose={setShow} show={show} delay={2000} autohide>
            <Toast.Header flex>
                <strong className="me-auto">KonoFan Sub Optimizer</strong>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body> 
        </Toast>
    )
}

export default KFAlerts

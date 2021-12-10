import { Container,Row,Col} from "react-bootstrap"
import LargeMember from "./LargeMember"
import OptimizedContainer from "./OptimizedContainer"

function SubOptimizer({props,setUid,ChosenUid,results}) {    
    return (
        <Container className="SubOptimizer" fluid>
            <Row>
                <Col className="Selector" xs={3}><LargeMember props={props} setUid={setUid} ChosenUid={ChosenUid} Header="Main"/></Col>
                <Col xs={9}><OptimizedContainer props={results} /></Col>
            </Row>
        </Container>
    )
}

export default SubOptimizer

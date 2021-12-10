import { Col,Row } from "react-bootstrap";
import UnitButton from "./UnitButton"

const Inventory = ({props, ToggleOwned,onClick,setUid,handleClose}) => {
    const columns = []
    props.forEach((element,index) => {
        if (setUid){
            columns.push((<Col key={element.uid}><UnitButton props={element} ToggleOwned={ToggleOwned} onClick={onClick} setUid={setUid} handleClose={handleClose}/></Col>))
        }
        else{
            columns.push((<Col key={element.uid}><UnitButton props={element} ToggleOwned={ToggleOwned} onClick={onClick}/></Col>))
        }
    });
    const newcols = []
    while (columns.length%5 !== 0)
    columns.push(<Col key={columns.length+100}></Col>)
    while(columns.length)
        newcols.push(<Row key={columns.length+1000}>{columns.splice(0,5)}</Row>)
    return (
        <div className="Inventory">{newcols}</div>
    )
}

export default Inventory


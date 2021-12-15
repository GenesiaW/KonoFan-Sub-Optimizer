import { Col,Row } from "react-bootstrap";
import UnitButton from "./UnitButton";
import { v4 as uuidv4 } from 'uuid';

const Inventory = ({props, ToggleOwned,onClick,setUid,handleClose,setMultiProps,SelectSubUnits}) => {
    const columns = []
    props.forEach((element,index) => {
        if (setUid){
            columns.push((<Col key={element.uid}><UnitButton props={element} onClick={onClick} setUid={setUid} handleClose={handleClose}/></Col>))
        }
        else if(setMultiProps){
            columns.push((<Col key={uuidv4()}><UnitButton props={element} onClick={onClick} setMultiProps={setMultiProps}/></Col>))
        }
        else if(SelectSubUnits){
            columns.push((<Col key={uuidv4()}><UnitButton props={element} onClick={onClick} selectSubUnits={SelectSubUnits}/></Col>))
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


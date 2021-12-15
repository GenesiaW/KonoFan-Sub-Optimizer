import { useState } from "react"

export default function UnitButton({props,ToggleOwned,onClick,setUid,handleClose,setMultiProps,selectSubUnits,HandleUnitExclusion}) {
    const [IsActive,ToggleActive] = useState(props.owned)
    if(!props.container){
        props.container=[]
    }
    if (ToggleOwned){
        const HandleToggle = () => {
            ToggleOwned(props.uid)
            ToggleActive(!IsActive)
        }
        onClick=HandleToggle
    }
    if (HandleUnitExclusion){
        const UnitExclusion = () => {
            ToggleActive(!IsActive)
            if(IsActive){
                HandleUnitExclusion(props.uid,true)
            }
            else{
                HandleUnitExclusion(props.uid,false)
            }
        }
        onClick=UnitExclusion
    }
    if (setUid) {
        const ChooseUID = () => {
            setUid(props.uid)
            handleClose()
        }
        onClick=ChooseUID
    }
    if (setMultiProps){
        onClick = () => {
            setMultiProps(props.uid)}
    }
    if (selectSubUnits){
        onClick = () => {
            selectSubUnits(props.uid,props.container)
        }
    }
    const logo = 'https://raw.githubusercontent.com/GenesiaW/KonoFan-Sub-Optimizer/main/src/assets/MediumMember/' + props.uid + '.png'
    // const logo = require("../assets/MediumMember/"+props.uid + '.png').default
    return (
        <button 
        className={IsActive? "UnitButton": "UnitButton Disabled"}
        ><img src={logo} alt={props.display_name} 
        style={{width:"100%",height:"100%"}} 
        draggable={false}
        onClick={onClick}/></button>
    )
}

UnitButton.defaultProps = {
    props:
    {uid: 1001100,
    owned: true}
  }
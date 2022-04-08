import { useState } from "react"

export default function UnitButton({props,ToggleOwned,onClick,setUid,handleClose,setMultiProps,selectSubUnits,HandleUnitExclusion,ToggleExclusion,id,UnitChange}) {
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
    if (ToggleExclusion){
        onClick =() => ToggleExclusion(props.uid)
    }
    if (UnitChange){
        onClick = () => UnitChange(props.uid)
    }
    let image_link = process.env.REACT_APP_IMAGE_LINK +"IconMiddleMember/Source/"
    let temporary_fix = ["maxephy","maxphy","maxmag","maxrec"]
    if (temporary_fix.includes(props.uid)){
        image_link = "https://raw.githubusercontent.com/GenesiaW/KonoFan-Sub-Optimizer/main/src/assets/MediumMember/"
    }
    else {
        image_link = process.env.REACT_APP_IMAGE_LINK +"IconMiddleMember/Source/"
    }
    const logo = image_link + props.uid + '.png'
    // const logo = require("../assets/MediumMember/"+props.uid + '.png').default
    return (
        <button 
        className={IsActive? "UnitButton": "UnitButton Disabled"}
        ><img src={logo} alt={props.display_name} 
        style={{width:"100%",height:"100%"}} 
        draggable={false}
        id={id}
        onClick={onClick}/></button>
    )
}

UnitButton.defaultProps = {
    props:
    {uid: 1001100,
    owned: true}
  }
import { useState } from "react"

export default function UnitButton({props,ToggleOwned,onClick,setUid,handleClose}) {
    const [IsActive,ToggleActive] = useState(props.owned)
    if (ToggleOwned){
        const HandleToggle = () => {
            ToggleOwned(props.uid)
            ToggleActive(!IsActive)
        }
        onClick=HandleToggle
    }
    if (setUid) {
        const ChooseUID = () => {
            setUid(props.uid)
            handleClose()
        }
        onClick=ChooseUID
    }
    const logo = 'https://raw.githubusercontent.com/GenesiaW/KonoFan-Sub-Optimizer/main/src/assets/MediumMember/' + props.uid + '.png')
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
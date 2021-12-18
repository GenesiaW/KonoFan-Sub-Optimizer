import { Modal } from "react-bootstrap"

function Changelogs({show,handleClose}) {
    return (
        <Modal 
        show={show} 
        onHide={handleClose} 
        animation={false} 
        centered 
        scrollable={true} 
        fullscreen="md-down"
        dialogClassName="modal-cw">
            <Modal.Header closeButton><Modal.Title>Changelog</Modal.Title></Modal.Header>
            <Modal.Body>
                <div>
                    <h4>18 December 2021 (Ver 2.3.1)</h4>
                    <ul>• Added "New Units" Filter to inventory</ul>
                    <ul>• Added Contact to dropdown button</ul>
                    <ul>• Added Formula used and explanation to guide/wiki.</ul>
                </div>
                <div>
                    <h4>17 December 2021 (Ver 2.3.0)</h4>
                    <ul>• Added traits of units to display</ul>
                    <ul>• Added Unit Exclusion to allow exclusion of unit during single unit optimization</ul>
                    <ul>• Added Toggle to Optimize All Units based on Super. By default damage is optimize by element of skill 1 and 2</ul>
                    <ul>• Added Toggle to switch optimization based on Super V1 or V2</ul>
                    <ul>• Fixed heading for Optimize Team (Fast)</ul>
                    <ul>• Fixed Bug where Fire Subs will be recommended for Rem when Toggle Optimize Megumin By Super is turned on</ul>
                </div>
                <div>
                    <h4>16 December 2021 (Ver 2.2.1)</h4>
                    <ul>• Added Toggle to Optimize Megumin based on Super damage. Accessed via More &gt; Settings </ul>
                    <ul>• Added performance tracking of web app</ul>
                    <ul>• Added Privacy Policy</ul>
                </div>
                <div>
                    <h4>15 December 2021 (Ver 2.1.0)</h4>
                    <ul>• Added Version Number to Navbar heading</ul>
                    <ul>• Added Optimize Team, previous version has been renamed to (Slow)</ul>
                    <ul>• The new optimize team feature is probably what most users were expecting when optimize team is mentioned</ul>
                    <ul>• Added <a href={"https://github.com/GenesiaW/KonoFan-Sub-Optimizer/wiki"} target="_blank" rel="noopener noreferrer">Guide</a> to dropdown list to help users</ul>
                    <ul>• Details can be found in More &gt; Guide</ul>
                    <ul>• Added Label for Optimize Team (Slow)</ul>
                    <ul>• Replaced Import Inventory (Sheets) with Import/Export Inventory</ul>
                    <ul>• Importing from Google Sheets will require inventory code to be converted to WebApp Version</ul>
                </div>
                <div>
                    <h4>14 December 2021 (Ver 2.0.0)</h4>
                    <ul>• Added stats for 4 Xmas units</ul>
                    <ul>• Added Optimize Team for optimizing 5 members in sequence</ul>
                    <ul>• Added Changelog for documenting changes</ul>
                    <ul>• Added Rank Selection for optimal setup, allowing choice of best setup to 5th best</ul>
                    <ul>• Added Rarity Filter to inventory</ul>
                    <ul>• Added Dropdown menu to NavBar to reduce clutter</ul>
                    <ul>• Shifted Import Inventory (Sheets) into dropdown menu</ul>
                </div>
                <div>
                    <h4>11 December 2021 (Ver 1.0.2) </h4>
                    <ul>• Fix crash when selecting 2★ Cecily (Priest) [due to an extra space in element]</ul>
                </div>
                <div>
                    <h4>10 December 2021 (Ver 1.0.1)</h4>
                    <ul>• Initial release of KonoFan Sub Optimizer</ul>
                    <ul>• Added display of stats</ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Changelogs

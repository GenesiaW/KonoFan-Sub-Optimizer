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
                    <h4>21 December 2022 (Ver 4.10.0)</h4>
                    <ul>• Updated JP database to include units up to Christmas Lolisa</ul>
                    <ul>• Toggled Global December units to be available</ul>
                </div>
                <div>
                    <h4>8 November 2022 (Ver 4.9.0)</h4>
                    <ul>• Updated JP database to include units up to Bofuri Collab</ul>
                    <ul>• Toggled Global October and Novemeber units to be available</ul>
                    <ul>• Note: I forgot to update it last month, but in the event that I forgot again, JP mode can be used instead (ensure that inventory is exported before switching over)</ul>
                </div>
                <div>
                    <h4>15 September 2022 (Ver 4.8.0)</h4>
                    <ul>• Updated JP database to include units up to Fes Lia/Erika</ul>
                </div>
                <div>
                    <h4>3 September 2022 (Ver 4.7.1)</h4>
                    <ul>• Toggled Global September units to be available</ul>
					<ul>• Toggled Ninja 4 Banner</ul>
                </div>
                <div>
                    <h4>29 July 2022 (Ver 4.6.0)</h4>
                    <ul>• Changed Calculation method. Now supports Railgun/Shield Hero Units with more than 1 sub character</ul>
                    <ul>• Changed Behavior of Search Box. Now Collab Characters can be searched directly</ul>
                    <ul>• Updated JP database to include units up to Shield Hero</ul>
                    <ul>• Toggled Summer Units to be available</ul>
                    <ul>• Toggled Anniversary Units to be available</ul>
                </div>
                <div>
                    <h4>6 June 2022 (Ver 4.5.0)</h4>
                    <ul>• Toggled Ninja P3 Units to available</ul>
                    <ul>• Toggled Maid P3 Units to available</ul>
                    <ul>• Toggled School P1 Units to available</ul>
                    <ul>• Toggled School P2 Units to available</ul>
                </div>
                <div>
                    <h4>16 May 2022 (Ver 4.4.0)</h4>
                    <ul>• Toggled Danmachi Units to available</ul>
                    <ul>• Updated JP data to include Railgun</ul>
                </div>
                <div>
                    <h4>23 Apr 2022 (Ver 4.3.0)</h4>
                    <ul>• Toggled Arabian P1 and P2 Units to available</ul>
                    <ul>• Toggled Ninja P1 Units to available</ul>
                </div>
                <div>
                    <h4>7 Apr 2022 (Ver 4.2.0)</h4>
                    <ul>• Toggled Kenpo P1 and P2 Units to available</ul>
                    <ul>• Toggled Ball Units to available</ul>
                </div>
                <div>
                    <h4>22 March 2022 (Ver 4.1.0)</h4>
                    <ul>• Toggled Axel Hearts P1 and P2 Units to available</ul>
                </div>
                <div>
                    <h4>26 February 2022 (Ver 4.0.1)</h4>
                    <ul>• Added JP Mode to Sub Optimizer, now subs for new Japanese units can be optimized too</ul>
                    <ul>• Toggled Maid P1 and Maid P2 Units to available</ul>
					<ul>• Fixed bug where Cat Cuddler Melissa was tagged as new</ul>
                </div>
                <div>
                    <h4>16 February 2022 (Ver 3.9.1)</h4>
                    <ul>• Toggled Snow Play P3 and Cafe Units to available</ul>
                    <ul>• Fixed Bonus Stats bug</ul>
                </div>
                <div>
                    <h4>5 February 2022 (Ver 3.8.0)</h4>
                    <ul>• Toggled Valentines Units to available</ul>
                </div>
                <div>
                    <h4>2 February 2022 (Ver 3.7.1)</h4>
                    <ul>• Fixed typos in stats and passive</ul>
                </div>
                <div>
                    <h4>30 January 2022 (Ver 3.7.0)</h4>
                    <ul>• Toggled Magic Academy Units to available</ul>
                </div>
                <div>
                    <h4>20 January 2022 (Ver 3.6.0)</h4>
                    <ul>• Toggled Snow Play P2 Units to available</ul>
                </div>
                <div>
                    <h4>16 January 2022 (Ver 3.5.1)</h4>
                    <ul>• Added Arena Stats. To access go to More &gt; Arena Stats</ul>
                </div>
                <div>
                    <h4>11 January 2022 (Ver 3.5.0)</h4>
                    <ul>• Toggled Hot Spring P2 Units to available.</ul>
                </div>
                <div>
                    <h4>1 January 2022 (Ver 3.4.2)</h4>
                    <ul>• When new units are added, they are set to "not owned" by default (Used to be set to "owned").</ul>
                </div>
                <div>
                    <h4>31 December 2021 (Ver 3.4.1)</h4>
                    <ul>• Toggled New Year Units to available</ul>
                    <ul>• Fixed some minor typos</ul>
                </div>
                <div>
                    <h4>27 December 2021 (Ver 3.3.0)</h4>
                    <ul>• Added the ability to filter Units by Trait or Name</ul>
                    <ul>• For Collab Characters, use their same face sub name. Example : Search Aqua for Emilia or Megumin for Rem</ul>
                    <ul>• Added back button to optimize team results</ul>
                    <ul>• Added stats of all units found in Global version using the <a href={"https://konofan-wiki.web.app/"} target="_blank" rel="noopener noreferrer">datamine wiki</a>. They will be toggled when they are available in the game.</ul>
                </div>
                <div>
                    <h4>24 December 2021 (Ver 3.2.0)</h4>
                    <ul>• Added Order Affected by Bonus Stats Check for Single Unit Optimization</ul>
                    <ul>• If Order Affected by Bonus Stats is true, the next setup will be better than the current setup if the bonus stats stated in the next setup can be met</ul>
                    <ul>•  The bonus stats is the combined total from Trials, Affinities and Weapon. (P. Atk for Physical and Elemental Physical setup, while M. Atk for Magical and Recovery)</ul>
                    <ul>• Full Details can be found on the guide/wiki under Single Sub Optimization section</ul>
                    <ul>Note: Huge thanks to <a href={"https://www.reddit.com/user/dtfinch/"} target="_blank" rel="noopener noreferrer">u/dtfinch</a> for providing an example, allowing me to see the effects of bonus stats and performing the necessary calculations</ul>
                </div>
                <div>
                    <h4>23 December 2021 (Ver 3.1.0)</h4>
                    <ul>• Toggle Theater Units to available</ul>
                    <ul>Note: Decided to release it early as I have the stats before they removed the gallery preview</ul>
                </div>
                <div>
                    <h4>20 December 2021 (Ver 3.0.0)</h4>
                    <ul>• Added Team Builder</ul>
                    <ul>• Added Sort Feature to single unit sub optimizer, team builder and optimize team</ul>
                    <ul>• Removed Optimizer Team (Slow)</ul>
                    <ul>• Privacy Policy changes</ul>
                    <ul>• Changed Google Analytics to be on by default. Press decline on banner or toggle off in Settings</ul>
                    <ul>Note: This is the final feature update for the sub optimizer. Subsequent updates will only be bug fixes and addition of new units</ul>
                </div>
                <div>
                    <h4>18 December 2021 (Ver 2.3.2)</h4>
                    <ul>• Added "New Units" Filter to inventory</ul>
                    <ul>• Added Contact to dropdown button</ul>
                    <ul>• Added Formula used and explanation to guide/wiki</ul>
					<ul><strike>• Disabled Google Analytics until the implementation of consent button</strike></ul>
                    <ul><strike>• Added Consent button for Google Analytics. By default tracking is disabled</strike></ul>
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

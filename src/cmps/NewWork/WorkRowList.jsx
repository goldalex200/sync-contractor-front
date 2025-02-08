import { WorkRow } from "./WorkRow"


export const WorkRowList = ({ workRows, addSection, removeRow }) => {

    const addBtnClick = (e) => {
        e.preventDefault();
        addSection();
    }
    return <>
        <div id="new-sections-container" className="new-cul-container new-sections-container">
            {workRows.map((row, i) =>
                <WorkRow row={row} key={'row' + row.id} removeRow={(rowId) => removeRow(rowId)} />)}
        </div>

        <button onClick={(e) => addBtnClick(e)}> הוסף משימה</button>
    </>
}
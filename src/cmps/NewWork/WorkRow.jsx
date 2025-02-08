import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa";

export const WorkRow = ({ row, removeRow }) => {
    const [workRow, setWorkRow] = useState();
    const [type, setType] = useState('יחידה');

    useEffect(() => {
        setWorkRow(row);
    }, [])

    const onChange = () => {

    }

    const removeClicked = (e) => {
        e.preventDefault();
        removeRow(workRow.id);
    }

    return (!row) ? <></>
        : <div className="new-row-container new-row-section">
            <button className="remove-btn" onClick={(e) => removeClicked(e)}>
                <FaTrash />
            </button>

            <div className="new-row-container section-item">
                <label htmlFor="new-content" className="new-sub-header"> מהות העבודה</label>
                <select onChange={(e) => onChange(e)} id="new-content" className="new-sub-select">
                    <option value="one">החלפת צנרת במשאבת בורג</option>
                    <option value="two">פתיחת סתימה במשאבות</option>
                    <option value="three">בניית פסל לגרגלך הראשי</option>
                </select>
            </div>

            <div className="new-row-container section-item">
                <label htmlFor="new-amount" className="new-sub-header">כמות</label>
                <input className="int-input" onChange={(e) => onChange(e)} type="number" id="new-amount" />
                <select onChange={(e) => setType(e.target.value)} className="new-count-select">
                    <option value="יחידה">יחידה</option>
                    <option value="מטר">מטר</option>
                </select>
            </div>
            <div className="new-row-container section-item">
                <label htmlFor="new-cost" className="new-sub-header">עלות ל{type} בש"ח</label>
                <input className="int-input" onChange={(e) => onChange(e)} min={0} type="number" id="new-cost" />
            </div>


        </div>
}
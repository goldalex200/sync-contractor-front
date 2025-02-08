import { useState } from "react"
import { getActiveWorkCount } from "../../services/dataService";

export const PersonalDetails = ({user}) => {
// const [activeWorkCount, setActiveWorkCount] = useState(getActiveWorkCount(user));
    console.log(user)
    console.log(user.username)
    return <div className="info-headers-container">
        <div className="info-header-set">
        <h4 className="info-header-style">שם:</h4>
        <h4 className="info-item-style">{user.username}</h4>
        </div>

        <div className="info-header-set">
        <h4 className="info-header-style">ח"פ:</h4>
        <h4 className="info-item-style">{user.idNum}</h4>
        </div>

        <div className="info-header-set">
        <h4 className="info-header-style">טלפון:</h4>
        <h4 className="info-item-style">{user.phone_number}</h4>
        </div>

        <div className="info-header-set">
        <h4 className="info-header-style">מייל:</h4>
        <h4 className="info-item-style">{user.email}</h4>
        </div>

        {/*<div className="info-header-set">*/}
        {/*<h4 className="info-header-style">מ"ס עבודות פתוחות:</h4>*/}
        {/*<h4 className="info-item-style">{activeWorkCount}</h4>*/}

        {/*</div>*/}
    </div>
}

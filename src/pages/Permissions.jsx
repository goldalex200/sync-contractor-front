import users from "../data/user.json"
export const Permissions = () => {
    const usersToShow = [
        {
            id: '1',
            firstName: "איציק",
            lastName: "כהן",
            idNum: 786311544,
            role: 'מנכ"ל'
        },
        {
            id: '2',
            firstName: "יאיר",
            lastName: "אטלן",
            idNum: 357254545,
            role: 'סמנכ"ל תפעול והנדסה'
        },
        {
            id: '3',
            firstName: "אופיר",
            lastName: "לב ארי",
            idNum: 123231456,
            role: 'מנהל מחשוב'
        },
    ]
    return <>
        <h2>הרשאות</h2>

        <div className="permissions-main-container">

            <div className="permissions-headers-container">
                <h4 className="permissions-table-title">פרטים אישיים</h4>
                <h4 className="permissions-table-title">דשבורד</h4>
                <h4 className="permissions-table-title">דוחות</h4>
                <h4 className="permissions-table-title">מתן הרשאות</h4>
                <h4 className="permissions-table-title">עבודות</h4>
                <h4 className="permissions-table-title">קבלן</h4>
            </div>

{usersToShow && usersToShow.map((user, i) =>
        <div key={i + user.id} className="permissions-row-container">

        <div className="permissions-info-container">
            <div className="permissions-sub-info-container">
                <h4>שם פרטי:</h4>
                <h4>{user.firstName} </h4>
            </div>
            <div className="permissions-sub-info-container">
                <h4>שם משפחה:</h4>
                <h4> {user.lastName}</h4>
            </div>
            <div className="permissions-sub-info-container">
                <h4>ת"ז:</h4>
                <h4> {user.idNum}</h4>
            </div>

            <div className="permissions-sub-info-container">
                <h4>תפקיד:</h4>
                <h4>{user.role}</h4>
            </div>
        </div>

        <div className="permissions-input-container">
            <input type="checkbox" className="permissions-input-item"/>
            <input type="checkbox" className="permissions-input-item"/>
            <input type="checkbox" className="permissions-input-item"/>
            <input type="checkbox" className="permissions-input-item"/>
            <input type="checkbox" className="permissions-input-item"/>
        </div>

        </div>
)}

        </div>
    </>
}
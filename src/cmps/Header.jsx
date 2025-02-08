import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FaDroplet} from 'react-icons/fa6';
import {AuthContext} from '../pages/AuthContext.jsx';
import React, {useContext} from 'react';

export const Header = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {user, isLoggedIn, logout} = useContext(AuthContext);
    const isAuthorized = user && ['GENERAL_ENGINEER', 'SUPER_ADMIN'].includes(user.role);

    const getClassName = (linkName) => {
        const path = `/sync-contractor${linkName}`;
        return pathname === path ? 'active-link' : '';
    };

    const handleLogout = () => {
        logout();
        navigate('/sync-contractor');
    };

    return (
        <header className="header-container">
            <h1 className="app-name">Sync {<FaDroplet/>} Contractor</h1>
            <nav className="header-nav-bar">
                {!isLoggedIn && (
                    <>
                        <Link className={`link-item ${getClassName('/login')}`} to="sync-contractor/login">
                            התחברות
                        </Link>
                        <Link className={`link-item ${getClassName('/register')}`} to="sync-contractor/register">
                            הרשמה
                        </Link>
                    </>
                )}

                {/*<Link className={`link-item ${getClassName('/permissions')}`} to="sync-contractor/permissions">*/}
                {/*    הרשאות*/}
                {/*</Link>*/}
                {isLoggedIn && (
                    <>
                        {isLoggedIn && (
                            <div className="user-info">
                                <span>שלום {user.username}</span> {/* Display username */}
                                <button className="logout-button" onClick={handleLogout}>
                                    התנתק
                                </button>
                            </div>
                        )}

                        {/*<Link className={`link-item ${getClassName('/dashboard')}`} to="sync-contractor/dashboard">*/}
                        {/*    דשבורד*/}
                        {/*</Link>*/}
                        {isAuthorized && (
                            <>
                                {/*<Link className={`link-item ${getClassName('/dashboard')}`}*/}
                                {/*      to="sync-contractor/dashboard">*/}
                                {/*    דשבורד*/}
                                {/*</Link>*/}
                                <Link className={`link-item ${getClassName('/cost-chart')}`}
                                      to="sync-contractor/cost-chart">
                                    עלויות
                                </Link>

                                <Link className={`link-item ${getClassName('/facility-chart')}`}
                                      to="sync-contractor/facility-chart">
                                    סטטוס תקלות לפי מתקן
                                </Link>

                                <Link className={`link-item ${getClassName('/time-chart')}`}
                                      to="sync-contractor/time-chart">
                                    לוחות זמנים
                                </Link>

                                <Link className={`link-item ${getClassName('/work-status-chart')}`}
                                      to="sync-contractor/work-status-chart">
                                    סטטוס עבודות
                                </Link>

                                <Link className={`link-item ${getClassName('/top-contractor-chart')}`}
                                      to="sync-contractor/top-contractor-chart">
                                    קבלנים מצטיינים
                                </Link>

                                <Link className={`link-item ${getClassName('/top-minus-contractor-chart')}`}
                                      to="sync-contractor/top-minus-contractor-chart">
                                    קבלנים בתחתית הדירוג
                                </Link>
                            </>

                        )}
                        <Link className={`link-item ${getClassName('/managementTable')}`}
                              to="sync-contractor/managementTable">
                            ניהול עבודות
                        </Link>
                    </>
                )}
                <Link className={`link-item ${getClassName('')}`} to="/sync-contractor">
                    בית
                </Link>
            </nav>
        </header>
    );
};
// import { Link, useLocation } from "react-router-dom"
// import { FaDroplet } from "react-icons/fa6";
// export const Header = () => {
//
//     const { pathname } = useLocation()
//     const getClassName = (linkName) => {
//         const path = `/sync-contractor${linkName}`;
//         console.log('path', path);
//         console.log('pathname', pathname);
//
//         if (pathname === path)
//             return 'active-link';
//     }
//
//
//
//     return <header className="header-container">
//         <h1 className="app-name">Sync {<FaDroplet />} Contractor</h1>
//         <nav className="header-nav-bar">
//             <Link className={`link-item ${getClassName('/login')}`} to="sync-contractor/login">התחברות</Link>
//             <Link className={`link-item ${getClassName('/register')}`} to="sync-contractor/register">הרשמה</Link>
//             <Link className={`link-item ${getClassName('/permissions')}`} to="sync-contractor/permissions">הרשאות</Link>
//             <Link className={`link-item ${getClassName('/dashboard')}`} to="sync-contractor/dashboard">דשבורד</Link>
//             <Link className={`link-item ${getClassName('/managementTable')}`} to="sync-contractor/managementTable">ניהול עבודות</Link>
//             <Link className={`link-item ${getClassName('')}`} to="/sync-contractor" > בית</Link>
//         </nav >
//     </header >
// }

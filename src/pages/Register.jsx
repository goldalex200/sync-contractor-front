import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import DataService from '../services/DataService';
import {animated, useSpring} from 'react-spring';
import {AuthContext} from "./AuthContext.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import './Login.scss'; // Make sure this path is correct

export const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password1: "",
        password2: "",
        username: "",
        idNum: "",
        role: "CONTRACTOR",
        phone_number: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const navigate = useNavigate();
    const {setIsLoggedIn, setUser} = useContext(AuthContext);

    const titleSpring = useSpring({
        from: {opacity: 0, transform: 'translateY(-20px)'},
        to: {opacity: 1, transform: 'translateY(0)'},
        config: {mass: 1, tension: 280, friction: 120},
    });

    const handleChange = (ev) => {
        const {name, value} = ev.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (formData.password1 !== formData.password2) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleRegister = async (ev) => {
        ev.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await DataService.register(formData);

            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            setIsLoggedIn(true);

            navigate('/sync-contractor/managementTable');
        } catch (err) {
            const errorMessage = err.response?.data;
            if (typeof errorMessage === 'object') {
                const errors = Object.values(errorMessage).flat().join(' ');
                setError(errors);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword1 = () => setShowPassword1(!showPassword1);
    const toggleShowPassword2 = () => setShowPassword2(!showPassword2);

    return (
        <div className="register-container">
            <animated.h1 style={titleSpring}> הרשמה</animated.h1>

            <form className="login-main-container" onSubmit={handleRegister}>
                <div className="login-sub-container">
                    <label className="login-label">אימייל:</label>
                    <input type="email" name="email" className="login-input" placeholder="אימייל" value={formData.email}
                           onChange={handleChange} disabled={loading} required/>
                </div>
                <div className="login-sub-container">
                    <label className="login-label">שם פרטי:</label>
                    <input type="text" name="first_name" className="login-input" placeholder="שם פרטי"
                           value={formData.first_name} onChange={handleChange} disabled={loading} required/>
                </div>
                <div className="login-sub-container">
                    <label className="login-label">שם משפחה:</label>
                    <input type="text" name="last_name" className="login-input" placeholder="שם משפחה"
                           value={formData.last_name} onChange={handleChange} disabled={loading} required/>
                </div>
                <div className="login-sub-container">
                    <label className="login-label">שם משתמש:</label>
                    <input type="text" name="username" className="login-input" placeholder="שם משתמש"
                           value={formData.username} onChange={handleChange} disabled={loading} required/>
                </div>
                <div className="login-sub-container">
                    <label className="login-label">טלפון:</label>
                    <input type="tel" name="phone_number" className="login-input" placeholder="טלפון"
                           value={formData.phone_number} onChange={handleChange} disabled={loading} required/>
                </div>
                <div className="login-sub-container">
                    <label className="login-label">ת"ז:</label>
                    <input type="text" name="idNum" className="login-input" placeholder='ת"ז' value={formData.idNum}
                           onChange={handleChange} disabled={loading} required/>
                </div>
                <div className="login-sub-container">
                    <label className="login-label">סיסמא:</label>
                    <div className="password-input-container">
                        <FontAwesomeIcon icon={showPassword1 ? faEye : faEyeSlash} onClick={toggleShowPassword1}
                                         className="password-toggle-icon"/>
                        <input type={showPassword1 ? "text" : "password"} name="password1" className="login-input"
                               placeholder="סיסמא" value={formData.password1} onChange={handleChange} disabled={loading}
                               required minLength="8"/>
                    </div>
                </div>
                <div className="login-sub-container">
                    <label className="login-label">אימות סיסמא:</label>
                    <div className="password-input-container">
                        <FontAwesomeIcon icon={showPassword2 ? faEye : faEyeSlash} onClick={toggleShowPassword2}
                                         className="password-toggle-icon"/>
                        <input type={showPassword2 ? "text" : "password"} name="password2" className="login-input"
                               placeholder="אימות סיסמא" value={formData.password2} onChange={handleChange}
                               disabled={loading} required minLength="8"/>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'נרשם...' : 'הרשמה'}
                </button>
            </form>
        </div>
    );
};


// // Register.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DataService from '../services/DataService';
//
// export const Register = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         first_name: "",
//         last_name: "",
//         password1: "",
//         password2: "",
//         username: "",
//         idNum: "",
//         role: "CONTRACTOR",
//         phone_number: ""
//     });
//
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//
//     const navigate = useNavigate();
//
//     const handleChange = (ev) => {
//         const { name, value } = ev.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };
//
//     const validateForm = () => {
//         if (formData.password1 !== formData.password2) {
//             setError("Passwords do not match");
//             return false;
//         }
//         return true;
//     };
//
//     const handleRegister = async (ev) => {
//         ev.preventDefault();
//         setError("");
//
//         if (!validateForm()) return;
//
//         setLoading(true);
//
//         try {
//             const response = await DataService.register(formData);
//
//             localStorage.setItem('accessToken', response.data.access);
//             localStorage.setItem('user', JSON.stringify(response.data.user));
//
//             navigate('/sync-contractor/managementTable');
//         } catch (err) {
//             const errorMessage = err.response?.data;
//             if (typeof errorMessage === 'object') {
//                 // Handle Django REST framework error format
//                 const errors = Object.values(errorMessage).flat().join(' ');
//                 setError(errors);
//             } else {
//                 setError('Registration failed. Please try again.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <form className="login-main-container" onSubmit={handleRegister}>
//             <div className="login-sub-container">
//                 <label className="login-label">אימייל:</label>
//                 <input
//                     type="email"
//                     name="email"
//                     className="login-input"
//                     placeholder="אימייל"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">שם פרטי:</label>
//                 <input
//                     type="text"
//                     name="first_name"
//                     className="login-input"
//                     placeholder="שם פרטי"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">שם משפחה:</label>
//                 <input
//                     type="text"
//                     name="last_name"
//                     className="login-input"
//                     placeholder="שם משפחה"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">שם משתמש:</label>
//                 <input
//                     type="text"
//                     name="username"
//                     className="login-input"
//                     placeholder="שם משתמש"
//                     value={formData.username}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">טלפון:</label>
//                 <input
//                     type="tel"
//                     name="phone_number"
//                     className="login-input"
//                     placeholder="טלפון"
//                     value={formData.idNum}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">ת"ז:</label>
//                 <input
//                     type="text"
//                     name="idNum"
//                     className="login-input"
//                     placeholder='ת"ז'
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">סיסמא:</label>
//                 <input
//                     type="password"
//                     name="password1"
//                     className="login-input"
//                     placeholder="סיסמא"
//                     value={formData.password1}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">אימות סיסמא:</label>
//                 <input
//                     type="password"
//                     name="password2"
//                     className="login-input"
//                     placeholder="אימות סיסמא"
//                     value={formData.password2}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                 />
//             </div>
//
//             {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
//
//             <button
//                 type="submit"
//                 className="login-btn"
//                 disabled={loading}
//             >
//                 {loading ? 'נרשם...' : 'הרשמה'}
//             </button>
//         </form>
//     );
// };

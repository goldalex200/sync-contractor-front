// Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import DataService from '../services/DataService';
import { AuthContext } from './AuthContext.jsx';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.scss';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { setIsLoggedIn, setUser } = useContext(AuthContext);

    const titleSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { mass: 1, tension: 280, friction: 120 },
    });

    const handleLogin = async (ev) => {
        ev.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await DataService.login({ email, password });

            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setUser(response.data.user);
            setIsLoggedIn(true);

            navigate('/sync-contractor/managementTable');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <animated.h1 style={titleSpring}> כניסה למערכת </animated.h1>

            <form className="login-main-container" onSubmit={handleLogin}>
                <div className="login-sub-container">
                    <label className="login-label">אימייל:</label>
                    <input
                        type="email"
                        className="login-input"
                        placeholder="אימייל"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
                {/*<div className="login-sub-container">*/}
                {/*    <label className="login-label">סיסמא:</label>*/}
                {/*    <div className="password-input-container"> /!* Container for input and icon *!/*/}
                {/*        <input*/}
                {/*            type={showPassword ? "text" : "password"}*/}
                {/*            className="login-input"*/}
                {/*            placeholder="סיסמא"*/}
                {/*            value={password}*/}
                {/*            onChange={(ev) => setPassword(ev.target.value)}*/}
                {/*            disabled={loading}*/}
                {/*            required*/}
                {/*        />*/}
                {/*        <FontAwesomeIcon*/}
                {/*            icon={showPassword ? faEye : faEyeSlash}*/}
                {/*            onClick={toggleShowPassword}*/}
                {/*            className="password-toggle-icon" // Add a class for styling*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="login-sub-container">
                    <label className="login-label">סיסמא:</label>
                    <div className="password-input-container">
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={toggleShowPassword}
                            className="password-toggle-icon"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="login-input"
                            placeholder="סיסמא"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>} {/* Removed inline styles */}

                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'מתחבר...' : 'היכנס'}
                </button>

                <button
                    type="button"
                    className="login-forgot-password"
                    onClick={() => alert("שכחתי סיסמא עדיין לא מיושם")}
                    disabled={loading}
                >
                    שכחתי סיסמא
                </button>
            </form>
        </div>
    );
};

// Make sure you have Font Awesome icons installed for the eye icon
// import { useState, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
// import DataService from '../services/DataService';
// import { AuthContext } from './AuthContext.jsx'; // Import AuthContext
// import { useSpring, animated } from 'react-spring'; // Import for animations
//
// export const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//
//     const navigate = useNavigate();
//     const { setIsLoggedIn, setUser } = useContext(AuthContext); // Use context
//
//     const titleSpring = useSpring({
//         from: { opacity: 0, transform: 'translateY(-20px)' },
//         to: { opacity: 1, transform: 'translateY(0)' },
//         config: { mass: 1, tension: 280, friction: 120 },
//     });
//
//     const handleLogin = async (ev) => {
//         ev.preventDefault();
//         setError('');
//         setLoading(true);
//
//         try {
//             const response = await DataService.login({ email, password });
//
//             localStorage.setItem('accessToken', response.data.access);
//             localStorage.setItem('user', JSON.stringify(response.data.user));
//
//             setUser(response.data.user); // Set user data in context
//             setIsLoggedIn(true); // Set isLoggedIn in context
//
//             navigate('/sync-contractor/managementTable');
//         } catch (err) {
//             setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className="login-container"> {/* Added a wrapping div */}
//             {/* Animated Title */}
//             <animated.h1 style={titleSpring}> כניסה למערכת </animated.h1>
//
//             <form className="login-main-container" onSubmit={handleLogin}>
//                 <div className="login-sub-container">
//                     <label className="login-label">אימייל:</label>
//                     <input
//                         type="email"
//                         className="login-input"
//                         placeholder="אימייל"
//                         value={email}
//                         onChange={(ev) => setEmail(ev.target.value)}
//                         disabled={loading}
//                         required
//                     />
//                 </div>
//                 <div className="login-sub-container">
//                     <label className="login-label">סיסמא:</label>
//                     <input
//                         type="password"
//                         className="login-input"
//                         placeholder="סיסמא"
//                         value={password}
//                         onChange={(ev) => setPassword(ev.target.value)}
//                         disabled={loading}
//                         required
//                     />
//                 </div>
//
//                 {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
//
//                 <button
//                     type="submit"
//                     className="login-btn"
//                     disabled={loading}
//                 >
//                     {loading ? 'מתחבר...' : 'היכנס'}
//                 </button>
//
//                 <button
//                     type="button"
//                     className="login-forgot-password"
//                     onClick={() => alert("שכחתי סיסמא עדיין לא מיושם")}
//                     disabled={loading}
//                 >
//                     שכחתי סיסמא
//                 </button>
//             </form>
//         </div>
//     );
// };

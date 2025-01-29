//
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSpring, animated } from 'react-spring';
// import './Home.scss'; // Import your SCSS file
//
// export const Home = () => {
//     const props = useSpring({ opacity: 1, from: { opacity: 0 } });
//
//     return (
//
//         <div className="home-container">
//
//             <div className="hero-section">
//                 <h1>ברוכים הבאים</h1>
//                 <h2>Sync Contractor</h2>
//                 <p>ניהול קבלנים פשוט ויעיל.</p> {/* Add a tagline */}
//             </div>
//
//             <div className="auth-links">
//                 <Link to="/sync-contractor/register" className="auth-link register-link">הרשמה</Link>
//                 <Link to="/sync-contractor/login" className="auth-link login-link">התחברות</Link>
//             </div>
//
//         </div>
//     );
// };


// import React from 'react';
// import { useSpring, animated } from 'react-spring';
// import { Link } from 'react-router-dom';
// import './Home.scss';
//
// export const Home = () => {
//     const fade = useSpring({
//         from: { opacity: 0, transform: 'translateY(-20px)' }, // Start from slightly above and transparent
//         to: { opacity: 1, transform: 'translateY(0)' }, // End at original position and fully opaque
//         config: { duration: 1000 }, // Animation duration in milliseconds (1 second)
//     });
//
//     return (
//         <animated.div className="home-container" style={fade}>
//             <div className="hero-section">
//                 <h1>ברוכים הבאים</h1>
//                 <h2>Sync Contractor</h2>
//                 <p>ניהול קבלנים פשוט ויעיל.</p>
//             </div>
//
//             <div className="auth-links">
//                 <Link to="/sync-contractor/register" className="auth-link">הרשמה</Link>
//                 <Link to="/sync-contractor/login" className="auth-link">התחברות</Link>
//             </div>
//         </animated.div>
//     );
// };

import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import './Home.scss';

export const Home = () => {
    const springProps = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px) scale(0.9) rotate(5deg)' },
        to: { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' },
        config: { mass: 1, tension: 280, friction: 120 }, // Adjust spring physics
    });

    return (
        <animated.div className="home-container" style={springProps}>
            <div className="hero-section">
                <h1>ברוכים הבאים</h1>
                <h2>Sync Contractor</h2>
                <p>ניהול קבלנים פשוט ויעיל</p>
            </div>

            <div className="auth-links">
                <Link to="/sync-contractor/register" className="auth-link">הרשמה</Link>
                <Link to="/sync-contractor/login" className="auth-link">התחברות</Link>
            </div>
        </animated.div>
    );
};


import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import './Home.scss';
import logoImage from '../assets/matash_logo.jpeg';
export const Home = () => {
    const springProps = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px) scale(0.9) rotate(5deg)' },
        to: { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' },
        config: { mass: 1, tension: 280, friction: 120 }, // Adjust spring physics
    });

    return (
        <animated.div className="home-container" style={springProps}>
            <div className="hero-section">
                <img
                    src={logoImage}
                    alt="Logo"
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        maxWidth: '200px',
                        marginBottom: '20px',
                        height: 'auto'
                    }}
                />
                <h1>ברוכים הבאים</h1>
                <h2>Sync Contractor</h2>
                <p>ניהול קבלנים פשוט ויעיל</p>
            </div>

            <div className="auth-links">
{/*                 <Link to="/sync-contractor/register" className="auth-link">הרשמה</Link> */}
                <Link to="/sync-contractor/login" className="auth-link">התחברות</Link>
            </div>
        </animated.div>
    );
};

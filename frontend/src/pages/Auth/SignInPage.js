import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import image2 from '../../assets/images/login_pic1.jpg';
import image1 from '../../assets/images/login_pic2.png';
import image3 from '../../assets/images/login_pic3.png';
import gitIcon from '../../assets/logos/git_png.png';
import googleIcon from '../../assets/logos/google_png.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './SignInPage.css'; // Use a separate CSS file for the Sign-In Page

function SignInPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const images = [image1, image2, image3];

    useEffect(() => {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => 
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // Change image every 5 seconds
    
            return () => clearInterval(interval);
        }, [images.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic form validation
        if (!email || !password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        try {
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Redirect to dashboard
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-slideshow" 
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
                <Link to="/" className="back-to-website-btn">
                    Back to Website →
                </Link>
            </div>
            <div className='doc'>
                <div className="auth-form">
                    <h1>Sign In</h1>
                    <p className="auth-subtext">
                        Don't have an account? <a href="/signup" className='auth-subtext-link'>Sign up</a>
                    </p>

                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                        </div>

                        <div className="form-group password-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Password</label>
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <button type="submit" className="sign-in-btn" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="social-login">
                        <p className="divider">Or sign in with</p>
                        <div className="social-buttons">
                            <SocialButton
                                icon={googleIcon}
                                text="Continue with Google"
                            />
                            <SocialButton
                                icon={gitIcon}
                                text="Continue with GitHub"
                                className="git"
                                style={{ backgroundColor: "white" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SocialButton = ({ icon, text }) => (
    <button type="button" className="social-btn">
        <span className="social-icon">
            <img src={icon} alt="" className="social-icon-img" />
        </span>
        <span>{text}</span>
    </button>
);

export default SignInPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import image1 from '../../assets/pic_6.jpeg';
import image2 from '../../assets/pic_7.jpeg';
import image3 from '../../assets/pic_8.jpeg';
import gitIcon from '../../assets/git_png.png';
import googleIcon from '../../assets/google_png.png';
import './SignUpPage.css';

function SignUpPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();

    const images = [image1, image2, image3];

    // Password validation function
    const validatePassword = (value) => {
        const errors = [];

        if (value.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(value)) {
            errors.push("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(value)) {
            errors.push("Password must contain at least one lowercase letter.");
        }
        if (!/[0-9]/.test(value)) {
            errors.push("Password must contain at least one number.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            errors.push("Password must contain at least one special character.");
        }

        setPasswordErrors(errors);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic form validation
        if (!email || !password || !nickname) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        // Check if password meets all requirements
        if (passwordErrors.length > 0) {
            setError('Please fix the password errors.');
            setLoading(false);
            return;
        }

        try {
            // Create user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store additional user data in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                nickname: nickname,
                email: email,
                createdAt: new Date(),
            });

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
            <div className="auth-slideshow" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}></div>
            <div className='doc'>
                <div className="auth-form">
                    <h1>Create an account</h1>
                    <p className="auth-subtext">
                        Already have an account? <a href="/login" className='auth-subtext-link'>Log in</a>
                    </p>

                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                            <label>Nickname</label>
                        </div>

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

                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                style={{
                                    border: passwordErrors.length > 0 ? "1px solid red" : "1px solid green",
                                }}
                            />
                            <label>Password</label>
                            {passwordErrors.length > 0 && (
                                <ul className="password-error-list">
                                    {passwordErrors.map((error, index) => (
                                        <li key={index} style={{ color: "red" }}>
                                            {error}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {passwordErrors.length === 0 && password.length > 0 && (
                                <p style={{ color: "green" }}>Password is strong!</p>
                            )}
                        </div>

                        <div className="checkbox-group">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I agree to the Terms & Conditions</label>
                        </div>

                        <button type="submit" className="create-account-btn" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                    </form>

                    <div className="social-login">
                        <p className="divider">Or register with</p>
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

export default SignUpPage;
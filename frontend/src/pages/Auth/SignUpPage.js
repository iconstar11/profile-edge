import React, { useEffect, useState } from 'react'
import image1 from '../../assets/pic_6.jpeg';
import image2 from '../../assets/pic_7.jpeg';
import image3 from '../../assets/pic_8.jpeg';
import gitIcon from '../../assets/git_png.png';
import googleIcon from '../../assets/google_png.png';

import './SignUpPage.css'



function SignUpPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        image1,
        image2,
        image3
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="auth-container">
            <div className="auth-slideshow" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}></div>
            <div className='doc'>
            <div className="auth-form">
                <h1>Create an account</h1>
                <p className="auth-subtext">
                    Already have an account? <a href="/login" className='auth-subtext-link'>Log in</a>
                </p>

                <form>
                    <div className="form-group">
                        <input type="text" placeholder="Fletcher" required />
                        <label>Last name</label>
                    </div>

                    <div className="form-group">
                        <input type="email" placeholder="Email" required />
                        <label>Email</label>
                    </div>

                    <div className="form-group">
                        <input type="password" placeholder="Enter your password" required />
                        <label>Password</label>
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to the Terms & Conditions</label>
                    </div>

                    <button type="submit" className="create-account-btn">
                        Create account
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
                            text="Continue with githup"
                            className="git"
                            style={{backgroundColor: "white",}}
                        />
                    </div>
                </div>
            </div>
            </div>
        </div>

    )
}


const SocialButton = ({ icon, text }) => (
    <button type="button" className="social-btn">
        <span className="social-icon">
            <img src={icon} alt="" className="social-icon-img" />
        </span>
        <span>{text}</span>
    </button>
);


export default SignUpPage
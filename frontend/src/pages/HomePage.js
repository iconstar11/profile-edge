// src/components/HomePage.js

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import CSS for styling

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    // Fetch user data from Firestore
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        setNickname(userDoc.data().nickname);
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [currentUser]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner while fetching data
    }
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h1>Tailor Your CV with AI Precision</h1>
        {nickname && <p>Hello, {nickname}!</p>}
        <p>Upload your CV, and let AI optimize it for your dream job in seconds.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
          <Link to="/learn-more" className="btn btn-secondary">Learn More</Link>
          <Link to="/upload" className="btn btn-primary">Get Started</Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Upload your CV (PDF or Word format).</li>
          <li>Enter job details or target keywords.</li>
          <li>Download your tailored CV.</li>
        </ol>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>AI-Driven Customization</li>
          <li>Keyword Optimization for ATS</li>
          <li>Suggestions for Skills and Courses</li>
          <li>Secure and Private</li>
        </ul>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <h2>Pricing</h2>
        <p>Try it for free! Upgrade for more tailored CVs each month.</p>
        <ul>
          <li>Free Plan: 2 CVs/month</li>
          <li>Premium Plan: 7 CVs/month</li>
        </ul>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 AI CV Tailor. All rights reserved.</p>
        <nav>
          <Link to="/about">About Us</Link> | <Link to="/contact">Contact</Link> | <Link to="/privacy">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;

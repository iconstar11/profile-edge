// src/pages/ComingSoon/ComingSoonPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  onSnapshot,
  runTransaction,
  serverTimestamp
} from "firebase/firestore";
import "./ComingSoon.css";

const START_DATE = new Date("2025-10-01T00:00:00"); // progress start
const TARGET_DATE = new Date("2025-10-19T00:00:00"); // launch

const ComingSoon = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState(null);
  const [countdown, setCountdown] = useState({
    days: "--",
    hours: "--",
    mins: "--",
    secs: "--"
  });
  const [progressPct, setProgressPct] = useState(0);
  const [interested, setInterested] = useState(false);
  const [totalInterested, setTotalInterested] = useState(0);
  const [loadingInterest, setLoadingInterest] = useState(true);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else setUser(null);
    });
    return () => unsub();
  }, [auth]);

  // Countdown + progress updater
  useEffect(() => {
    function computeCountdown() {
      const now = new Date();
      const diff = Math.max(0, TARGET_DATE - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, mins, secs });

      const total = TARGET_DATE - START_DATE;
      const elapsed = now - START_DATE;
      let pct = 0;
      if (now <= START_DATE) pct = 0;
      else if (now >= TARGET_DATE) pct = 100;
      else pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
      setProgressPct(Number(pct.toFixed(1)));
    }

    computeCountdown();
    const id = setInterval(computeCountdown, 1000);
    return () => clearInterval(id);
  }, []);

  // Subscribe to the comingSoon document to read totalInterested (fixed doc path)
  useEffect(() => {
    const comingDocRef = doc(db, "features", "comingSoon"); // <-- valid: collection/doc (2 segments)
    const unsubscribe = onSnapshot(
      comingDocRef,
      (snap) => {
        if (snap.exists()) {
          setTotalInterested(snap.data().totalInterested || 0);
        } else {
          setTotalInterested(0);
        }
      },
      (err) => {
        console.error("comingSoon doc onSnapshot error:", err);
      }
    );

    return () => unsubscribe();
  }, [db]);

  // Listen for this user's interest doc in the subcollection
  useEffect(() => {
    if (!user) {
      setInterested(false);
      setLoadingInterest(false);
      return;
    }

    const userInterestRef = doc(
      db,
      "features",
      "comingSoon",
      "interestedUsers",
      user.uid
    );

    const unsub = onSnapshot(
      userInterestRef,
      (snap) => {
        setInterested(snap.exists());
        setLoadingInterest(false);
      },
      (err) => {
        console.error("user interest onSnapshot error:", err);
        setLoadingInterest(false);
      }
    );

    return () => unsub();
  }, [db, user]);

  // Toggle interest (create/delete interestedUsers/{uid} and atomically update features/comingSoon.totalInterested)
  const handleToggleInterest = async () => {
    if (!user) return;
    setLoadingInterest(true);

    const userDocRef = doc(
      db,
      "features",
      "comingSoon",
      "interestedUsers",
      user.uid
    );
    const comingDocRef = doc(db, "features", "comingSoon"); // document that will hold totalInterested

    try {
      await runTransaction(db, async (tx) => {
        const userSnap = await tx.get(userDocRef);
        const comingSnap = await tx.get(comingDocRef);

        const currentCount = comingSnap.exists()
          ? comingSnap.data().totalInterested || 0
          : 0;

        if (userSnap.exists()) {
          // remove interest
          tx.delete(userDocRef);
          tx.set(comingDocRef, { totalInterested: Math.max(0, currentCount - 1) }, { merge: true });
        } else {
          // add interest
          tx.set(userDocRef, {
            email: user.email || null,
            uid: user.uid,
            ts: serverTimestamp()
          });
          tx.set(comingDocRef, { totalInterested: (currentCount || 0) + 1 }, { merge: true });
        }
      });
      // onSnapshot listeners will update UI
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Could not update interest. Try again.");
    } finally {
      setLoadingInterest(false);
    }
  };

  return (
    <div className="coming-soon-root">
      <div className="coming-soon-hero">
        <div className="coming-icon">
          <div className="icon-circle">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z" stroke="var(--primary-accent)" strokeWidth="1.5"/>
              <path d="M4 20C6.5 18.5 9.5 17.8 12 17.8C14.5 17.8 17.5 18.5 20 20" stroke="var(--primary-accent)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <h1 className="coming-title">Coming Soon</h1>
        <p className="coming-sub">We're working hard — launching on <strong>October 19, 2025</strong>.</p>
      </div>

      <main className="coming-main">
        <section className="countdown-card">
          <div className="countdown-header">
            <span className="clock-emoji">🕒</span>
            <h3>Launch Countdown</h3>
          </div>

          <div className="countdown-grid">
            <div className="count-box">
              <div className="count-num">{countdown.days}</div>
              <div className="count-label">Days</div>
            </div>
            <div className="count-box">
              <div className="count-num">{countdown.hours}</div>
              <div className="count-label">Hours</div>
            </div>
            <div className="count-box">
              <div className="count-num">{countdown.mins}</div>
              <div className="count-label">Minutes</div>
            </div>
            <div className="count-box">
              <div className="count-num">{countdown.secs}</div>
              <div className="count-label">Seconds</div>
            </div>
          </div>

          <div className="progress-wrap">
            <div className="progress-bar">
              <div
                className="progress-fill-green"
                style={{ width: `${Math.min(progressPct, 100)}%` }}
              />
            </div>
            <div className="progress-text">{progressPct}% Complete</div>
          </div>
        </section>

        <section className="interest-card">
          <h3>Interested in this feature?</h3>
          <p className="interest-sub">Let us know you're excited! We'll prioritize based on interest.</p>

          <div className="interest-actions">
            <button
              className={`primary interest-btn ${interested ? "active" : ""}`}
              onClick={handleToggleInterest}
              disabled={loadingInterest}
            >
              {interested ? "👍 Interested" : "👍 I'm Interested"}
            </button>

            <div className="interest-count">
              <span className="thumb">👍</span>
              <strong style={{ marginLeft: 8 }}>{totalInterested}</strong>
              <span style={{ marginLeft: 8 }}>people interested</span>
            </div>
          </div>
        </section>

        <section className="explore-actions">
          <p>In the meantime, explore other features</p>
          <div className="explore-buttons">
            <Link to="/input">
              <button className="secondary">Tailor CV</button>
            </Link>
            <Link to="/jobs">
              <button className="secondary">Find Jobs</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};


export default ComingSoon;

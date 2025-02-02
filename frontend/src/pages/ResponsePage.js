import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResponsePage.css';

const ResponsePage = () => {
  const location = useLocation();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Utility function to clean the response data
  const cleanResponseData = (data) => {
    return data
      .replace(/\*\*/g, '') // Remove **
      .replace(/###/g, '')  // Remove ###
      .trim();              // Trim any leading/trailing whitespace
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const { documentId, userId } = location.state || {};

        if (!documentId || !userId) {
          throw new Error("Missing document ID or user ID");
        }

        const response = await fetch(
          `http://localhost:5000/api/get-response/${documentId}`,
          {
            headers: {
              "X-User-Id": userId,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch response");
        }

        const data = await response.json();
        setResponseData(cleanResponseData(data.deepSeekResponse));
      } catch (err) {
        console.error("Error fetching response:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [location.state]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="response-page">
      <h1>Your Polished CV</h1>
      <div className="response-content">
        {responseData ? (
          <div className="formatted-response">
            {responseData.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ) : (
          <p>No response data available.</p>
        )}
      </div>
    </div>
  );
};

export default ResponsePage;
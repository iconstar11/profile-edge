import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResponsePage.css';

const ResponsePage = () => {
  const location = useLocation();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch response");
        }

        const data = await response.json();
        setResponseData(data.deepSeekResponse);
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
          <pre>{responseData}</pre>
        ) : (
          <p>No response data available.</p>
        )}
      </div>
    </div>
  );
};

export default ResponsePage;
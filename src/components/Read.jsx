import React, { useEffect, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ScanAfter from "./ScanAfter";

const Read = () => {
  const { slug } = useParams(); // Get slug from URL
  const Auth = useAuth(); // Get authentication context
  const [analysisData, setAnalysisData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Fetch data only if slug and token are available
    if (!slug || !Auth?.user?.token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching data for slug:", slug);

        const apiUrl = `${import.meta.env.VITE_BASE_URL}/process/read/${slug}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Auth.user.token}`, // Add token to request header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Data fetched successfully:", result.data);

        setAnalysisData(result.data.data); // Update state with fetched data
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, Auth?.user?.token]); // Dependencies for effect

  return (
    <MobileNavigation>
        <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && analysisData && (
            <>
            <ScanAfter analysisData={analysisData} />
            </>
        )}
        </div>
    </MobileNavigation>
  );
};

export default Read;

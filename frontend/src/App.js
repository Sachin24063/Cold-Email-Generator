import React, { useState } from "react";
import JobLinkInput from "./components/JobLinkInput";
import JobResults from "./components/JobResults";
import "./styles.css";

const App = () => {
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleJobSearch = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate_email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      setJobData(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>📧 Cold Mail Generator</h1>
      <JobLinkInput onSearch={handleJobSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <JobResults jobData={jobData} />
      )}
    </div>
  );
};

export default App;

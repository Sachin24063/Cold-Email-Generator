import React from "react";

const JobResults = ({ jobData }) => {
  const handleCopy = (emailContent) => {
    navigator.clipboard.writeText(emailContent);
    alert("Email copied to clipboard!");
  };

  if (!jobData || jobData.length === 0) {
    return <p>No emails generated yet. Submit a job link above!</p>;
  }

  return (
    <div style={{ width: "100%", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Generated Email</h2>
      <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {jobData.map((item, index) => (
          <li
            key={index}
            style={{
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
              width: "90%", // Use full width of the parent container
            }}
          >
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
              }}
            >
              {item.email}
            </p>
            <button
              onClick={() => handleCopy(item.email)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobResults;

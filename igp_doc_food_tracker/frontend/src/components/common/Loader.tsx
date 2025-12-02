export default function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div
        style={{
          width: "2.5rem",
          height: "2.5rem",
          margin: "0 auto",
          border: "4px solid #ccc",
          borderTop: "4px solid #0077cc",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p>Loading...</p>
      <style>
        {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
      </style>
    </div>
  );
}

type PlaceholderPageProps = {
  title?: string;
  message?: string;
};

export default function PlaceholderPage({
  title = "Coming Soon",
  message = "I'm still working on this page — check back later!",
}: PlaceholderPageProps) {
  return (
    <div className="app-container">
      <main
        className="container"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#222" }}>
          {title}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>{message}</p>

        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "inline-block",
              width: "3rem",
              height: "3rem",
              border: "4px solid #ddd",
              borderTop: "4px solid #0077cc",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </main>
    </div>
  );
}

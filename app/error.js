"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Something went wrong</h1>
      <p>Please try again later.</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}

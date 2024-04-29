"use client";

export default function ApiQueryButton() {
  return (
    <>
      <br />
      <button className="btn" onClick={(e) => console.log(e)}>
        Test Server
      </button>
      <br />
      <br />
      <span>Filter Options:</span>
      <br />
    </>
  );
}

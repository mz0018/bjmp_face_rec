import React from "react";
import { Link } from "react-router-dom";

const Front = () => {
  return (
    <main className="p-4 flex flex-col items-center justify-center h-screen text-center">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">BJMP Visitor Biometrics</h1>
        <p className="text-gray-700">Choose an option to continue.</p>
      </header>

      <section className="flex gap-6">
        <Link to="/verification">
          <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-lg shadow-md">
            Verification Camera
          </button>
        </Link>

        <Link to="/signin">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-lg shadow-md">
            Go to Dashboard
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Front;

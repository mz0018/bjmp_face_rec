import React from "react";
import { Link } from "react-router-dom";
import useFrontPageHook from "./hooks/useFrontPageHook";

const Front = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const FLASK_URL = import.meta.env.VITE_FLASK_URL || "http://127.0.0.1:5000";

  const {
    recognizedName,
    recognizedStudentName,
    isLoading,
    videoRef,
    canvasRef,
    guideCanvasRef,
    handleRecognize
  } = useFrontPageHook(API_URL, FLASK_URL);

  return (
    <main className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">BJMP Visitor Biometrics</h1>
        <p className="text-gray-700">Real-time visitor recognition and attendance recording using biometric face detection.</p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Live Camera Feed</h2>
        <div className="relative w-[640px] h-[480px]">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            width="640" 
            height="480" 
            title="Live camera feed for visitor recognition"
            className="w-full h-full object-cover rounded-md"
          ></video>

          <canvas 
            ref={guideCanvasRef} 
            width="640" 
            height="480" 
            className="absolute top-0 left-0 pointer-events-none"
            aria-hidden="true"
          ></canvas>

          {isLoading && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-lg font-semibold">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-2"></div>
                Verifying...
              </div>
            </div>
          )}
        </div>

        <canvas 
          ref={canvasRef} 
          width="640" 
          height="480" 
          className="hidden"
          aria-hidden="true"
        ></canvas>
      </section>

      <section className="mb-6">
        <p className="text-2xl capitalize"><strong>Visitor's Name:</strong> {recognizedStudentName}</p>
        <p className="text-2xl"><strong>Username:</strong> {recognizedName}</p>
      </section>

      <section className="flex gap-4">
        <button 
          disabled={isLoading}
          onClick={handleRecognize}
          aria-label="Recognize visitor face"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Recognize Face
        </button>

        <Link to="/Signin">
          <button 
            aria-label="Go to Dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Front;

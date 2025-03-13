import Link from "next/link";
import React from "react";

const WelcomeComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg max-w-md">
        Explore our platform and discover amazing features designed to enhance your experience.
      </p>
      <Link href={"/login"} className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition">
        Get Started
      </Link>
    </div>
  );
};

export default WelcomeComponent;

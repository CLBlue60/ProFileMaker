import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 border-t mt-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ProFileMaker. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link to="/terms-of-service" className="text-gray-600 hover:text-blue-600">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
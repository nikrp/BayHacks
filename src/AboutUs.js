import logo from './Logo.png';
import './output.css';
import { motion } from "framer-motion";
import { useViewportScroll } from "framer-motion";
import { useTransform } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme="light">
    

      {/* Main Content */}
      
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-10 m-12">
          <h2 className="text-3xl text-info-600 font-bold mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            StudySphere is committed to enhancing the educational experience of students worldwide. Our platform connects learners with tools and resources tailored to their individual needs, making the learning process more interactive, accessible, and effective.
          </p>

          <h2 className="text-2xl text-info-600 font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our mission is to empower students through innovative technology and personalized learning experiences. We believe that education should be engaging, equitable, and accessible to all, and we strive to make this a reality through our platform.
          </p>

          <h2 className="text-2xl text-info-600 font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li className="mb-2">Innovation in Learning</li>
            <li className="mb-2">Accessibility for All</li>
            <li className="mb-2">Collaboration and Community</li>
            <li className="mb-2">Commitment to Excellence</li>
          </ul>
        </div>
      

      {/* Footer */}
      <footer className="bg-info-600 text-white py-4 mt-10">
        <div className="flex justify-center text-gray-900 items-center">
          <p>&copy; 2024 StudySphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import ReviewWizard from "./pages/ReviewWizard";

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/compare" element={<Browse />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/resources" element={<Analytics />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/submit-review" element={<ReviewWizard />} />
              
              {/* Fallback redirection */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}

"use client";

import Location from '../../components/Location';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-28 pb-16"> {/* Add padding top to account for fixed header */}
        <Location />
      </div>
      <Footer />
    </div>
  );
}
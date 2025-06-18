'use client';
import Link from 'next/link';
import { useState } from 'react';
import CustomersPage from '../components/Customers/page';
import StylePage from '../components/Style/page';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';


export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <main>
      <Header />

      {/* Optional announcement logic if needed */}
      {showAnnouncement && (
        <div style={{ background: '#ffefc5', padding: '10px', textAlign: 'center' }}>
          <p>This is an announcement bar. <button onClick={() => setShowAnnouncement(false)}>Dismiss</button></p>
        </div>
      )}
      <CustomersPage />
      <StylePage />

      <Footer />
    </main>
  );
}

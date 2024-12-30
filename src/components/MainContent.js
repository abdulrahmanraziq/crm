// src/components/MainContent.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerList from './Customers';
import Communications from './Communications';
import Feedback from './Feedback';
import Analytics from './Analytics';


export const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/communications" element={<Communications />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/analytics" element={<Analytics />} />
        
      </Routes>
    </div>
  );
};

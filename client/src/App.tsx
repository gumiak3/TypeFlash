import React from 'react';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignIn/SignInPage';
export default function App() {
  return (
    <main className="min-h-screen text-white m-auto max-w-screen-lg">
      <header className="m-4 flex">
        <h1 className="text-4xl max-[340px]:text-3xl font-bold">TypeFlash</h1>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignInPage />} />
      </Routes>
    </main>
  );
}

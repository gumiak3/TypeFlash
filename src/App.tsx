import React from 'react';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
export default function App(){
    return (
        <main className="min-h-screen text-white m-auto max-w-7xl">
            <header className="m-4 flex">
                <h1 className="text-4xl font-bold">TypeFlash</h1>
                <Navbar/>
            </header>
            <Home/>
        </main>
    )
}
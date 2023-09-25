import React from 'react';
import Home from './pages/Home/Home';
export default function App(){
    return (
        <main className="min-h-screen text-white m-auto max-w-7xl">
            <header className="m-4">
                <h1 className="text-4xl font-bold">TypeFlash</h1>
            </header>
            <Home/>
        </main>
    )
}
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogoClick = () => {
        navigate('/'); // Navigate to the GameSetup page
    };

    return (
        <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 p-4 md:px-12 sticky top-0 z-50">
            <div onClick={handleLogoClick} className="cursor-pointer max-w-7xl mx-auto flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <i className="fas fa-gamepad text-white text-xl"></i>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                    Game
                </h1>
            </div>
        </header>
    );
};

export default Header;


import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogoClick = () => {
        navigate('/'); // Navigate to the GameSetup page
    };

    return (
        <header className="bg-bgDarkPrimary border-b-4 border-limeGreen p-4 md:px-12">
            <div onClick={handleLogoClick} className="cursor-pointer  max-w-[1140px] m-auto"> {/* Add click handler */}
                <h1 className="logo text-textLightPrimary">
                    <i className="fas fa-gamepad"></i> Game
                </h1>
            </div>
        </header>
    );
};

export default Header;


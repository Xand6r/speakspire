import React from "react";
import "./loadingScreen.scss";
import Logo from  "./Logo.svg";

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <img src={Logo} alt="logo" />
        </div>
    );
};

export default LoadingScreen;

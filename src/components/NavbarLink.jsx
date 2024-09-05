import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, HelpCircle } from "lucide-react";
import "../styles/navbarLink.css";

const iconMap = {
  Home: Home,
  Logout: LogOut,
};

export const NavbarLink = ({ link, text }) => {
  const Icon = iconMap[text] || HelpCircle;
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (text === "Logout") {
      localStorage.removeItem("authToken");;
      window.location.href="./login"
    }
  };

  return (
    <Link to={link} className="nl-menu-link" onClick={text === "Logout" ? handleClick : null}>
      <Icon className="nl-menu-icon" />
      <span>{text}</span>
    </Link>
  );
};

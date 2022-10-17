import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import { Route, Routes, useNavigate, Link } from "react-router-dom";




function Header() {
    const navigate = useNavigate();

    return (
        <div className='header'>
            <img 
                className="header__icon"
                src="./logo.png"
                alt=""
                onClick={() => navigate("/")}
            />

            <div className='header__center'>
                <input type="text" />
                <SearchIcon />
            </div>

            <div className='header__right'>
            <IconButton size="small" component={Link} to="/login">
                <p>Login</p>
              </IconButton>
              <div className="sadSlash">/</div>
              <IconButton size="small" component={Link} to="/signup">
                <p>Sign-Up</p>
              </IconButton>
                <PersonIcon />
            </div>
        </div>
    )
}

export default Header;
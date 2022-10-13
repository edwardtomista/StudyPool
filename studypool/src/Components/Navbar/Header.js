import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

function Header() {
    return (
        <div className='header'>
            <img 
                className="header__icon"
                src="./logo.png"
                alt=""
            />

            <div className='header__center'>
                <input type="text" />
                <SearchIcon />
            </div>

            <div className='header__right'>
                <p>LOGIN/SIGN-UP</p>
                <PersonIcon />
            </div>
        </div>
    )
}

export default Header;
import React from 'react';
import './Banner.css';
import { Button } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";

function Banner() {
    const navigate = useNavigate();
    return (
        <div className='banner'>
            <div className='banner__info'>
                <h1>Collaborate and accel with your fellow classmates!</h1>
                <h5>Find your class, host, or join study sessions.</h5>
                <Button variant='outlined' onClick={() => navigate("/Catalog")}
                >Classes</Button>
            </div>

            <img 
                className="banner__image"
                src="./classroom.png"
                alt=""
                
            />

        </div>    
    )
}

export default Banner;
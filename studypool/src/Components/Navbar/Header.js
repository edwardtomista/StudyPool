import React, { useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { logout } from "../../Backend/Auth";
import Button from "@mui/material/Button";
function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const handleLogout = () => {
        logout();
        setUser({
            id: "",
            fname: "",
            lname: "",
            email: "",
        });
        navigate("/");
    };
    return (
        <div className="header">
            <Button disableRipple={true}>
                <img
                    className="header__icon"
                    src="./logo.png"
                    alt=""
                    onClick={() => navigate("/")}
                />
            </Button>

            <div className="header__center">
                <input type="text" />
                <SearchIcon />
            </div>
            <div className="header__right">
                {user.id ? (
                    <>
                        <IconButton size="small" onClick={() => handleLogout()}>
                            <p>Logout</p>
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => navigate("/Account")}
                        >
                            <PersonIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton size="small" component={Link} to="/login">
                            <p>Login</p>
                        </IconButton>

                        <div className="sadSlash">/</div>
                        <IconButton size="small" component={Link} to="/signup">
                            <p>Sign-Up</p>
                        </IconButton>
                        <PersonIcon></PersonIcon>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;

import "./App.css";
import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Header from "./Components/Navbar/Header";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import StudyGroup from "./Pages/StudyGroup";
import Catalog from "./Pages/Catalog";
import Groups from "./Pages/Groups";
import Account from "./Pages/Account";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getSession } from "./Backend/Auth";

function App() {
    //renderDone used to avoid pages rendering/updating twice on manual refresh
    //Example: Header showing Login/Signup for a split second before rendering as Logout
    //         when the user is logged in
    const [renderDone, setRenderDone] = useState(false);
    const [user, setUser] = useState({
        id: "",
        fname: "",
        lname: "",
        email: "",
    });
    // every time the page reloads run this
    // get whether or not the user is logged in or not

    useEffect(() => {
        setRenderDone(
            getSession()
                .then((session) => {
                    setUser({
                        id: session.idToken.payload.sub,
                        fname: session.idToken.payload.given_name,
                        lname: session.idToken.payload.family_name,
                        email: session.idToken.payload.email,
                    });
                })
                .catch((err) => {})
        );
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {renderDone ? (
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/Catalog" element={<Catalog />} />
                        <Route path="/Groups" element={<Groups />} />
                        <Route path="/StudyGroup" element={<StudyGroup />} />
                        <Route path="/Account" element={<Account />} />
                    </Routes>
                </div>
            ) : (
                <></>
            )}
        </UserContext.Provider>
    );
}

export default App;

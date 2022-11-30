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
    const [user, setUser] = useState(null);
    // every time the page reloads run this
    // get whether or not the user is logged in or not
    useEffect(() => {
        getSession()
            .then((session) => {
                setUser({
                    id: session.idToken.payload.sub,
                    fname: session.idToken.payload.given_name,
                    lname: session.idToken.payload.family_name,
                    email: session.idToken.payload.email,
                });
            })
            .catch((err) => {
                setUser({
                    id: "",
                    fname: "",
                    lname: "",
                    email: "",
                });
            });
    }, []);

    return (
        <>
            {user ? (
                <UserContext.Provider value={{ user, setUser }}>
                    <div className="App">
                        <Header />

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/Login" element={<Login />} />
                            <Route path="/SignUp" element={<SignUp />} />
                            <Route path="/Catalog" element={<Catalog />} />
                            <Route path="/Groups" element={<Groups />} />
                            <Route
                                path="/StudyGroup"
                                element={<StudyGroup />}
                            />
                            <Route path="/Account" element={<Account />} />
                        </Routes>
                    </div>
                </UserContext.Provider>
            ) : (
                <></>
            )}
        </>
    );
}

export default App;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signup } from "../Backend/Auth";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../links";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                StudyPool Team
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [invalid, setInvalid] = React.useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    });
    const [errorText, setErrorText] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     firstName: data.get("firstName"),
        //     lastName: data.get("lastName"),
        //     email: data.get("email"),
        //     password: data.get("password"),
        // });
        setErrorText("");
        setInvalid({
            firstName: false,
            lastName: false,
            email: false,
            password: false,
        });
        const fName = data.get("firstName");
        const lName = data.get("lastName");
        const email = data.get("email");
        const password = data.get("password");

        signup(
            data.get("firstName"),
            data.get("lastName"),
            data.get("email"),
            data.get("password")
        )
            .then((data) => {
                // console.log("it work");
                // console.log(data);

                fetch(backend_url + "/signup", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        id: data.userSub,
                        f_name: fName,
                        l_name: lName,
                        email: data.user.username,
                    }),
                });

                navigate("/Login");
                //Redirect to a page telling the user to check for verification email
                //Redirect to login page after 3-5 seconds probably?
            })
            .catch((err) => {
                //console.log("Sign up error");
                console.log(err);
                //Can try error handling here
                /**
                 * fName, lName, email, password
                 * errorText, setErrorText
                 * invalid, setInvalid({firstName: false, lastName: false, email: false, password: false})
                 */
                let tmp = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                };
                let tmp2 = {
                    firstName: false,
                    lastName: false,
                    email: false,
                    password: false,
                };
                if (fName && lName && email && password) {
                    if (
                        err.message.includes(
                            "An account with the given email already exists"
                        ) ||
                        err.message.includes("User already exists")
                    ) {
                        tmp.email =
                            "An account with the given email already exists";
                        tmp2.email = true;
                    } else if (
                        err.message.includes("email") ||
                        err.message.includes("username")
                    ) {
                        tmp.email = "Please enter a valid email";
                        tmp2.email = true;
                    } else {
                        tmp.password =
                            "Your password must be at least 8 characters long, contain at least one number, one special character, and have a mixture of uppercase and lowercase letters.";
                        tmp2.password = true;
                    }
                } else {
                    if (!fName) {
                        tmp.firstName = "Please enter your first name";
                        tmp2.firstName = true;
                    }
                    if (!lName) {
                        tmp.lastName = "Please enter your last name";
                        tmp2.lastName = true;
                    }
                    if (!email) {
                        tmp.email = "Please enter your email";
                        tmp2.email = true;
                    }
                    if (!password) {
                        tmp.password = "Please enter your password";
                        tmp2.password = true;
                    }
                }
                setErrorText(tmp);
                setInvalid(tmp2);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={invalid.firstName}
                                    helperText={errorText.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    error={invalid.lastName}
                                    helperText={errorText.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={invalid.email}
                                    helperText={errorText.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={invalid.password}
                                    helperText={errorText.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

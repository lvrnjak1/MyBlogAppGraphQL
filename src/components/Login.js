// import React from "react";
// import "../css/loginStyle.css";
import { Link as Linkk } from "react-router-dom";
import { Mutation } from "react-apollo";
import * as Constants from "../constants/Constants.js";
import { saveUserData, saveUserToken } from "./Utils.js";

// const initialState = {
//   username: "",
//   password: "",
//   errorMessage: "",
// };

// export default class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = initialState;
//     localStorage.clear();
//   }

//   render() {
//     return (
//       <div className="centerH">
//         <Mutation
//           mutation={Constants.LOGIN_MUTATION}
//           update={this.update}
//           onError={this.showError}
//         >
//           {(signIn) => (
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 signIn({
//                   variables: {
//                     authData: {
//                       username: this.state.username,
//                       password: this.state.password,
//                     },
//                   },
//                 });
//                 this.setState({
//                   errorMessage: "",
//                 });
//               }}
//             >
//               <h2>Login</h2>
//               <div>
//                 <input
//                   placeholder="username"
//                   name="username"
//                   onChange={this.handleChange}
//                   value={this.state.username}
//                 ></input>
//                 <br></br>
//               </div>
//               <div>
//                 <input
//                   placeholder="passsword"
//                   type="password"
//                   name="password"
//                   onChange={this.handleChange}
//                   value={this.state.password}
//                 ></input>
//                 <br></br>
//                 <label className="error">{this.state.errorMessage}</label>
//               </div>
//               <div>
//                 <button type="submit" className="red">
//                   Log in
//                 </button>
//               </div>
//               <div className="label">
//                 <label>Don't have an account? </label>
//               </div>
//               <Link to="/register">
//                 <button className="orange">Register</button>
//               </Link>
//             </form>
//           )}
//         </Mutation>
//       </div>
//     );
//   }
// }

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { red } from "@material-ui/core/colors";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Lamija Vrnjak
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "#ff5252",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setErrorMessage("");
    if (event.target.name === "username") {
      setUsername(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const update = (cache, data) => {
    saveUserData(data.data.signIn.account);
    saveUserToken(data.data.signIn.token);
    props.history.push("/dashboard", {
      loggedIn: true,
      token: data.data.signIn.token,
    });
  };

  const showError = () => {
    setUsername("");
    setPassword("");
    setErrorMessage("Invalid username or password");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Mutation
          mutation={Constants.LOGIN_MUTATION}
          update={update}
          onError={showError}
        >
          {(signIn) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signIn({
                  variables: {
                    authData: {
                      username: username,
                      password: password,
                    },
                  },
                });
                setErrorMessage("");
              }}
              className={classes.form}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                value={username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
              <Typography component="label" className={classes.error}>
                {errorMessage}
              </Typography>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Linkk to="/register">
                    {"Don't have an account? Register"}
                  </Linkk>
                </Grid>
              </Grid>
            </form>
          )}
        </Mutation>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

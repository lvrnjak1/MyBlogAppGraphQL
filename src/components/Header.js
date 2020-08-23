import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { getUser } from "./Utils";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: `1em`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const title = "BLOG";
  const account = JSON.parse(getUser());

  const logout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const goToMyProfile = () => {
    props.history.push("/profile/" + account.user.username, {
      isMyProfile: true,
    });
  };

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Button size="small" color="primary" onClick={goToMyProfile}>
          {account.name} {account.surname}
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button
          variant="contained"
          size="small"
          onClick={logout}
          classname={classes.submit}
          color="primary"
        >
          Log out
        </Button>
      </Toolbar>
    </div>
  );
}

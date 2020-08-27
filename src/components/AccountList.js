import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { getUser } from "./Utils";

const useStyles = makeStyles({
  tile: {
    marginTop: "0.5em",
  },
  gridList: {
    maxHeight: 300,
  },
});

export default function AccountList(props) {
  const currentUser = JSON.parse(getUser());
  const classes = useStyles();
  return (
    <div style={{ textAlign: "center" }}>
      <Typography style={{ display: "block" }} component="h5" color="primary">
        {props.title} {`(${props.count})`}
      </Typography>
      <Card variant="outlined" className={classes.tile}>
        <GridList cellHeight={50} cols={1} className={classes.gridList}>
          {props.list.map((follower) => (
            <GridListTile key={follower.id} className={classes.tile}>
              <Link
                to={{
                  pathname: `/profile/${follower.user.username}`,
                  state: {
                    isMyProfile:
                      follower.user.username === currentUser.user.username,
                    id: follower.id,
                  },
                }}
                className="link"
              >
                <Typography component="label">
                  {follower.name} {follower.surname}{" "}
                </Typography>
                <Typography component="label" color="textSecondary">
                  {follower.user.username}
                </Typography>
              </Link>
            </GridListTile>
          ))}
        </GridList>
      </Card>
    </div>
  );
}

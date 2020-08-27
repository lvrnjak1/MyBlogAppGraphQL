import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import * as Constants from "../constants/Constants.js";
import { useMutation } from "react-apollo";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  blue: {
    backgroundColor: "#f123d",
  },
});

export default function ProfileSnippet(props) {
  const classes = useStyles();

  const [toggleFollow] = useMutation(Constants.TOGGLE_FOLLOW, {
    // onCompleted(data) {
    //   // setAccount({
    //   //   ...props.account,
    //   //   isFollowedByLoggedInAccount: !account.isFollowedByLoggedInAccount,
    //   // });
    // },
  });

  const handleFollow = async (e, id) => {
    e.preventDefault();
    await toggleFollow({
      variables: { followeeId: id },
    });
  };

  return (
    <div>
      <Card className={classes.card} variant="outlined">
        <div>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography component="h2" variant="h5">
                {props.account.name} {props.account.surname} (
                {props.account.username})
              </Typography>
              {!props.isMyProfile ? (
                <IconButton onClick={(e) => handleFollow(e, props.account.id)}>
                  {props.account.isFollowedByLoggedInAccount ? (
                    <RemoveCircleOutlineIcon color="primary"></RemoveCircleOutlineIcon>
                  ) : (
                    <AddCircleOutlineOutlinedIcon color="primary"></AddCircleOutlineOutlinedIcon>
                  )}
                </IconButton>
              ) : (
                ""
              )}
            </div>
            <Typography variant="subtitle1" color="textSecondary">
              {props.account.email}
            </Typography>
            <Typography component="label">{props.account.bio} </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

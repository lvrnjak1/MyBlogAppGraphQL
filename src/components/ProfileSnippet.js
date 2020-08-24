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
  const [account, setAccount] = useState(props.account);

  const [toggleFollow] = useMutation(Constants.TOGGLE_FOLLOW, {
    onCompleted(data) {
      setAccount({
        ...account,
        isFollowedByLoggedInAccount: !account.isFollowedByLoggedInAccount,
      });
    },
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
                {account.name} {account.surname} ({account.username})
              </Typography>
              {!props.isMyProfile ? (
                <IconButton onClick={(e) => handleFollow(e, account.id)}>
                  {account.isFollowedByLoggedInAccount ? (
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
              {account.email}
            </Typography>
            <Typography component="label">{account.bio} </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

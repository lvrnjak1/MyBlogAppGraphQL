import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     name: this.props.account.name,
  //     surname: this.props.account.surname,
  //     username: this.props.account.username,
  //     bio: this.props.account.bio,
  //     followers: this.props.account.followers,
  //     following: this.props.account.following,
  //   };
  // }
  const classes = useStyles();
  const [account] = useState(props.account);

  return (
    <div>
      <Card className={classes.card} variant="outlined">
        <div>
          <CardContent>
            <Typography component="h2" variant="h5">
              {account.name} {account.surname} ({account.username})
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {account.email}
            </Typography>
            <Typography variant="label">{account.bio} </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
    // <div className="profile_container">
    //   <img src={Avatar} alt="avatar"></img>
    //   <div className="other">
    //     <h3>name: {this.state.name}</h3>
    //     <h3>surname: {this.state.surname}</h3>
    //     <h3>username: {this.state.username}</h3>
    //   </div>
    //   <div className="clear bio">
    //     <p className="prompt">About me:</p>
    //     <p>{this.state.bio}</p>
    //   </div>
    //   <div className="account_list">
    //     <button className="orange bold" onClick={this.props.getFollowing}>
    //       <p className="prompt">Following: {this.state.following}</p>
    //     </button>
    //     <button className="red bold" onClick={this.props.getFollowers}>
    //       <p className="prompt">Followers: {this.state.followers}</p>
    //     </button>
    //   </div>
    // </div>
  );
}

import React from "react";
import * as Constants from "../constants/Constants.js";
import { useQuery } from "react-apollo";
import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { getModalStyle } from "./Utils";
import AccountList from "./AccountList.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LikeList(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [modalList, setModalList] = useState([]);
  const [postId] = useState(props.modalId);
  const [modalOpened, setModalOpened] = useState(false);

  //   const [getPostLikes, { loading, data }] = useLazyQuery(
  //     Constants.GET_POST_LIKES,
  //     {
  //       onCompleted(data) {
  //         setModalList(data.post.likes.map((like) => like.account));
  //         setModalOpened(true);
  //       },
  //     }
  //   );

  useQuery(Constants.GET_POST_LIKES, {
    variables: { postId },
    onCompleted(data) {
      setModalList(data.post.likes.map((like) => like.account));
      setModalOpened(true);
    },
  });

  //   const openModal = (postId) => {
  //     getPostLikes({
  //       variables: { postId: postId },
  //     });
  //   };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <AccountList list={modalList} count={modalList.length} title="Liked by" />
    </div>
  );

  return (
    <div className="background">
      <Modal
        open={modalOpened}
        onClose={() => {
          setModalList([]);
          setModalOpened(false);
          props.setModalOpened(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
}

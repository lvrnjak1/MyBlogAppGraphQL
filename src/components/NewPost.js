import React, { useState } from "react";
import "../css/newPost.css";
import * as Constants from "../constants/Constants.js";
import { Mutation } from "react-apollo";

// export default class NewPost extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="new-post">
//         <Mutation mutation={Constants.NEW_POST}>
//           {(addPost) => (
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 addPost({variables: {post: }})
//               }}
//             ></form>
//           )}
//         </Mutation>
//       </div>
//     );
//   }
// }

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleErroMessage, setTitleErrorMessage] = useState("");
  const [bodyErrorMessage, setBodyErrorMessage] = useState("");
  const [publishedMessage, setPublishedMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
    setTitleErrorMessage("");
    setBodyErrorMessage("");
    setPublishedMessage("");
  };

  const isValid = () => {
    let valid = true;
    if (!title.length) {
      setTitleErrorMessage("Title can't be empty");
      valid = false;
    }

    if (!body.length) {
      setBodyErrorMessage("Body can't be empty");
      valid = false;
    }

    return valid;
  };

  return (
    <div className="new-post">
      <Mutation mutation={Constants.NEW_POST}>
        {(addPost) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isValid()) {
                addPost({
                  variables: {
                    post: {
                      title: title,
                      body: body,
                      dateTimePosted: new Date().getTime(),
                    },
                  },
                });
                setTitle("");
                setBody("");
                setPublishedMessage("Post successfully published");
              } else {
                setPublishedMessage("");
              }
            }}
          >
            <h3>New post</h3>
            <input
              placeholder="title"
              name="title"
              onChange={handleChange}
              value={title}
            ></input>
            <br></br>
            <label className="error">{titleErroMessage}</label>
            <br></br>
            <textarea
              placeholder="body"
              name="body"
              onChange={handleChange}
              value={body}
            ></textarea>
            <br></br>
            <label className="error">{bodyErrorMessage}</label>
            <button type="submit">Publish</button>
            <label className="white">{publishedMessage}</label>
          </form>
        )}
      </Mutation>
    </div>
  );
}

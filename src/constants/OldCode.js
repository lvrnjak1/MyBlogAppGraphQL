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

// const initialState = {
//   username: "",
//   password: "",
//   email: "",
//   name: "",
//   surname: "",
//   bio: "",
//   usernameErrorMessage: "",
//   passwordErrorMessage: "",
//   emailErrorMessage: "",
//   nameErrorMessage: "",
//   surnameErrorMessage: "",
// };

// export default class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = initialState;
//   }

//   render() {
//     return (
//       <div>
//         <div className="centerH">
//           <Mutation mutation={Constants.REGISTER_MUTATION} update={this.update}>
//             {(register) => (
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   if (this.isValid()) {
//                     register({
//                       variables: {
//                         account: {
//                           name: this.state.name,
//                           surname: this.state.surname,
//                           bio: this.state.bio,
//                           user: {
//                             username: this.state.username,
//                             password: this.state.password,
//                             email: this.state.email,
//                           },
//                         },
//                       },
//                     });
//                   }
//                 }}
//               >
//                 <h2 className="orangeText">Register</h2>
//                 <div>
//                   <div>
//                     <input
//                       placeholder="name"
//                       onChange={this.handleChange}
//                       name="name"
//                       value={this.state.name}
//                     ></input>
//                     <br></br>
//                     <label className="error">
//                       {this.state.nameErrorMessage}
//                     </label>
//                   </div>
//                   <div>
//                     <input
//                       placeholder="surname"
//                       onChange={this.handleChange}
//                       name="surname"
//                       value={this.state.surname}
//                     ></input>
//                     <br></br>
//                     <label className="error">
//                       {this.state.surnameErrorMessage}
//                     </label>
//                   </div>
//                   <div>
//                     <input
//                       placeholder="email"
//                       type="email"
//                       onChange={this.handleChange}
//                       name="email"
//                       value={this.state.email}
//                     ></input>
//                     <br></br>
//                     <label className="error">
//                       {this.state.emailErrorMessage}
//                     </label>
//                   </div>
//                   <input
//                     placeholder="username"
//                     onChange={this.handleChange}
//                     name="username"
//                     value={this.state.username}
//                   ></input>
//                   <br></br>
//                   <label className="error">
//                     {this.state.usernameErrorMessage}
//                   </label>
//                 </div>
//                 <div>
//                   <input
//                     placeholder="passsword"
//                     type="password"
//                     onChange={this.handleChange}
//                     name="password"
//                     value={this.state.password}
//                   ></input>
//                   <br></br>
//                   <label className="error">
//                     {this.state.passwordErrorMessage}
//                   </label>
//                 </div>
//                 <div>
//                   <textarea
//                     placeholder="about you (optional)"
//                     onChange={this.handleChange}
//                     name="bio"
//                     value={this.state.bio}
//                   ></textarea>
//                 </div>
//                 <button className="orange" type="submit">
//                   Register
//                 </button>
//                 <div>
//                   <Link to="/login">
//                     <button className="red">Log in</button>
//                   </Link>
//                 </div>
//               </form>
//             )}
//           </Mutation>
//         </div>
//       </div>
//     );
//   }
// }

// const isValid = () => {
//   let valid = true;
//   if (!title.length) {
//     setTitleErrorMessage("Title can't be empty");
//     valid = false;
//   }

//   if (!body.length) {
//     setBodyErrorMessage("Body can't be empty");
//     valid = false;
//   }

//   return valid;
// };

// <div>
//   <div className="profile">
//     <button className="orange bold my-profile" onClick={goToDashboard}>
//       <p className="prompt">Go to dashboard</p>
//     </button>
//     <ProfileSnippet
//       account={{
//         name: account.name,
//         surname: account.surname,
//         username: account.user.username,
//         bio: account.bio,
//         following: account.numberOfFollowing,
//         followers: account.numberOfFollowers,
//       }}
//     />
//     <div className="new-post">
//       <NewPost></NewPost>
//     </div>
//     {isMyProfile ? (
//       <button className="red bold my-profile" onClick={logout}>
//         <p className="prompt">Logout</p>
//       </button>
//     ) : (
//       <div></div>
//     )}
//   </div>
//   <div className="posts">
//     {posts.length > 0 ? (
//       posts.map((post) => {
//         post["author"] = {
//           name: account.name,
//           surname: account.surname,
//         };
//         return (
//           <Post
//             key={post.id}
//             post={post}
//             deleteOption={isMyProfile}
//             handleDelete={handleDeletePost}
//           ></Post>
//         );
//       })
//     ) : (
//       <h1>No posts to show yet!</h1>
//     )}
//   </div>
// </div>
// const { data } = useQuery(Constants.GET_MY_POSTS, {
//   onCompleted(data) {
//     setPosts(data.account.posts);
//   },
// });

// useQuery(Constants.GET_MY_ACCOUNT_DETAILS, {
//   onCompleted(data) {
//     if (props.isMyProfile) {
//       saveUserData(data.account);
//       setAccount(JSON.parse(getUser()));
//     } else {
//       setAccount(data.account);
//     }
//   },
// });
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

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
// <div className="post">
//   <h1>{title}</h1>
//   <p>{body}</p>
//   <p className="date">
//     {stringFromDate(dateTime)} by {author.name + " " + author.surname}
//   </p>
//   <div className="button_container">
//     <button className="orange bold" onClick={handleLike}>
//       {likeButtonText}
//     </button>
//     <button className="red right">
//       Liked by {likes} user{like_plural ? "s" : ""}
//     </button>
//     {props.deleteOption ? (
//       <div className="utils">
//         <button onClick={(e) => editPost()}>edit</button>
//         <button onClick={(e) => props.handleDelete(e, id)}>delete</button>
//       </div>
//     ) : (
//       ""
//     )}
//   </div>
// </div>

// <div>
//   {!account.user || loading || error ? (
//     ""
//   ) : (
//     <div>
//       <Header {...props} dashboard={false}></Header>
//       <div className="background">
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             {props.location.state.isMyProfile ? (
//               <Grid item xs={12} sm={8}>
//                 <NewPost callback={handleNewPost}></NewPost>
//               </Grid>
//             ) : (
//               ""
//             )}
//             <Grid item xs={12} sm={4}>
//               <Grid container spacing={4}>
//                 <Grid item xs={12}>
//                   <ProfileSnippet
//                     account={{
//                       id: account.id,
//                       name: account.name,
//                       surname: account.surname,
//                       username: account.user.username,
//                       email: account.user.email,
//                       bio: account.bio,
//                       following: account.numberOfFollowing,
//                       followers: account.numberOfFollowers,
//                       isFollowedByLoggedInAccount:
//                         account.isFollowedByLoggedInAccount,
//                     }}
//                     isMyProfile={props.location.state.isMyProfile}
//                   ></ProfileSnippet>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <AccountList
//                     list={account.followers}
//                     title="Followers"
//                   ></AccountList>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <AccountList
//                     list={account.following}
//                     title="Following"
//                   ></AccountList>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={8}>
//               <GridList
//                 cellHeight="auto"
//                 cols={1}
//                 className={classes.gridList}
//               >
//                 {account.posts.length > 0 ? (
//                   account.posts.map((post) => {
//                     post["author"] = {
//                       name: account.name,
//                       surname: account.surname,
//                       user: {
//                         username: account.user.username,
//                       },
//                     };
//                     return (
//                       <GridListTile key={post.id}>
//                         <Post
//                           post={post}
//                           deleteOption={props.location.state.isMyProfile}
//                           handleDelete={handleDeletePost}
//                           handleEdit={handleEditPost}
//                         ></Post>
//                       </GridListTile>
//                     );
//                   })
//                 ) : (
//                   <h1>No posts to show yet!</h1>
//                 )}
//               </GridList>
//             </Grid>
//           </Grid>
//         </Container>
//       </div>
//     </div>
//   )}
// </div>

//cellHeight={200}

// export default class Dashboard extends React.Component {
//   constructor(props) {
//     super(props);
//     const account = JSON.parse(getUser());
//     this.state = {
//       loggedIn: getToken() != null,
//       id: account.id,
//       name: account.name,
//       surname: account.surname,
//       email: account.user.email,
//       bio: account.bio,
//       username: account.user.username,
//       numberOfFollowers: account.numberOfFollowers,
//       numberOfFollowing: account.numberOfFollowing,
//     };
//   }

//   logout = () => {
//     localStorage.clear();
//     this.props.history.push("/");
//   };

//   goToMyProfile = () => {
//     this.props.history.push("/profile/" + this.state.username, {
//       isMyProfile: true,
//     });
//   };

//   render() {
//     return this.state.loggedIn ? (
//       <div>
//         <div className="profile">
//           <button
//             className="orange bold my-profile"
//             onClick={this.goToMyProfile}
//           >
//             <p className="prompt">Go to my profile</p>
//           </button>
//           <ProfileSnippet
//             account={{
//               name: this.state.name,
//               surname: this.state.surname,
//               username: this.state.username,
//               bio: this.state.bio,
//               following: this.state.numberOfFollowing,
//               followers: this.state.numberOfFollowers,
//             }}
//           />
//           <div className="new-post">
//             <NewPost></NewPost>
//           </div>
//           <button className="red bold my-profile" onClick={this.logout}>
//             <p className="prompt">Logout</p>
//           </button>
//         </div>
//         <div className="posts">
//           <Query query={Constants.POPULATE_FEED}>
//             {({ loading, error, data }) => {
//               if (loading) return "Loading...";
//               if (error) return `Error! ${error.message}`;
//               const { posts } = data;
//               return posts.length > 0 ? (
//                 posts.map((post) => (
//                   <Post key={post.id} post={post} deleteOption={false}></Post>
//                 ))
//               ) : (
//                 <h1>No posts to show yet!</h1>
//               );
//             }}
//           </Query>
//         </div>
//       </div>
//     ) : (
//       <div>Ups, log in</div>
//     );
//   }
// }

// <div>
//   <Header {...props} dashboard={true}></Header>
//   <div className="background">
//     <Container maxWidth="lg" className={classes.background}>
//       <Grid container spacing={4}>
//         <Grid item xs={9}>
//           <NewPost></NewPost>
//         </Grid>
//         <Grid item xs={3}>
//           <Search
//             refreshPosts={() =>
//               refetch().then((res) => {
//                 setFeedPosts(res.data.posts);
//               })
//             }
//           ></Search>
//         </Grid>
//         <Grid item xs={9}>
//           <GridList cellhight="auto" cols={1}>
//             {feedPosts.map((post) => (
//               <GridListTile key={post.id}>
//                 <Post post={post} deleteOption={false}></Post>
//               </GridListTile>
//             ))}
//           </GridList>
//         </Grid>
//       </Grid>
//     </Container>
//   </div>
// </div>

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

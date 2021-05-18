import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HelmetTitle from "../components/HelmetTitle";
import "../styles/Signup.css";

const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $fullname: String!, $password: String!){
    createUser(email: $email, username: $username, fullname: $fullname, password: $password){
      ok,
      error
    }
  }
`;

const Signup = ({ setClicked }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);

  const [createUserMutation] = useMutation(CREATE_USER);

  useEffect(() => {
    setClicked(false);
  }, [setClicked])

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data: { createUser: { ok, error } } } = await createUserMutation({ variables: { email, username, fullname, password } });
    //console.log(ok, error);
    if (!ok) {
      if (error === "Email is already taken.") {
        return setEmailError(error);
      }
      if (error === "Username is already taken.") {
        return setUsernameError(error);
      }
    }
    history.push('/login');
  }

  return (
    <>
      <HelmetTitle helmetTitle="Sign Up" />
      <div className="signup-container">
        <form className="signup-form" onSubmit={onSubmit}>
          <h2>Sign Up</h2>
          <label>
            Email
          <input className="signup-email__input" type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(null) }} />
          </label>
          {
            emailError ? <span className="signup-error">{emailError}</span> : null
          }
          <label>
            Username
          <input className="signup-username__input" type="text" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value); setUsernameError(null) }} />
          </label>
          {
            usernameError ? <span className="signup-error">{usernameError}</span> : null
          }
          <label>
            Fullname
          <input className="signup-fullname__input" type="text" placeholder="Fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          </label>
          <label>
            Password
          <input className="signup-password__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button>Sign Up</button>
          <span className="to-login">Already have an account? <span className="to-login__link" onClick={() => history.push('/login')}>Login</span></span>
        </form>
      </div>
    </>
  )
}

export default Signup;
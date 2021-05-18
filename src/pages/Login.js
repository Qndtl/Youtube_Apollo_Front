import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { logUserIn } from "../apollo/variables";
import HelmetTitle from "../components/HelmetTitle";
import '../styles/login.css';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok,
      error,
      token
    }
  }
`;

const Login = ({ setClicked }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [loginMutation] = useMutation(LOGIN);
  const history = useHistory();
  useEffect(() => {
    setClicked(false);
  }, [setClicked])
  const onSubmit = async (e) => {
    e.preventDefault();
    const { data: { login: { ok, error, token } } } = await loginMutation({ variables: { email, password } });
    if (!ok) {
      if (error === "Email not found. Sign up first.") {
        return setEmailErr(error);
      }
      if (error === "Incorrect password. Check your pw again.") {
        return setPasswordErr(error);
      }
    } else {
      logUserIn(token);
      history.push('/');
    }
  }
  return (
    <>
      <HelmetTitle helmetTitle="Login" />
      <div className="login-container">
        <form className="login-form" onSubmit={onSubmit}>
          <h2>LOGIN</h2>
          <label>
            EMAIL
          <input className="login-email__input" type="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setEmailErr(null) }} />
          </label>
          {
            emailErr ? <span className="login-error">{emailErr}</span> : null
          }
          <label>
            PASSWORD
          <input className="login-password__input" type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setPasswordErr(null) }} />
          </label>
          {
            passwordErr ? <span className="login-error">{passwordErr}</span> : null
          }
          <button>Login</button>
          <span className="to-signup">Don't have an account? <span className="to-signup__link" onClick={() => history.push('/signup')}>Sign Up</span></span>
        </form>
      </div>
    </>
  )
}

export default Login;
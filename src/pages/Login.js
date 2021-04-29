import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import { logUserIn } from "../apollo/variables";
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [loginMutation] = useMutation(LOGIN);
  const history = useHistory();
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
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setEmailErr(null) }} />
      {emailErr ? <span style={{ color: "tomato" }}>{emailErr}</span> : null}
      <input type="text" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setPasswordErr(null) }} />
      {passwordErr ? <span style={{ color: "tomato" }}>{passwordErr}</span> : null}
      <button>Login</button>
    </form>
  )
}

export default Login;
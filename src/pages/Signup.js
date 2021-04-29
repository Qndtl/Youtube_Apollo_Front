import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";

const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $fullname: String!, $password: String!){
    createUser(email: $email, username: $username, fullname: $fullname, password: $password){
      ok,
      error
    }
  }
`;

const Signup = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const [createUserMutation] = useMutation(CREATE_USER);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data: { createUser: { ok, error } } } = await createUserMutation({ variables: { email, username, fullname, password } });
    console.log(ok, error);
    //make errors
    if (!ok) {
      return setError(error);
    }
    history.push('/login');
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
      <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error ? <span>{error}</span> : null}
      <button>Sign Up</button>
    </form>
  )
}

export default Signup;
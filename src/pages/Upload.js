import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import "../styles/Upload.css";

const UPLOAD = gql`
  mutation upload($file: Upload!, $title: String!, $description: String!) {
    upload(file: $file, title: $title, description: $description) {
      id,
      file,
      title,
      description,
      createdAt
    }
  }
`;

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const [uploadMutation] = useMutation(UPLOAD);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data: { upload } } = await uploadMutation({ variables: { file, description, title } });
    console.log(upload)
    history.push('/');
  }
  return (
    <div className="upload-container">
      <form onSubmit={onSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  )
}
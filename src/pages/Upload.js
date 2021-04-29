import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import "../styles/Upload.css";
import { VIDEOS } from "./Home";

const UPLOAD = gql`
  mutation upload($file: Upload!, $thumbnail: Upload!, $title: String!, $description: String!) {
    upload(file: $file, thumbnail: $thumbnail, title: $title, description: $description) {
      id,
      file,
      title,
      description,
      thumbnail,
      createdAt
    }
  }
`;

const Upload = () => {
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const [uploadMutation] = useMutation(UPLOAD);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data: { upload } } = await uploadMutation({ variables: { file, thumbnail, description, title }, refetchQueries: [{ query: VIDEOS }] });
    console.log(upload)
    history.push('/');
  }
  return (
    <div className="upload-container">
      <form onSubmit={onSubmit}>
        <label htmlFor="video">video</label>
        <input id="video" type="file" onChange={e => setFile(e.target.files[0])} />
        <label htmlFor="thumbnail">Thumbnail</label>
        <input id="thumbnail" type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <input placeholder="Title of video" type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description of video" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Upload;
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import "../styles/Upload.css";
import { VIDEOS } from "./Home";
import TextareaAutosize from 'react-textarea-autosize';

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
    const {
      data: {
        upload
      }
    } = await uploadMutation({
      variables: { file, thumbnail, description, title },
      refetchQueries: [{ query: VIDEOS }]
    });
    console.log(upload)
    history.push('/');
  }
  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={onSubmit}>
        <div className="flex">
          <label className="upload-video__label" htmlFor="video">Select video</label>
          <h4>{file?.name}</h4>
        </div>
        {
          file !== null && <video width="400">
            <source src={URL.createObjectURL(file)} />
          </video>
        }
        <input className="upload-video__input" id="video" type="file" onChange={e => setFile(e.target.files[0])} />
        <div className="flex">
          <label className="upload-thumbnail__label" htmlFor="thumbnail">Select Thumbnail</label>
          <h4>{thumbnail?.name}</h4>
        </div>
        {
          thumbnail !== null && <img src={URL.createObjectURL(thumbnail)} alt="thumbnail" />
        }
        <input className="upload-thumbnail__input" id="thumbnail" type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <input
          required
          placeholder="Title of video"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="upload-title__input" />
        <TextareaAutosize
          required
          className="upload-textarea"
          placeholder="Description of video"
          value={description}
          onChange={e => setDescription(e.target.value)} />
        <button>동영상 업로드</button>
      </form>
    </div>
  )
}

export default Upload;
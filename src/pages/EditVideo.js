import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import "../styles/EditVideo.css";

const EDIT_VIDEO = gql`
  mutation editVideo($videoId: Int!, $title: String!, $description: String!){
    editVideo(videoId: $videoId, title: $title, description: $description){
      ok
      error
    }
  }
`;

const DELETE_VIDEO = gql`
  mutation deleteVideo($videoId: Int!){
    deleteVideo(videoId: $videoId){
      ok
      error
    }
  }
`;

const EditVideo = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(typeof location?.state?.videoId)

  const [title, setTitle] = useState(location?.state?.title);
  const [description, setDescription] = useState(location?.state?.description);

  const [editVideoMutation] = useMutation(EDIT_VIDEO);
  const [deleteVideoMutation] = useMutation(DELETE_VIDEO);

  useEffect(() => {
    if (!location?.state?.isMe) {
      history.push('/');
    }
  }, [location?.state?.isMe, history])

  const updateEditVideo = (cache, result) => {
    const { data: { editVideo: { ok } } } = result;
    if (ok) {
      cache.modify({
        id: `Video:${location?.state?.videoId}`,
        fields: {
          title(prev) {
            return title;
          },
          description(prev) {
            return description;
          }
        }
      })
    }
  }

  const onSubmit = async e => {
    e.preventDefault();
    await editVideoMutation({ variables: { videoId: location?.state?.videoId, title, description }, update: updateEditVideo });
    history.push(`/video/${location?.state?.videoId}`);
  }

  const updateDeleteVideo = (cache, result) => {
    const { data: { deleteVideo: { ok } } } = result;
    if (ok) {
      cache.evict({ id: `Video:${location?.state?.videoId}` });
    }
  }

  const onDelete = async e => {
    e.preventDefault();
    await deleteVideoMutation({ variables: { videoId: location?.state?.videoId }, update: updateDeleteVideo });
  }

  return (
    <div className="edit-video__container">
      <form className="edit-video__form">
        <h2>업로드 동영상 수정</h2>
        <label htmlFor="">
          동영상 제목
          <input type="text" value={title || ""} onChange={e => setTitle(e.target.value)} />
        </label>
        <label htmlFor="">
          동영상 설명
          <input type="text" value={description || ""} onChange={e => setDescription(e.target.value)} />
        </label>
        <button onClick={onSubmit}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </form>
    </div>
  )
}

export default EditVideo;
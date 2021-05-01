import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import "../styles/EditVideo.css";

const EditVideo = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(location?.state?.isMe);

  const [title, setTitle] = useState(location?.state?.title);
  const [description, setDescription] = useState(location?.state?.description);

  useEffect(() => {
    if (!location?.state?.isMe) {
      history.push('/');
    }
  }, [location?.state?.isMe, history])

  const onSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className="edit-video__container">
      <form className="edit-video__form" onSubmit={onSubmit}>
        <h2>업로드 동영상 수정</h2>
        <label htmlFor="">
          동영상 제목
          <input type="text" value={title || ""} onChange={e => setTitle(e.target.value)} />
        </label>
        <label htmlFor="">
          동영상 설명
          <input type="text" value={description || ""} onChange={e => setDescription(e.target.value)} />
        </label>
        <button>수정</button>
      </form>
    </div>
  )
}

export default EditVideo;
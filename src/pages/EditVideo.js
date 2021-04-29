import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

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
    <form onSubmit={onSubmit}>
      <input type="text" value={title || ""} onChange={e => setTitle(e.target.value)} />
      <input type="text" value={description || ""} onChange={e => setDescription(e.target.value)} />
      <button>수정</button>
    </form>
  )
}

export default EditVideo;
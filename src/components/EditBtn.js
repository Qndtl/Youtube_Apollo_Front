import { Link } from "react-router-dom"

const EditBtn = ({ videoId, isMe, title, description }) => {
  return (
    <button className="edit__button">
      <Link to={{ pathname: `/edit/video/${videoId}`, state: { isMe, title, description, videoId } }}>수정</Link>
    </button>
  )
}

export default EditBtn;
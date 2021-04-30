import { useState } from "react"
import { Link } from "react-router-dom";
import EditBtn from "../../components/EditBtn";
import SubscribeBtn from "../../components/SubscribeBtn";
import "../../styles/EditBtn.css";

const VideoUser = ({ videoId, userId, avatar, username, description, isMe, isFollowing, followers, title }) => {
  const [more, setMore] = useState(false);

  return (
    <div className="video-user__container">
      <div className="video-column video-avatar__container">
        <Link to={`/user/${userId}`}>
          <img className="video-avatar" src={avatar} alt={avatar} />
        </Link>
      </div>
      <div className="video-column video-description__container">
        <div className="video-user">
          <div className="video-username">
            <Link to={`/user/${userId}`}>{username}</Link>
          </div>
          <div className="video-subscriber">구독자 {followers}명</div>
        </div>
        {
          more ? <p>{description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p> : <p className="video-description">
            {
              description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)
            }
          </p>
        }
        {
          description.split('\n').length > 2 ?
            <span className="toggle-more" onClick={() => setMore(!more)}>
              {more ? "간략히" : "더보기"}
            </span> : null
        }
        {
          description.length > 362 ?
            <span className="toggle-more" onClick={() => setMore(!more)}>
              {more ? "간략히" : "더보기"}
            </span> : null
        }
      </div>
      <div className="video-column video-subscribe__container">
        {
          isMe ? <>
            <EditBtn title={title} videoId={videoId} isMe={isMe} description={description} />
          </> : <SubscribeBtn id={userId} username={username} isFollowing={isFollowing} />
        }
      </div>
    </div>
  )
}

export default VideoUser;
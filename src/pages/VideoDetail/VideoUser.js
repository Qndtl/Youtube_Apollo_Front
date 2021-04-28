import { useState } from "react"

const VideoUser = ({ avatar, username, description }) => {
  const [more, setMore] = useState(false);
  return (
    <div className="video-user__container">
      <div className="video-column video-avatar__container">
        <img className="video-avatar" src={avatar} alt={avatar} />
      </div>
      <div className="video-column video-description__container">
        <div className="video-user">
          <div className="video-username">{username}</div>
          <div className="video-subscriber">subscriber number</div>
        </div>
        {
          more ? <p>{description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p> : <p className="video-description">
            {
              description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)
            }
          </p>
        }
        {description.split('\n').length > 2 ? <span className="toggle-more" onClick={() => setMore(!more)}>{more ? "간략히" : "더보기"}</span> : null}
      </div>
      <div className="video-column video-subscribe__container">
        <button className="video-subscribe__button">구독</button>
      </div>
    </div>
  )
}

export default VideoUser;
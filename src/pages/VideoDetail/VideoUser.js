const VideoUser = ({ avatar, username, description }) => {
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
        <p>{description}</p>
      </div>
      <div className="video-column video-subscribe__container">
        <button className="video-subscribe__button">구독</button>
      </div>
    </div>
  )
}

export default VideoUser;
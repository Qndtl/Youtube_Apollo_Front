import { Link } from 'react-router-dom';
import '../styles/Video.css';

const Video = ({ id, src, title, username, userId, avatar, thumbnail }) => {
  const mouseEnter = (e) => {
    const playPromise = e.target.play();
    if (playPromise !== undefined) {
      playPromise.then(() => { return }).catch((err) => console.log(err.message))
    }
  }

  const mouseLeave = (e) => {
    const pausePromise = e.target.pause();
    if (pausePromise !== undefined) {
      pausePromise.then(() => { return }).catch((err) => console.log(err.message))
    }
  }
  return (
    <div className="container">
      <Link to={`/video/${id}`}><video src={src} muted onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} poster={thumbnail} /></Link>
      <div className="text-container">
        <div className="row">
          <Link to={`/user/${userId}`}>
            <img className="avatar" src={avatar} alt={avatar} />
          </Link>
          <Link to={`/video/${id}`}>
            <div className="title">{title}</div>
          </Link>
        </div>
        <div className="row">
          <Link to={`/user/${userId}`}>
            <div className="username">{username}</div>
          </Link>
          <div className="view-count">조회수</div>
        </div>
      </div>
    </div>
  )
}

export default Video;
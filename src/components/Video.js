import { Link } from 'react-router-dom';
import '../styles/Video.css';

const Video = ({ id, src, title, username, userId, avatar }) => {
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
      <Link to={`/video/${id}`}><video src={src} muted onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} /></Link>
      <div className="text-container">
        <div className="row">
          <img className="avatar" src={avatar} alt={avatar} />
          <Link to={`/video/${id}`}><div className="title">{title}</div></Link>
        </div>
        <div className="row">
          <div className="username">{username}</div>
          <div className="view-count">조회수</div>
        </div>
      </div>
    </div>
  )
}

export default Video;
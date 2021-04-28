import { Link } from 'react-router-dom';
import '../styles/Video.css';

export default function Video({ id, src, title, description, username, userId, avatar }) {
  const mouseEnter = (e) => {
    e.target.play();
  }

  const mouseLeave = (e) => {
    e.target.pause();
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
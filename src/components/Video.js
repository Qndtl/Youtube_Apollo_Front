import '../styles/Video.css';

export default function Video({ src, title, description, username, userId, avatar }) {
  return (
    <div className="container">
      <video src={src} />
      <div className="text-container">
        <div className="row">
          <img className="avatar" src={avatar} alt={avatar} />
          <div className="title">{title}</div>
        </div>
        <div className="row">
          <div className="username">{username}</div>
          <div className="view-count">조회수</div>
        </div>
      </div>
    </div>
  )
}
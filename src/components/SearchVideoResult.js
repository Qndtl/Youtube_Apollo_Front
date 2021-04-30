import { Link } from "react-router-dom";
import "../styles/SearchVideoResult.css";

const SearchVideoResult = ({ video }) => {
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
    <div className="search-video__container">
      <div className="search-video__video">
        <Link to={`/video/${video.id}`}>
          <video src={video.file} poster={video.thumbnail} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}></video>
        </Link>
      </div>
      <div className="search-video__info">
        <div className="search-video__title">
          <Link to={`/video/${video.id}`}>
            <span>{video.title}</span>
          </Link>
        </div>
        <div className="search-video__user">
          <div className="video-user__avatar">
            <Link to={`/user/${video.user.id}`}>
              <img src={video.user.avatar} alt={video.user.avatar} />
            </Link>
          </div>
          <div className="video-user__username">
            <Link to={`/user/${video.user.id}`}>
              <span>{video.user.username}</span>
            </Link>
          </div>
        </div>
        <div className="search-video__description">
          <span>{video.description}</span>
        </div>
      </div>
    </div>
  )
}

export default SearchVideoResult;
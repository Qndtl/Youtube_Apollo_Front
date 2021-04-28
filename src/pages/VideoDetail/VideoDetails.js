import { LikeIcon } from "../../components/Icons";

const VideoDetails = ({ title }) => {
  return (
    <div className="video-details">
      <div className="video-title">
        <span>{title}</span>
      </div>
      <div className="video-info">
        <span>조회수 0회 &#183; 2020.8.16</span>
        <div className="video-info__icons">
          <LikeIcon />
          <div className="like-num">like num</div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails;
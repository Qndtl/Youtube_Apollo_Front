import { gql, useMutation } from "@apollo/client";
import { LikeIcon } from "../../components/Icons";

const TOGGLE_LIKE = gql`
  mutation toggleLike($videoId: Int!){
    toggleLike(videoId: $videoId) {
      ok,
      error
    }
  }
`;

const VideoDetails = ({ videoId, title, isLiked, totalLikeNum, view, createdAt }) => {
  const date = new Date(parseInt(createdAt));
  const updateToggleLike = (cache, result) => {
    const { data: { toggleLike: { ok } } } = result;
    if (ok) {
      const videosId = `Video:${videoId}`;
      cache.modify({
        id: videosId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalLikeNum(prev) {
            if (isLiked) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          }
        }
      })
    }
  }

  const clickLike = async () => {
    await toggleLikeMutation();
  }

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { videoId },
    update: updateToggleLike
  })

  return (
    <div className="video-details">
      <div className="video-title">
        <span>{title}</span>
      </div>
      <div className="video-info">
        <span>조회수 {view}회 &#183; {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}</span>
        <div
          className={isLiked ? "video-info__icons liked" : "video-info__icons"}
          onClick={clickLike}>
          <LikeIcon />
        </div>
        <div className="like-num">{totalLikeNum}</div>
      </div>
    </div>
  )
}

export default VideoDetails;
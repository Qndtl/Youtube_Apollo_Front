import { useParams } from "react-router";
import { gql, useQuery } from '@apollo/client';
import "../styles/VideoDetail.css";
import VideoUser from "./VideoDetail/VideoUser";
import VideoComment from "./VideoDetail/VideoComment";
import VideoDetails from "./VideoDetail/VideoDetails";

const VIDEO = gql`
  query video($id: Int!){
    video(videoId: $id){
      id,
      file,
      title,
      description,
      isLiked,
      totalLikeNum,
      user{
        id,
        username,
        avatar,
        isMe,
        isFollowing,
        totalFollowerNum
      }
    }
  }
`;

const VideoDetail = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(VIDEO, { variables: { id: parseInt(id) } });
  if (!loading) { console.log(data) }
  if (loading) {
    return <h1>Loading video...</h1>
  }

  return (
    <>
      {
        <>
          <div className="video-container">
            <video className="video" src={data.video.file} controls controlsList="nodownload" autoPlay></video>
          </div>
          <div className="video-detail__wrapper">
            <VideoDetails videoId={data.video.id} title={data.video.title} isLiked={data.video.isLiked} totalLikeNum={data.video.totalLikeNum} />
            <VideoUser
              userId={data.video.user.id}
              avatar={data.video.user.avatar}
              username={data.video.user.username}
              description={data.video.description}
              followers={data.video.user.totalFollowerNum}
              isMe={data.video.user.isMe}
              isFollowing={data.video.user.isFollowing} />
            <VideoComment data={data} />
          </div>
        </>
      }
    </>
  )
}

export default VideoDetail;
import { useParams } from "react-router";
import { useQuery } from '@apollo/client';
import "../styles/VideoDetail.css";
import VideoUser from "./VideoDetail/VideoUser";
import VideoComment from "./VideoDetail/VideoComment";
import VideoDetails from "./VideoDetail/VideoDetails";
import { VIDEO } from "../sharedGQL/videoGql";
import { useEffect } from "react";

const VideoDetail = ({ setClicked }) => {
  const { id } = useParams();
  const { data, loading } = useQuery(VIDEO, { variables: { id: parseInt(id) } });

  useEffect(() => {
    setClicked(false);
  }, [setClicked])
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
            <VideoDetails
              videoId={data.video.id}
              title={data.video.title}
              isLiked={data.video.isLiked}
              totalLikeNum={data.video.totalLikeNum}
              isMe={data.video.user.isMe} />
            <VideoUser
              videoId={data.video.id}
              userId={data.video.user.id}
              avatar={data.video.user.avatar}
              username={data.video.user.username}
              title={data.video.title}
              description={data.video.description}
              followers={data.video.user.totalFollowerNum}
              isMe={data.video.user.isMe}
              isFollowing={data.video.user.isFollowing} />
            <VideoComment videoId={data.video.id} comments={data.video.comments} totalCommentNum={data.video.totalCommentNum} />
          </div>
        </>
      }
    </>
  )
}

export default VideoDetail;
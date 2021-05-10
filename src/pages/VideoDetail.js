import { useParams } from "react-router";
import { useQuery } from '@apollo/client';
import "../styles/VideoDetail.css";
import VideoUser from "./VideoDetail/VideoUser";
import VideoComment from "./VideoDetail/VideoComment";
import VideoDetails from "./VideoDetail/VideoDetails";
import { VIDEO } from "../sharedGQL/videoGql";
import { useEffect } from "react";
import MainVideo from "../components/MainVideo";
import Loader from "../components/Loader";

const VideoDetail = ({ setClicked }) => {
  const { id } = useParams();
  const { data, loading } = useQuery(VIDEO, { variables: { id: parseInt(id) } });

  useEffect(() => {
    setClicked(false);
  }, [setClicked])

  if (loading) {
    return <Loader />
  }

  if (!loading) {
    return (
      <>
        {
          <>
            <div className="video-container">
              <MainVideo videoId={data.video.id} video={data.video.file} />
            </div>
            <div className="video-detail__wrapper">
              <VideoDetails
                videoId={data.video.id}
                view={data.video.view}
                title={data.video.title}
                isLiked={data.video.isLiked}
                totalLikeNum={data.video.totalLikeNum}
                createdAt={data.video.createdAt}
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
}

export default VideoDetail;
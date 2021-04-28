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
      user{
        id,
        username,
        avatar
      }
    }
  }
`;

const VideoDetail = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(VIDEO, { variables: { id: parseInt(id) } });

  return (
    <>
      {
        loading ? <h1>Loading...</h1> : <>
          <video className="video" src={data.video.file} controls controlsList="nodownload" autoPlay></video>
          <div className="video-detail__wrapper">
            <VideoDetails title={data.video.title} />
            <VideoUser
              avatar={data.video.user.avatar}
              username={data.video.user.username}
              description={data.video.description} />
            <VideoComment data={data} />
          </div>
        </>
      }
    </>
  )
}

export default VideoDetail;
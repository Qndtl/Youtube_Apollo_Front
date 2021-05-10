import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import SubscribeBtn from "../components/SubscribeBtn";
import Video from "../components/Video";
import "../styles/UserDetail.css";

const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      id,
      isMe,
      isFollowing,
      totalFollowerNum,
      username,
      avatar,
      videos {
        id,
        file,
        title,
        thumbnail,
        createdAt
      }
    }
  }
`;

const UserDetail = ({ setClicked }) => {
  useEffect(() => {
    setClicked(false);
  }, [setClicked])
  const { id } = useParams();
  const { data, loading } = useQuery(GET_USER, { variables: { id: parseInt(id) } });

  if (loading) {
    return <Loader />
  }

  if (!loading) {
    console.log(data);
  }

  return (
    <>
      {
        data.getUser.channelImage ? <div className="channel-image">
          <h1>Place for channel image</h1>
        </div> : null
      }
      <div className="channel-header">
        <div className="channel-user__container">
          <img className="channel-avatar" src={data.getUser.avatar} alt={data.getUser.avatar} />
          <div className="channel-user">
            <span className="channel-user__username">{data.getUser.username}</span>
            <span className="channel-user__followers">구독자 {data.getUser.totalFollowerNum}명</span>
          </div>
        </div>
        <div className="channel-button__container">
          {
            data.getUser.isMe ? null : <SubscribeBtn id={data.getUser.id} username={data.getUser.username} isFollowing={data.getUser.isFollowing} />
          }
        </div>
      </div>
      <div className="channel-videos">
        {
          data.getUser.videos.map((video, i) => <Video
            key={video.id}
            id={video.id}
            src={video.file}
            title={video.title}
            thumnail={video.thumbnail}
            username={data.getUser.username}
            userId={data.getUser.id}
            avatar={data.getUser.avatar}
            createdAt={video.createdAt} />)
        }
      </div>
    </>
  )
}

export default UserDetail;
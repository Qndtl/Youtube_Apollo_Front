import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import SubscribeBtn from "../components/SubscribeBtn";
import Video from "../components/Video";
import { FOLLOW } from "../sharedGQL/followGql";
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
        thumbnail
      }
    }
  }
`;

const UserDetail = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_USER, { variables: { id: parseInt(id) } });
  const [followMutation, { loading: mutationLoading }] = useMutation(FOLLOW);

  const updateFollow = (cache, result) => {
    const { data: { follow: { ok } } } = result;
    if (ok) {
      const usersId = `User:${data.getUser.id}`;;
      cache.modify({
        id: usersId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowerNum(prev) {
            if (data.getUser.isFollowing) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          }
        }
      })
    }
  }

  const toggleSubscribe = async () => {
    await followMutation({ variables: { username: data.getUser.username }, update: updateFollow });
  }

  if (loading) {
    return <h1>Loading...</h1>
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
            data.getUser.isMe ? null : <SubscribeBtn isFollowing={data.getUser.isFollowing} onClick={toggleSubscribe} loading={mutationLoading} />
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
            avatar={data.getUser.avatar} />)
        }
      </div>
    </>
  )
}

export default UserDetail;
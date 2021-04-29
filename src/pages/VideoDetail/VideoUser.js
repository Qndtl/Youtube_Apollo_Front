import { useMutation } from "@apollo/client";
import { useState } from "react"
import { Link } from "react-router-dom";
import SubscribeBtn from "../../components/SubscribeBtn";
import { FOLLOW } from "../../sharedGQL/followGql";

const VideoUser = ({ userId, avatar, username, description, isMe, isFollowing, followers }) => {
  const [more, setMore] = useState(false);
  const [followMutation, { loading }] = useMutation(FOLLOW);

  const updateFollow = (cache, result) => {
    const { data: { follow: { ok } } } = result;
    if (ok) {
      const usersId = `User:${userId}`;
      cache.modify({
        id: usersId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowerNum(prev) {
            if (isFollowing) {
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
    await followMutation({ variables: { username }, update: updateFollow });
  }

  return (
    <div className="video-user__container">
      <div className="video-column video-avatar__container">
        <Link to={`/user/${userId}`}>
          <img className="video-avatar" src={avatar} alt={avatar} />
        </Link>
      </div>
      <div className="video-column video-description__container">
        <div className="video-user">
          <div className="video-username">
            <Link to={`/user/${userId}`}>{username}</Link>
          </div>
          <div className="video-subscriber">구독자 {followers}명</div>
        </div>
        {
          more ? <p>{description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p> : <p className="video-description">
            {
              description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)
            }
          </p>
        }
        {
          description.split('\n').length > 2 ?
            <span className="toggle-more" onClick={() => setMore(!more)}>
              {more ? "간략히" : "더보기"}
            </span> : null
        }
        {
          description.length > 362 ?
            <span className="toggle-more" onClick={() => setMore(!more)}>
              {more ? "간략히" : "더보기"}
            </span> : null
        }
      </div>
      <div className="video-column video-subscribe__container">
        {
          isMe ? null : <SubscribeBtn isFollowing={isFollowing} onClick={toggleSubscribe} loading={loading} />
        }
      </div>
    </div>
  )
}

export default VideoUser;
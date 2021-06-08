import { useMutation, useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { isloggedInVar } from "../apollo/variables";
import { FOLLOW } from "../sharedGQL/followGql";
import "../styles/SearchUserResult.css";
import SubscribeBtn from "./SubscribeBtn";

const SearchUserResult = ({ user }) => {
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const history = useHistory();
  const [followMutation] = useMutation(FOLLOW);

  const updateFollow = (cache, result) => {
    const { data: { follow: { ok } } } = result;
    if (ok) {
      const usersId = `User:${user.id}`;
      cache.modify({
        id: usersId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowerNum(prev) {
            if (user.isFollowing) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          }
        }
      })
    }
  }

  const onClick = async () => {
    if (isLoggedIn) {
      await followMutation({ variables: { username: user.username }, update: updateFollow });
    } else {
      history.push('/login');
    }
  }

  return (
    <div className="search-user__container">
      <div className="search-user__avatar">
        <Link to={`/user/${user.id}`}>
          <img className="user-avatar__img" src={user.avatar} alt={user.avatar} />
        </Link>
      </div>
      <div className="search-user__info">
        <div className="user-info__username">
          <Link to={`/user/${user.id}`}>
            <span>{user.username}</span>
          </Link>
        </div>
        <div className="user-info__counts">
          <span>구독자 {user.totalFollowerNum}명 &#183; 동영상 {user.totalVideoNum}개</span>
        </div>
        <div className="user-info__following" onClick={onClick}>
          <span>{user.isFollowing ? "구독중" : "구독"}</span>
        </div>
      </div>
      <div className="search-user__button">
        {user.isMe ? null : <SubscribeBtn id={user.id} username={user.username} isFollowing={user.isFollowing} />}
      </div>
    </div>
  )
}

export default SearchUserResult;
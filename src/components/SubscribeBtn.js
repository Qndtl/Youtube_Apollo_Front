import { isloggedInVar } from "../apollo/variables";
import { FOLLOW } from "../sharedGQL/followGql";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router";

const SubscribeBtn = ({ id, username, isFollowing }) => {
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const history = useHistory();
  const [followMutation, { loading }] = useMutation(FOLLOW);

  const updateFollow = (cache, result) => {
    const { data: { follow: { ok } } } = result;
    if (ok) {
      const usersId = `User:${id}`;
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

  const onClick = async () => {
    if (isLoggedIn) {
      await followMutation({ variables: { username }, update: updateFollow });
    } else {
      history.push('/login');
    }
  }

  return (
    <button
      className={isFollowing ? "subscribe__button cancel-subscribe" : "subscribe__button"}
      onClick={onClick}
      disabled={loading ? true : false}
      style={{ cursor: "pointer" }}>
      {isFollowing ? "구독중" : "구독"}
    </button>
  )
}

export default SubscribeBtn;
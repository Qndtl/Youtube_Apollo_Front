import { useState } from "react";

const SubscribeBtn = ({ isFollowing, onClick, loading }) => {
  const [fakeFollowing, setFakeFollowing] = useState(isFollowing);
  return (
    <button
      className={fakeFollowing ? "subscribe__button cancel-subscribe" : "subscribe__button"}
      onClick={() => { setFakeFollowing(!fakeFollowing); onClick(); }}
      disabled={loading ? true : false}>
      {fakeFollowing ? "구독중" : "구독"}
    </button>
  )
}

export default SubscribeBtn;
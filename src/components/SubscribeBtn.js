const SubscribeBtn = ({ isFollowing, onClick, loading }) => {
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
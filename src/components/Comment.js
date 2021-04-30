const Comment = ({ text, userId, username, avatar, isMe }) => {
  return (
    <div className="comment-container">
      <div className="comment-user__avatar">
        <img src={avatar} alt={avatar} />
      </div>
      <div className="comment-user__text">
        <div className="comment-username">{username}</div>
        <div className="comment-text">{text}</div>
      </div>
      <div className="comment-modify"></div>
    </div>
  )
}

export default Comment;
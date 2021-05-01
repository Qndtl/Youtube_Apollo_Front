import { gql, useMutation } from "@apollo/client";
import "../styles/Comment.css";

const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: Int!){
    deleteComment(commentId: $commentId) {
      ok
      error
    }
  }
`;

const Comment = ({ text, commentId, videoId, userId, username, avatar, isMe }) => {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);

  const updateDeleteComment = (cache, result) => {
    const { data: { deleteComment: { ok } } } = result;
    if (ok) {
      cache.evict({ id: `Comment:${commentId}` });
      cache.modify({
        id: `Video:${videoId}`,
        fields: {
          totalCommentNum(prev) {
            return prev - 1;
          }
        }
      })
    }
  }

  const onDelete = async e => {
    e.preventDefault();
    if (isMe) {
      await deleteCommentMutation({ variables: { commentId }, update: updateDeleteComment })
    } else {
      console.log("...shit")
    }
  }

  return (
    <div className="comment-container">
      <div className="comment-user__avatar">
        <img src={avatar} alt={avatar} />
      </div>
      <div className="comment-user__text">
        <div className="comment-username">{username}</div>
        <div className="comment-text">{text}</div>
      </div>
      <div className="comment-modify">
        {
          isMe ? <button onClick={onDelete}>삭제</button> : null
        }
      </div>
    </div>
  )
}

export default Comment;
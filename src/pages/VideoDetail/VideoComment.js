import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import { isloggedInVar } from "../../apollo/variables";
import Comment from "../../components/Comment";
import { VIDEO } from "../../sharedGQL/videoGql";
import "../../styles/VideoComment.css";
import TextareaAutosize from 'react-textarea-autosize';

const CREATE_COMMENT = gql`
  mutation createComment($videoId: Int!, $text: String!){
    createComment(videoId: $videoId, text: $text){
      ok,
      error
    }
  }
`;

const VideoComment = ({ comments, totalCommentNum, videoId }) => {
  const [comment, setComment] = useState("");
  const [createCommentMutation] = useMutation(CREATE_COMMENT, { refetchQueries: [{ query: VIDEO, variables: { id: videoId } }] });
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    if (isLoggedIn) {
      await createCommentMutation({ variables: { videoId, text: comment } });
      setComment("");
    } else {
      history.push('/login');
    }
  }

  return (
    <div className="video-comment__container">
      <div className="video-comment__count">댓글 {totalCommentNum}개</div>
      <form className="video-comment__form" onSubmit={onSubmit}>
        <TextareaAutosize
          className="video-comment__textarea"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="공개 댓글 추가..." />
        {comment === "" ? null : <button>작성</button>}
      </form>
      {
        comments.map(comment => <Comment
          key={comment.id}
          commentId={comment.id}
          text={comment.text}
          videoId={videoId}
          userId={comment.user.id}
          username={comment.user.username}
          avatar={comment.user.avatar}
          isMe={comment.user.isMe} />)
      }
    </div>
  )
}

export default VideoComment;
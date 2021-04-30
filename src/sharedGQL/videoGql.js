import { gql } from '@apollo/client';

export const VIDEO = gql`
  query video($id: Int!){
    video(videoId: $id){
      id,
      file,
      title,
      description,
      isLiked,
      totalLikeNum,
      totalCommentNum,
      user{
        id,
        username,
        avatar,
        isMe,
        isFollowing,
        totalFollowerNum
      },
      comments {
        id,
        text,
        user {
          id,
          username,
          avatar,
          isMe
        }
      }
    }
  }
`;
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
      user{
        id,
        username,
        avatar,
        isMe,
        isFollowing,
        totalFollowerNum
      }
    }
  }
`;
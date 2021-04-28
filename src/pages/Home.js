import { gql, useQuery } from "@apollo/client";
import Video from "../components/Video";
import '../styles/Home.css';

export const VIDEOS = gql`
  query videos{
    videos {
      id,
      file,
      title,
      description,
      user{
        id,
        username,
        avatar
      }
    }
  }
`;

export default function Home() {
  const { data } = useQuery(VIDEOS);
  console.log(data)
  return (
    <div className="videos">
      {
        data?.videos?.map(video => <Video
          key={video.id}
          id={video.id}
          src={video.file}
          title={video.title}
          description={video.description}
          username={video.user.username}
          userId={video.user.id}
          avatar={video.user.avatar} />)
      }
    </div>
  )
}
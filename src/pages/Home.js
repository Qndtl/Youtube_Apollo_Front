import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Video from "../components/Video";
import '../styles/Home.css';

export const VIDEOS = gql`
  query videos{
    videos {
      id,
      file,
      title,
      thumbnail,
      user{
        id,
        username,
        avatar
      }
    }
  }
`;

const Home = ({ setClicked }) => {
  useEffect(() => {
    setClicked('home');
  }, [setClicked])

  const { data, loading } = useQuery(VIDEOS);
  if (!loading) { console.log(data) }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="videos">
      {
        data.videos.map(video => <Video
          key={video.id}
          id={video.id}
          src={video.file}
          title={video.title}
          thumnail={video.thumbnail}
          username={video.user.username}
          userId={video.user.id}
          avatar={video.user.avatar} />)
      }
    </div>
  )
}

export default Home;
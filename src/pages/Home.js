import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Video from "../components/Video";
import '../styles/Home.css';

export const VIDEOS = gql`
  query videos{
    videos {
      id,
      file,
      title,
      thumbnail,
      createdAt,
      view,
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
  //if (!loading) { console.log(data) }

  if (loading) {
    return <Loader />
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
          avatar={video.user.avatar}
          view={video.view}
          createdAt={video.createdAt} />)
      }
    </div>
  )
}

export default Home;
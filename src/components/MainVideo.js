import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { VIDEO } from "../sharedGQL/videoGql";

const ADD_VIEW = gql`
  mutation addView($videoId: Int!){
    addView(videoId: $videoId){
      ok,
      error
    }
  }
`;

const MainVideo = ({ video, videoId }) => {
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addViewMutation] = useMutation(ADD_VIEW, { refetchQueries: [{ query: VIDEO, variables: { id: videoId } }] });

  const handleMetadata = e => {
    const duration = e.target.duration;
    setDuration(duration);
    setLoading(false);
  }

  useEffect(() => {
    if (!loading) {
      setTimeout(async () => {
        await addViewMutation({ variables: { videoId } });
      }, duration * 900)
    }
  }, [addViewMutation, duration, loading, videoId])

  return (
    <video className="video" onLoadedMetadata={handleMetadata} src={video} controls controlsList="nodownload" autoPlay></video>
  )
}

export default MainVideo;
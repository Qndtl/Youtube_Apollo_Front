import { useLocation } from "react-router";
import { gql, useQuery } from "@apollo/client";
import SearchUserResult from "../components/SearchUserResult";
import SearchVideoResult from "../components/SearchVideoResult";
import { useEffect } from "react";

const SEARCH = gql`
  query search($term: String!){
    searchUser(term: $term){
      id
      avatar
      username
      totalFollowerNum
      totalVideoNum
      isFollowing
    },
    searchVideo(term: $term) {
      id
      file
      title
      description
      createdAt
      user {
        id
        avatar
        username
      }
    }
  }
`;

const SearchResult = ({ setClicked }) => {
  useEffect(() => {
    setClicked(false);
  }, [setClicked])
  const location = useLocation();
  const { data } = useQuery(SEARCH, { variables: { term: location.search.split("term=")[1] } })
  console.log(data);
  return (
    <div className="search-result__container" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      {
        data?.searchUser?.map(user => <SearchUserResult key={user.id} user={user} />)
      }
      {
        data?.searchVideo?.map(video => <SearchVideoResult key={video.id} video={video} />)
      }
    </div>
  )
}

export default SearchResult;
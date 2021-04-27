import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isloggedInVar, logUserOut } from "../apollo/variables";

const ME = gql`
  query me {
    me {
      id,
      username
    }
  }
`;

export default function useUser() {
  const hasToken = useReactiveVar(isloggedInVar);
  const { data } = useQuery(ME, { skip: !hasToken });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data])
  return { data };
}
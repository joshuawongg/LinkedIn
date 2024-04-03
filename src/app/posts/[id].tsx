import { ActivityIndicator, ScrollView, Text } from "react-native";
import posts from "../../../assets/data/posts.json";
import PostListItem from "@/components/PostListItem";
import { useLocalSearchParams } from "expo-router";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery($id: ID!) {
    post(id: $id) {
      content
      id
      image
      profile {
        id
        image
        name
        position
      }
    }
  }
`;

// Querying by post id, need to include variable within the useQuery hook
// use query (queryName, { variables: {variable}})

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { loading, error, data } = useQuery(query, { variables: { id } });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.log(error);
    return <Text>Something Went Wrong</Text>;
  }
  console.log(data);

  return (
    <ScrollView>
      <PostListItem post={data.post} />
    </ScrollView>
  );
}

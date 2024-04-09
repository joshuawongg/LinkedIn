import { ActivityIndicator, FlatList, Text } from "react-native";
import PostListItem from "@/components/PostListItem";
// import posts from '../../../assets/data/posts.json'
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const postList = gql`
  query PostListQuery {
    postList {
      id
      content
      image
      profile {
        image
        name
        id
        position
      }
    }
  }
`;

const postPaginatedList = gql`
  query PostPaginatedListQuery($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
      id
      content
      image
      profile {
        image
        name
        id
        position
      }
    }
  }
`;

export default function HomeFeedScreen() {
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore, refetch } = useQuery(postPaginatedList, {
    variables: { first: 6 },
  });

  // fetchMore function on useQuery hook re executes the same query with same variables by default
  // Can also override variables on re executing the query
  // Changing the after variable to continue querying the db for more posts
  
  const loadMore = async () => {
    if (!hasMore) {
      return;
    }
    const res = await fetchMore({
      variables: { after: data.postPaginatedList.length },
    });
    if (res.data.postPaginatedList === 0) {
      setHasMore(false);
    }
    console.log(res.data.postPaginatedList);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Something went wrong!</Text>;
  }

  return (
    <FlatList
      data={data.postPaginatedList}
      renderItem={({ item }) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      onEndReached={loadMore}
      refreshing={loading}
      onRefresh={refetch}

      // List footer component for manually rendering load more

      //   ListFooterComponent={() => (
      //     <Text
      //       onPress={loadMore}
      //       style={{
      //         alignSelf: "center",
      //         fontWeight: "600",
      //         fontSize: 16,
      //         color: "royalblue",
      //       }}
      //     >
      //       Load More
      //     </Text>
      //   )}
    />
  );
}

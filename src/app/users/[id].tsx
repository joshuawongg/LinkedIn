import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function UserProfile() {
  const { id } = useLocalSearchParams;

  return <Text>User Profile: {id}</Text>;
}

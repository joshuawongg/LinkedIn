import { Pressable, StyleSheet, TextInput, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { useUserContext } from "@/context/UserContext";

const insertPost = gql`
  mutation MyMutation($userid: ID, $image: String, $content: String!) {
    insertPost(content: $content, image: $image, userid: $userid) {
      content
      id
      image
      userid
    }
  }
`;

export default function NewPostScreen() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { dbUser } = useUserContext()

  const [handleMutation, { loading, error, data }] = useMutation(insertPost);

  const navigation = useNavigation();
  const router = useRouter();

  const onPost = async () => {
    try {
      await handleMutation({
        variables: {
          userid: dbUser.id,
          content,
        },
      });
      router.push("/(tabs)/");
      setContent("");
      setImage(null);
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onPost} style={styles.postButton}>
          <Text style={styles.postButtonText}>
            {loading ? "Posting..." : "Submit"}
          </Text>
        </Pressable>
      ),
    });
  }, [onPost, loading]);

  return (
    <View style={styles.container}>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="What do you want to talk about?"
        style={styles.input}
        multiline
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.footer}>
        <Pressable onPress={pickImage} style={styles.iconButton}>
          <FontAwesome name="image" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <FontAwesome name="camera" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <FontAwesome name="glass" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    fontSize: 18,
  },
  postButton: {
    backgroundColor: "royalblue",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    backgroundColor: "gainsboro",
    padding: 20,
    borderRadius: 100,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    marginTop: "auto",
  },
});

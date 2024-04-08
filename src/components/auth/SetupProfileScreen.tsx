import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "@clerk/clerk-expo";
import { useUserContext } from "@/context/UserContext";

const createProfileMutation = gql`
  mutation CreateProfile($about: String, $name: String, $authid: String) {
    insertProfile(about: $about, name: $name, authid: $authid) {
      id
      name
      about
      authid
    }
  }
`;

const SetupProfileScreen = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const { authUser } = useUserContext(); 

  const [handleMutation, { loading }] = useMutation(createProfileMutation);

  const onSave = async () => {
    try {
      await handleMutation({
        variables: {
          name,
          about,
          authid: authUser.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Setup Profile</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="About"
        multiline
        numberOfLines={3}
        value={about}
        onChangeText={setAbout}
        style={styles.input}
      />

      <TouchableOpacity onPress={onSave} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default SetupProfileScreen;

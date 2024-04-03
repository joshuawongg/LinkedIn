import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import userJson from "../../../assets/data/user.json";
import { useLayoutEffect, useState } from "react";
import { User } from "@/types";
import ExperienceListItem from "@/components/ExperienceListItem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery($id: ID!) {
    profile(id: $id) {
      id
      image
      name
      position
      about
      experience {
        id
        companyimage
        companyname
        title
        userid
      }
      backimage
    }
  }
`;

export default function UserProfile() {
  const { id } = useLocalSearchParams();

  const {loading, error, data } = useQuery(query, {variables: {id}});

  const navigation = useNavigation();

  const user = data?.profile;

  const onConnect = () => {
    console.warn("Connect Press");
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: user?.name });
  }, [user?.name]);

  if (loading) {
    return <ActivityIndicator />
  }
  if (error) {
    console.log(error)
    return <Text>Something Went Wrong!</Text>
  }


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* { Header } */}
      <View style={styles.header}>
        {/* { BG Image } */}
        <Image source={{ uri: user.backimage }} style={styles.backImage} />
        <View style={styles.headerContent}>
          {/* { Profile Image } */}
          <Image source={{ uri: user.image }} style={styles.image} />

          {/* { Name and Position } */}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.position}>{user.position}</Text>

          {/* { Connect Button } */}
          <Pressable onPress={onConnect} style={styles.button}>
            <Text style={styles.buttonText}>Connect</Text>
          </Pressable>
        </View>
      </View>

      {/* { About } */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.paragraph}>{user.about}</Text>
      </View>

      {/* { Experience } */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {user.experience?.map((experience) => (
          <ExperienceListItem key={experience.id} experience={experience} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "white",
    marginBottom: 5,
  },
  backImage: {
    width: "100%",
    aspectRatio: 5 / 2,
    marginBottom: -60,
  },

  headerContent: {
    padding: 10,
    paddingTop: 0,
  },

  image: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
  },

  name: {
    fontSize: 24,
    fontWeight: "500",
  },

  position: {},

  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },

  section: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  paragraph: {
    lineHeight: 20,
  },
});

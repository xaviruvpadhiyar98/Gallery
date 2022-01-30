import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const API_URL = "http://picsum.photos/v2/list?page=5&limit=10";
const numColumns = 3;

const getImagesfromPicSum = async () => {
  const response = await fetch(API_URL)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);
  return response;
};

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

export default function Home({ navigation }) {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImagesfromPicSum(API_URL);
      setImages(images);
    };

    fetchImages();
  }, []);

  if (!images) {
    return <Text style={styles.text}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={formatData(images, 3)}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => {
          if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
            <View style={styles.gridView}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Photo", {
                    images: images,
                    currentImage: item,
                  })
                }
              >
                <Image
                  source={{ uri: item.download_url }}
                  style={styles.imageThumbnail}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {/* <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
  },
  gridView: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  text: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageThumbnail: {
    height: width / numColumns,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  item: {
    flex: 1,
    margin: 1,
    height: width / numColumns,
  },
});

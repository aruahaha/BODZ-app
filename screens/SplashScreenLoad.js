import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreenLoad = () => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: 680,
          height: 680,
          backgroundColor: "white",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/videos/BODZsplashLoad2.mp4.lottie.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default SplashScreenLoad;

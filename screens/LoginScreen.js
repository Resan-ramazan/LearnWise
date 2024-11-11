import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Color from "../utils/Color";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
import google from "../assets/images/google.png";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image
        style={styles.images}
        source={require("../assets/images/login.jpeg")}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>YAZILIM KIDS AKADEMI</Text>
        <Text style={styles.subText}>
          Your Ultimate Programming Learning Box
        </Text>
        <TouchableOpacity style={styles.signInContainer} onPress={onPress}>
          <Image style={{ height: 40, width: 40 }} source={google} />
          <Text style={styles.signIn}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  images: {
    width: 500,
    height: 500,
    objectFit: "contain",
  },
  subContainer: {
    height: 500,
    backgroundColor: Color.PRIMARTY_COLOR,
  },
  text: {
    color: Color.TEXT_WHITE,
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginTop: 80,
  },
  subText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
    color: Color.ORANGE,
  },
  signIn: {
    fontSize: 20,
    color: Color.PRIMARTY_COLOR,
    fontFamily: "Poppins-Regular",
  },
  signInContainer: {
    backgroundColor: Color.TEXT_WHITE,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 99,
    padding: 10,
    marginTop: 25,
  },
});

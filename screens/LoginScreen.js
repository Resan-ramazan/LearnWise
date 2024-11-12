import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Color from "../utils/Color";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
import google from "../assets/images/google.png";

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  useWarmUpBrowser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
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
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SafeAreaView>
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
          <TouchableOpacity
            style={[
              styles.signInContainer,
              isLoading && styles.signInButtonDisabled,
            ]}
            onPress={onPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Color.PRIMARTY_COLOR} />
            ) : (
              <>
                <Image style={{ height: 40, width: 40 }} source={google} />
                <Text style={styles.signIn}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  images: {
    width: width,
    height: width * 1,
    objectFit: "contain",
  },
  subContainer: {
    height: 600,
    backgroundColor: Color.PRIMARTY_COLOR,
  },
  text: {
    color: Color.TEXT_WHITE,
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginTop: 40,
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
    paddingVertical: 15,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    color: "#D32F2F",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
});

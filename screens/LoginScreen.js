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
import React, { useState, useCallback } from "react";
import Color from "../utils/Color";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import google from "../assets/images/google.png";

// Initialize WebBrowser for OAuth and get device dimensions
WebBrowser.maybeCompleteAuthSession();
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  // Custom hook to warm up browser for faster OAuth
  useWarmUpBrowser();
  
  // State management for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // Handle Google Sign-In process
  const onPress = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Section - Background Image with Gradient Overlay */}
      <View style={styles.topSection}>
        <Image
          style={styles.backgroundImage}
          source={require("../assets/images/login.jpeg")}
        />
        <LinearGradient
          colors={["transparent", Color.PRIMARY]}
          style={styles.gradient}
        />
      </View>

      {/* Bottom Section - Main Content */}
      <View style={styles.bottomSection}>
        <View style={styles.contentContainer}>
          {/* App Logo/Icon */}
          <View style={styles.logoContainer}>
            <Ionicons name="code-slash" size={40} color={Color.LIGHT} />
          </View>

          {/* App Title and Subtitle */}
          <Text style={styles.title}>LearnWise</Text>
          <Text style={styles.subtitle}>
            Your Ultimate Programming Learning Box
          </Text>

          {/* Google Sign-In Button with Loading State */}
          <TouchableOpacity
            style={[
              styles.signInButton,
              isLoading && styles.signInButtonDisabled,
            ]}
            onPress={onPress}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={Color.PRIMARY} />
            ) : (
              <View style={styles.buttonContent}>
                <Image style={styles.googleIcon} source={google} />
                <Text style={styles.signInText}>Sign in with Google</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Error Message Display */}
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color={Color.ERROR} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PRIMARY,
  },
  topSection: {
    height: height * 0.4,
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.15,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: Color.PRIMARY,
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Color.PRIMARY_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: Color.LIGHT,
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: Color.SECONDARY,
    fontFamily: "Poppins-Medium",
    marginBottom: 25,
    opacity: 0.9,
  },
  signInButton: {
    backgroundColor: Color.LIGHT,
    borderRadius: 12,
    paddingVertical: 12,
    width: "100%",
    maxWidth: 280,
    alignSelf: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  googleIcon: {
    height: 18,
    width: 18,
    marginRight: 10,
  },
  signInText: {
    fontSize: 15,
    color: "#3C4043",
    fontFamily: "Poppins-Medium",
    letterSpacing: 0.25,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.ERROR + "15",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    color: Color.ERROR,
    fontSize: 13,
    marginLeft: 6,
  },
});

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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import google from "../assets/images/google.png";

WebBrowser.maybeCompleteAuthSession();
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  useWarmUpBrowser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
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
      {/* Üst Kısım - Görsel ve Gradient Overlay */}
      <View style={styles.topSection}>
        <Image
          style={styles.backgroundImage}
          source={require("../assets/images/login.jpeg")}
        />
        <LinearGradient
          colors={['transparent', Color.PRIMARY]}
          style={styles.gradient}
        />
      </View>

      {/* Alt Kısım - İçerik */}
      <View style={styles.bottomSection}>
        <View style={styles.contentContainer}>
          {/* Logo veya İkon */}
          <View style={styles.logoContainer}>
            <Ionicons name="code-slash" size={50} color={Color.LIGHT} />
          </View>

          {/* Başlıklar */}
          <Text style={styles.title}>YAZILIM KIDS AKADEMI</Text>
          <Text style={styles.subtitle}>
            Your Ultimate Programming Learning Box
          </Text>

          {/* Giriş Butonu */}
          <TouchableOpacity
            style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
            onPress={onPress}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={Color.PRIMARY} />
            ) : (
              <>
                <Image style={styles.googleIcon} source={google} />
                <Text style={styles.signInText}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Hata Mesajı */}
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
    height: height * 0.5,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.2,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: Color.PRIMARY,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: Color.LIGHT,
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: Color.SECONDARY,
    fontFamily: "Poppins-Medium",
    marginBottom: 32,
    opacity: 0.9,
  },
  signInButton: {
    backgroundColor: Color.LIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  googleIcon: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
  signInText: {
    fontSize: 16,
    color: Color.DARK,
    fontFamily: "Poppins-Medium",
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.ERROR + '15',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    color: Color.ERROR,
    fontSize: 14,
    marginLeft: 8,
  },
});

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { fontSize } from "../../constants/fontSize";
import fonts from "../../constants/fonts";
import { size } from "../../utils/size";

export type ToastType = "success" | "error" | "info";

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onHide: (id: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const Toast: React.FC<ToastProps> = ({ toast, onHide }) => {
  const slideAnim = React.useRef(new Animated.Value(-100)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide in animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide after duration
    const timer = setTimeout(() => {
      hideToast();
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide(toast.id);
    });
  };

  const getIconName = () => {
    switch (toast.type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      case "info":
        return "information-circle";
      default:
        return "information-circle";
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case "success":
        return "#4CAF50";
      case "error":
        return COLORS.error;
      case "info":
        return COLORS.primaryButton;
      default:
        return COLORS.gray;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={hideToast}
        activeOpacity={0.8}
      >
        <Ionicons
          name={getIconName()}
          size={size.verticalScale(24)}
          color={COLORS.white}
          style={styles.icon}
        />
        <Text style={styles.message} numberOfLines={2}>
          {toast.message}
        </Text>
        <TouchableOpacity
          onPress={hideToast}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="close"
            size={size.verticalScale(20)}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: size.moderateScale(20),
    marginTop: size.verticalScale(8),
    borderRadius: size.scale(12),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: size.moderateScale(16),
    paddingVertical: size.verticalScale(14),
  },
  icon: {
    marginRight: size.moderateScale(12),
  },
  message: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.white,
    lineHeight: size.verticalScale(20),
  },
  closeButton: {
    marginLeft: size.moderateScale(12),
    padding: size.moderateScale(4),
  },
});


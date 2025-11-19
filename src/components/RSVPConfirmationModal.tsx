import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { fontSize } from "../constants/fontSize";
import fonts from "../constants/fonts";
import { size } from "../utils/size";

interface RSVPConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
}

export const RSVPConfirmationModal: React.FC<RSVPConfirmationModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="checkmark-circle"
              size={size.verticalScale(64)}
              color={COLORS.primaryButton}
            />
          </View>
          <Text style={styles.title}>RSVP Confirmed!</Text>
          <Text style={styles.message}>
            You've successfully RSVP'd to this event. We'll see you there!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: size.scale(24),
    padding: size.moderateScale(24),
    width: "85%",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: size.verticalScale(16),
  },
  title: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(12),
    textAlign: "center",
  },
  message: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: size.verticalScale(24),
    lineHeight: size.verticalScale(22),
  },
  button: {
    backgroundColor: COLORS.primaryButton,
    paddingVertical: size.verticalScale(14),
    paddingHorizontal: size.moderateScale(32),
    borderRadius: size.scale(12),
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
});


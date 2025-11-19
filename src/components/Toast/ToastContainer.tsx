import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "./Toast";
import { ToastData } from "./Toast";

interface ToastContainerProps {
  toasts: ToastData[];
  onHide: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onHide,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
        },
      ]}
      pointerEvents="box-none"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onHide={onHide} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});


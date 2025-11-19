import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import fonts from "../constants/fonts";
import { fontSize } from "../constants/fontSize";
import { size } from "../utils/size";

export const globalStyles = StyleSheet.create({
  mainTitle: {
    fontSize: fontSize.Large,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: size.verticalScale(8),
  },
  subTitle: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Regular,
    color: COLORS.lightGray,
    marginBottom: size.verticalScale(24),
  },
});

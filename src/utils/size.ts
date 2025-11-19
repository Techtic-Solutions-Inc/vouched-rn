import { Dimensions, PixelRatio } from "react-native";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

type Dimension = {
  width: number;
  height: number;
};

const getWindowDimensions = (): Dimension => {
  return Dimensions.get("window");
};

const calculateResponsiveSizes = () => {
  const { width, height } = getWindowDimensions();

  const horizontalScale = width / guidelineBaseWidth;
  const verticalScaleFactor = height / guidelineBaseHeight;

  const scale = (size: number): number => {
    const newSize = size * horizontalScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  const verticalScale = (size: number): number => {
    const newSize = size * verticalScaleFactor;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  const moderateScale = (size: number, factor: number = 0.5): number => {
    const newSize = size + (scale(size) - size) * factor;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  const getStatusBarHeight = (): number => {
    return 20;
  };

  const getBottomSafeArea = (): number => {
    return 0;
  };

  return {
    scale,
    verticalScale,
    moderateScale,
    deviceWidth: width,
    deviceHeight: height,
    getStatusBarHeight,
    getBottomSafeArea,
    horizontalScale,
    verticalScaleFactor,
  };
};

let responsiveSizes = calculateResponsiveSizes();

const handleDimensionChange = () => {
  responsiveSizes = calculateResponsiveSizes();
};

if (Dimensions.addEventListener) {
  Dimensions.addEventListener("change", handleDimensionChange);
}

export const size = {
  scale: (size: number): number => responsiveSizes.scale(size),
  verticalScale: (size: number): number => responsiveSizes.verticalScale(size),
  moderateScale: (size: number, factor?: number): number =>
    responsiveSizes.moderateScale(size, factor),

  get deviceWidth(): number {
    return getWindowDimensions().width;
  },
  get deviceHeight(): number {
    return getWindowDimensions().height;
  },

  getStatusBarHeight: (): number => responsiveSizes.getStatusBarHeight(),
  getBottomSafeArea: (): number => responsiveSizes.getBottomSafeArea(),

  get horizontalScale(): number {
    return responsiveSizes.horizontalScale;
  },
  get verticalScaleFactor(): number {
    return responsiveSizes.verticalScaleFactor;
  },
};

export const scale = size.scale;
export const verticalScale = size.verticalScale;
export const moderateScale = size.moderateScale;

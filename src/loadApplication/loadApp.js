import * as Font from 'expo-font';

export async function loadApplication() {
    await Font.loadAsync({
      openSansBold: require("../assets/fonts/OpenSans-Bold.ttf"),
      openSansExtraBold: require("../assets/fonts/OpenSans-ExtraBold.ttf"),
      openSansLight: require("../assets/fonts/OpenSans-Light.ttf"),
      openSansRegular: require("../assets/fonts/OpenSans-Regular.ttf"),
      openSansSemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    });
  }
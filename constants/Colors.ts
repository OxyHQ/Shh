/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#FF7F50"; // Headspace primary color
const tintColorDark = "#FF7F50"; // Headspace primary color

export const Colors = {
  light: {
    text: "#333333", // Headspace text color
    background: "#FFFFFF", // Headspace background color
    tint: tintColorLight,
    icon: "#FF7F50", // Headspace icon color
    tabIconDefault: "#CCCCCC", // Headspace tab icon default color
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#FFFFFF", // Headspace text color
    background: "#000000", // Headspace background color
    tint: tintColorDark,
    icon: "#FF7F50", // Headspace icon color
    tabIconDefault: "#666666", // Headspace tab icon default color
    tabIconSelected: tintColorDark,
  },
};

import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleProp, TextStyle } from "react-native";

interface IconWithDynamicColorProps {
  // Required props
  name: string;
  condition: string; // this takes in the type of error it is (up, down, even)
  // Optional props
  size?: number;
  style?: StyleProp<TextStyle>;
}

export const IconWithDynamicColor: React.FC<IconWithDynamicColorProps> = ({
  name,
  condition,
  style,
  size = 5, // Default size
}) => {
  // Determine the color based on the condition
  const getColor = (condition: string): string => {
    if (condition === "up") {
      return "green";
    } else if (condition === "down") {
      return "red";
    } else {
      return "gray"; // even color
    }
  };

  const iconColor = getColor(condition);

  return <Icon style={style} name={name} size={size} color={iconColor} />;
};

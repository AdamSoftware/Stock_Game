import React from "react";
import { StyleProp, TextStyle, Text } from "react-native";

interface DynamicAmountsProps {
  // Required props
  text: number;
  condition: string;
  // Optional props
  style?: StyleProp<TextStyle>;
}

export const DynamicAmounts: React.FC<DynamicAmountsProps> = ({
  text,
  condition,
  style,
}) => {
  // Determine the color based on the condition
  const getColor = (condition: string): string => {
    if (condition === "plus") {
      return "green";
    } else if (condition === "minus") {
      return "red";
    } else {
      return "gray"; // even color
    }
  };

  const textColor = getColor(condition);

  return <Text style={[style, { color: textColor }]}>{text}</Text>;
};

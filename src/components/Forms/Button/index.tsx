import React from "react";

import { Container, Title } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, ...rest }) => {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;

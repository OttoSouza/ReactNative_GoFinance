import React from "react";

import { Button, ImageContainer, Text } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SignInSocialButton: React.FC<Props> = ({ title, svg: Svg, ...rest }) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
};

export default SignInSocialButton;

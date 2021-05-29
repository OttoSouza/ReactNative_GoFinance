import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-radius: 5px;
  border: 1.5px solid ${(props) => props.theme.colors.text};

  ${(props) =>
    props.isActive &&
    props.type === "down" &&
    css`
      background: ${(props) => props.theme.colors.attention_light};
      border: none;
    `}

  ${(props) =>
    props.isActive &&
    props.type === "up" &&
    css`
      background: ${(props) => props.theme.colors.success_light};
      border: none;
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 24px;

  color: ${(props) =>
    props.type === "up"
      ? props.theme.colors.success
      : props.theme.colors.attention};
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${(props) => props.theme.colors.title};
  font-family: ${(props) => props.theme.fonts.regular};
`;

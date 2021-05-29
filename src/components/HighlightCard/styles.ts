import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
  typeIcon: "up" | "down" | "total";
}

export const Container = styled.View<TypeProps>`
  background: ${(props) =>
    props.typeIcon === "total"
      ? props.theme.colors.secondary
      : props.theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};

  color: ${(props) =>
    props.typeIcon === "total"
      ? props.theme.colors.shape
      : props.theme.colors.title};

  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(33)}px;
  ${(props) =>
    props.typeIcon === "up" &&
    css`
      color: ${(props) => props.theme.colors.success};
    `}
  ${(props) =>
    props.typeIcon === "down" &&
    css`
      color: ${(props) => props.theme.colors.attention};
    `}
  ${(props) =>
    props.typeIcon === "total" &&
    css`
      color: ${(props) => props.theme.colors.shape};
    `}
`;
export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${(props) =>
    props.typeIcon === "total"
      ? props.theme.colors.shape
      : props.theme.colors.title};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${(props) =>
    props.typeIcon === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text};
`;

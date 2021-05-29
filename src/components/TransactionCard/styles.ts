import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';

interface TransactionType {
  type: "positive" | "negative";
}

export const Container = styled.View`
  background: ${(props) => props.theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;
export const Amount = styled.Text<TransactionType>`
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) =>
    props.type === "positive"
      ? props.theme.colors.success
      : props.theme.colors.attention};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 19px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${(props) => props.theme.colors.text};
`;
export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${(props) => props.theme.colors.text};
  margin-left: 17px;
`;
export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${(props) => props.theme.colors.text};
`;

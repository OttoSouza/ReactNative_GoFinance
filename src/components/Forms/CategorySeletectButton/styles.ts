import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7,
})`
  background: ${(props) => props.theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 18px;
`;
export const CategoryTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${(props) => props.theme.colors.text};
`;

import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';
export const Container = styled(RectButton)`
  width: 100%;
  background: ${(props) => props.theme.colors.secondary};
  padding: 18px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${(props) => props.theme.colors.shape};
  text-align: center;
`;

import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;
  background: ${(props) => props.theme.colors.shape};
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;
export const ImageContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px;
  border-color: ${props => props.theme.colors.background};
`;
export const Text = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;

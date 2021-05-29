import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
interface CategoryProps {
  isActive: boolean;
}
export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;
export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;


export const Title = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  align-items: center;
  flex-direction: row;

  background: ${(props) =>
    props.isActive
      ? props.theme.colors.secondaty_light
      : props.theme.colors.background};
`;
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;
`;
export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;

import React from 'react';
import { View , Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "../screens/DashBoard"
import Register from "../screens/Register"
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import Resume from '../screens/Resume/index';
const {Navigator, Screen} = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const theme = useTheme()
  return (
    <Navigator tabBarOptions={{
      activeTintColor: theme.colors.secondary,
      inactiveTintColor: theme.colors.text,
      labelPosition:"beside-icon",
      style: {
        paddingVertical: Platform.OS === "ios" ? 20: 0,
        height: 88
      }
    }}>
      <Screen name="Listagem" component={Dashboard} options={{
        tabBarIcon: (({size, color}) => <MaterialIcons size={size} color={color} name="format-list-bulleted"/>)
      }}/>
      <Screen name="Cadastrar" component={Register} options={{
        tabBarIcon: (({size, color}) => <MaterialIcons size={size} color={color} name="attach-money"/>)
      }}/>
      <Screen name="Resumo" component={Resume} options={{
        tabBarIcon: (({size, color}) => <MaterialIcons size={size} color={color} name="pie-chart"/>)
      }}/>
      
    </Navigator>
  )
}

export default AppRoutes;
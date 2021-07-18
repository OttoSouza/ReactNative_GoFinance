import React from 'react';
import { Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import DashBoard from '../../screens/DashBoard';
import Register from '../../screens/Register';
import Resume from '../../screens/Resume';

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
      <Screen name="Listagem" component={DashBoard} options={{
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
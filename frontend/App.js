import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import ExpenseListScreen from './screens/ExpenseListScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ExpensesProvider } from './context/ExpensesContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import tw from 'twrnc';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const { theme } = useTheme();
  const activeColor = '#111827'; 
  const inactiveColor = '#9CA3AF';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
        tabBarStyle: { 
           backgroundColor: '#FFFFFF',
           borderTopWidth: 1,
           borderTopColor: '#F3F4F6',
           height: Platform.OS === 'ios' ? 88 : 65,
           paddingBottom: Platform.OS === 'ios' ? 30 : 10,
           elevation: 0
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'grid-outline';
          else if (route.name === 'Wallet') iconName = 'list-outline';
          else if (route.name === 'Add') iconName = 'add-outline';
          else if (route.name === 'Insights') iconName = 'bar-chart-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          
          return (
            <Ionicons 
              name={focused ? iconName.replace('-outline', '') : iconName} 
              size={22} 
              color={focused ? activeColor : inactiveColor} 
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={ExpenseListScreen} />
      <Tab.Screen name="Add" component={AddExpenseScreen} />
      <Tab.Screen name="Insights" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const navTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  if (loading) return null;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="Tabs" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <ExpensesProvider>
            <RootNavigator />
            <StatusBar style={Platform.OS === 'ios' ? 'auto' : 'light'} />
          </ExpensesProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

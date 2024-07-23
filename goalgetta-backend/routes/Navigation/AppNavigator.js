// navigation/AppNavigator.js
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    TaskDetail: TaskDetailScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(AppNavigator);

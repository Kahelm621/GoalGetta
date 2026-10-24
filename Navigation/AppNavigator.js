// Navigation/AppNavigator.js
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../Screen/HomeScreen";
import TaskDetailScreen from "../Screen/TaskDetailScreen";
import LoginScreen from "../Screen/LoginScreen";
import RegisterScreen from "../Screen/RegisterScreen";

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

import { StackNavigator } from "react-navigation";

import SignIn from "./Signin";
import SignUp from "./Signup";

export default Router = StackNavigator({
  SignIn: {
    screen: SignIn
  },
  SignUp: {
    screen: SignUp
  }
},{
  navigationOptions : {
    headerStyle: { backgroundColor: '#fff', elevation:0 }
  }
}
);
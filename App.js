import { Navigation } from 'react-native-navigation';

//import the pages for adding in navigation
import Flash from './src/Basic';
import Login from './src/Basic/login'
import Home from './src/Home';
import AddItem from "./src/Auth/AddItem";

//register components in RNN system
Navigation.registerComponent("farmersHub.Flash", () => Flash);
Navigation.registerComponent("farmersHub.Login", () => Login);

Navigation.registerComponent("farmersHub.Home", () => Home);

Navigation.registerComponent("farmersHub.AddItem", () => AddItem);


//options for Flash Page
Flash.options = {
    topBar: {
        visible: false //hide the Flash page top navigation bar
    }
}

//options for Login Page
Login.options = {
    topBar: {
        visible: false //hide the Flash page top navigation bar
    }
}

//navigate the initial page to Flash Page (based on the  RNN documentation)
export default () => Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'farmersHub.Flash',
                        }
                    }
                ]
            }
        }
    });
});
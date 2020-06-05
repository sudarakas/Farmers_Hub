import { Navigation } from 'react-native-navigation';

//import the pages for adding in navigation
import Flash from './src/components/views/basic';
import Login from './src/components/views/basic/login';
import Home from './src/components/views/home';
import AddItem from "./src/components/views/auth/addItem";

//register components in RNN system
Navigation.registerComponent("farmersHub.Flash", () => Flash);
Navigation.registerComponent("farmersHub.Login", () => Login);

Navigation.registerComponent("farmersHub.Home", () => Home);

Navigation.registerComponent("farmersHub.AddItem", () => AddItem);

//options for Flash Page
Home.options = {
    topBar: {
        title: {
          text: 'Home',
          color: '#000000',
          alignment: 'center',
          fontFamily: 'Montserrat-Black'
        },
        background: {
          color: '#ffffff'
        },
        elevation: 0,
    },
}


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
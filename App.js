import { Navigation } from 'react-native-navigation';
import configureStore from "./src/components/store/config";
import { Provider } from "react-redux";


//import the pages for adding in navigation
import Flash from './src/components/views/basic/index';
import Login from './src/components/views/basic/login';
import Home from './src/components/views/home';
import AddItem from "./src/components/views/auth/addItem";


//create the store
const store = configureStore();

//register components in RNN system with redux
Navigation.registerComponentWithRedux("farmersHub.Flash", () => Flash, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.Login", () => Login, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.Home", () => Home, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.AddItem", () => AddItem, Provider, store);

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
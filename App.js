import { Navigation } from 'react-native-navigation';
import configureStore from "./src/components/store/config";
import { Provider } from "react-redux";
import Icon from 'react-native-vector-icons/Feather';

//import the pages for adding in navigation
import Flash from './src/components/views/basic/index';
import Login from './src/components/views/basic/login';
import Home from './src/components/views/home';
import AddItem from './src/components/views/auth/addItem';
import UserItems from './src/components/views/auth/userItem'
import SideMenu from './src/components/views/sidemenu';
import Item from './src/components/views/item';


//create the store
const store = configureStore();

//register components in RNN system with redux
Navigation.registerComponentWithRedux("farmersHub.Flash", () => Flash, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.Login", () => Login, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.Home", () => Home, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.AddItem", () => AddItem, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.SideMenu", () => SideMenu, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.UserItems", () => UserItems, Provider, store);
Navigation.registerComponentWithRedux("farmersHub.Item", () => Item, Provider, store);


//options for Home Page
Home.options = {
    topBar: {
        title: {
            text: 'Home',
            color: '#000000',
            alignment: 'center',
            fontFamily: 'Montserrat-Bold'
        },
        background: {
            color: '#ffffff'
        },
        elevation: 0,
    },
}

//options for AddItem Page
AddItem.options = {
    topBar: {
        title: {
            text: 'Sell Your Product',
            color: '#000000',
            alignment: 'center',
            fontFamily: 'Montserrat-Bold'
        },
        background: {
            color: '#ffffff'
        },
        elevation: 0,
    },
}

//options for UserItems Page
UserItems.options = {
    topBar: {
        title: {
            text: 'Your Products',
            color: '#000000',
            alignment: 'center',
            fontFamily: 'Montserrat-Bold'
        },
        background: {
            color: '#ffffff'
        },
        elevation: 0,
        backButton: {
            visible: true
        }
    },
}

//options for UserItems Page
Item.options = {
    topBar: {
        title: {
            text: 'Product Details',
            color: '#000000',
            alignment: 'center',
            fontFamily: 'Montserrat-Bold'
        },
        background: {
            color: '#ffffff'
        },
        elevation: 0,
    },
    animations: {
        showModal: {
            alpha: {
                from: 0,
                to: 1,
                duration: 300
            }
        },
        dismissModal: {
            alpha: {
                from: 1,
                to: 0,
                duration: 300
            }
        }
    }
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
        background: {
            color: '#ffffff'
        },
        elevation: 0,
    },
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
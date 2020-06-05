import { Navigation } from 'react-native-navigation';

//import the pages for adding in navigation
import Flash from './src/Basic';
import Home from './src/Home';
import AddItem from "./src/Auth/AddItem";

//register components in RNN system
Navigation.registerComponent("farmersHub.Flash", () => Flash);
Navigation.registerComponent("farmersHub.Home", () => Home);
Navigation.registerComponent("farmersHub.AddItem", () => AddItem);

Flash.options = {
    topBar: {
        visible: false
    }
}

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
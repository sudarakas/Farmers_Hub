import { Navigation } from 'react-native-navigation';

import HomeIcon from '../../../assets/icons/home.png';
import SellIcon from '../../../assets/icons/sell.png';

const LoadTabs = () => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                id: 'BOTTOM_TABS_LAYOUT',
                children: [
                    {
                        stack: {
                            id: 'HOME_TAB',
                            children: [
                                {
                                    component: {
                                        id: 'farmersHub.Home',
                                        name: 'farmersHub.Home'
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    icon: HomeIcon,
                                }
                            }
                        }
                    },
                    {
                        stack: {
                            id: 'PROFILE_TAB',
                            children: [
                                {
                                    component: {
                                        id: 'farmersHub.AddItem',
                                        name: 'farmersHub.AddItem'
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    icon: SellIcon,
                                }
                            }
                        }
                    },
                ]
            }
        }
    });
}

export default LoadTabs;
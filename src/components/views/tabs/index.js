import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';

const LoadTabs = () => {
    Promise.all([
        Icon.getImageSource('home', 24, '#5EB14E'),
        Icon.getImageSource('dollar-sign', 24, '#5EB14E'),
        Icon.getImageSource('menu', 24, '#000000')
    ]).then(icons => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            id: 'SideMenu',
                            name: 'farmersHub.SideMenu',
                        },
                    },
                    options: {
                        sideMenu: {
                            left: {
                                width: 250 // You can set the width here...
                            }
                        }
                    },
                    center: {
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
                                                icon: icons[0],
                                            },
                                            topBar: {
                                                leftButtons: {
                                                    id: 'sideMenu',
                                                    icon: icons[2]
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    stack: {
                                        id: 'ADD_ITEM',
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
                                                icon: icons[1],
                                            },
                                            topBar: {
                                                leftButtons: {
                                                    id: 'sideMenu',
                                                    icon: icons[2]
                                                }
                                            }
                                        }
                                    }
                                },
                            ]
                        }
                    }
                }
            }
        });
    })
}

// Navigation.setRoot({
//     root: {
//       sideMenu: {
//         left: {
//           component: {
//             name: 'nav.SideMenu',
//           },
//         },
//         center: {
//           stack: {
//             options: {
//               topBar: {
//                 visible: true,
//               },
//             },
//             id: 'SideMenuStack',
//             children: [{
//               component: {
//                 name: 'nav.App',
//               }
//             }]
//           }
//         },
//         options: {
//           sideMenu: {
//             left: {
//               width: 300 // You can set the width here...
//             }
//           }
//         }
//       }
//     }
//   });

export default LoadTabs;
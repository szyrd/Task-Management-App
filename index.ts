import { registerRootComponent } from 'expo';

import App from './MainApp';
import MainApp from './MainApp';
import config from "./tamagui.config";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(MainApp);

/* eslint-disable */
import "react-native-gesture-handler";
import React, { useEffect} from "react";
import {
  Alert,
  BackHandler,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Results from "./components/Results";
import HomePage from "./components/HomePage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TestOne from "./components/TestOne";
import TestTwo from "./components/TestTwo";
import TestThree from "./components/TestThree";


const Drawer = createDrawerNavigator();
export default function App() {
  const regulamin = 'Regulamin';

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {
      // clear error
    }
  }

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  }

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if(value !== null) {
        return value;
      }
      else {
        return null;
      }
    } catch(e) {
      // error reading value
    }
  }

  const firstRun = async () => {
    //let clear = await clearAll()
    let value = await getData('@first_run_key');

    if(value === null){
      Alert.alert(
        'Regulamin',
        regulamin,
        [
          {text: 'Zaakceptuj', onPress: async () => {
              let result = await storeData('@first_run_key', "true")
            }},
          {text: 'Anuluj', onPress: () => {BackHandler.exitApp();}, style: 'cancel'},
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    let o = firstRun();
  }, []);


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomePage">
        <Drawer.Screen name="Home page" component={HomePage}></Drawer.Screen>
        <Drawer.Screen name="Results" component={Results} />
        <Drawer.Screen name="Test One" component={TestOne} />
        <Drawer.Screen name="Test Two" component={TestTwo} />
        <Drawer.Screen name="Test Three" component={TestThree} />
      </Drawer.Navigator>
    </NavigationContainer>


  );
}



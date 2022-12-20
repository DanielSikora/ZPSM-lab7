import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, BackHandler, View } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import Home from "./components/Home";
import Results from "./components/Results";
import Test from "./components/Test";
import Finish from "./components/Finish";

const Drawer = createDrawerNavigator();

const timer = () => {
    return new Promise(res => setTimeout(res, 1000));
};

const App = () => {

    const [quizList, setQuizList] = useState([]);
    const [isLoading, setLoading] = useState(true);


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

    const getQuizList = async () => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/tests');
            const json = await response.json();
            setQuizList(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let o = firstRun();
        let o2 = getQuizList();
    }, []);



    timer().then(() => {
        SplashScreen.hide();
    });

    return (
      <NavigationContainer>
          {isLoading ? <ActivityIndicator/> : (
          <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home page" component={Home} initialParams={{quizList: quizList}}/>
              <Drawer.Screen name="Result" component={Results} />
              {quizList.map((quiz, index) => {
                  return (
                      <Drawer.Screen key={index+".drawer_quiz_"+quiz.id} name={quiz.name} component={Test}  initialParams={{quizId: quiz.id}}/>
                  );
              })
              }
              <Drawer.Screen name="Finish" options={{drawerItemStyle: {display:'none'}, swipeEnabled: false, headerShown:false}} component={Finish} />
          </Drawer.Navigator>
          )}
      </NavigationContainer>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Alert, BackHandler, ToastAndroid} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
import NetInfo from "@react-native-community/netinfo";
import Test from "./components/Test";
import Result from "./components/Result";
import Home from "./components/Home";
import Finish from "./components/Finish";

const Drawer = createDrawerNavigator();

const db = SQLite.openDatabase(
  {
    name: 'quizDB',
    location: 'default',
  },
  () => { },
  error => {
    console.log("ERROR: " + error);
  }
);

const timer = () => {
  return new Promise(res => setTimeout(res, 1000));
};

const App = () => {

  const [quizList, setQuizList] = useState();
  const [isLoading, setLoading] = useState(true);

  const regulamin = 'Regulamin';

  const createTable = () =>{
    try {
      db.transaction((tx)=> {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Quiz (quiz_id TEXT, quiz TEXT, date_update INTEGER);"
        );
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS QuizList (id INTEGER PRIMARY KEY AUTOINCREMENT,quizList TEXT, date_update INTEGER);"
        );
      })
    } catch (error) {
      console.log(error)
    } finally {
      console.log("Table created")
    }
  }

  const saveQuizListDB = async (data) => {
    let today = new Date();
    data = JSON.stringify(data);
    try {
      await db.transaction(async (tx)=>{
        await tx.executeSql(
          "SELECT quizList, date_update From QuizList Where id = 1",
          [],
          async (tx, results) => {
            let len = results.rows.length;
            let quiz = results.rows.item(0);
            //&& quiz.date_update !== today.getDay()
            if (len > 0 && quiz.date_update !== today.getDay()) {
              await tx.executeSql(
                "UPDATE QuizList SET quizList = ?, date_update = ? WHERE id = 1;",
                [data, today.getDay()],
                () => { console.log("data updated") },
                error => {console.log(error)}
              );
            } else if(len === 0) {
              await tx.executeSql(
                "INSERT INTO QuizList (quizList, date_update) VALUES (?,?);",
                [data, today.getDay()],
                () => { console.log("data added first time") },
                error => {console.log(error)}
              );
            }
          }
        );
      })
    } catch (error) {
      console.log(error)
    } finally {
      //let o = getQuizListDB();
    }
  }

  const DBHelper = {
    getQuizListDBTMP: (callback) => {
      db.transaction( (tx) => {
        tx.executeSql(
          "SELECT quizList From QuizList where id = 1",
          [],
          (tx, results) => {
            let len = results.rows.length;
            if (len > 0) {
              let quiz = results.rows.item(0);
              let quiz2 = JSON.stringify(quiz).replaceAll('\\', '');
              quiz2 = quiz2.substring(13, quiz2.length - 2);
              const quiz3 = JSON.parse(quiz2);
              // console.log(JSON.stringify(quiz3));
              callback(_.shuffle(quiz3));
            }
          }
        );
      });
    },
  }

  const getQuizListDB = () => {
    try {
      DBHelper.getQuizListDBTMP(value => {
        setQuizList(value);
      })
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const getQuiz = async (id) => {
    try {
      let string = 'https://tgryl.pl/quiz/test/'+id;
      const response = await fetch(string);
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  const saveQuizDB = async (data) => {
    let today = new Date();

    try {
      for (let i = 0; i < data.length; i++) {
        let send = await getQuiz(data[i].id);
        await db.transaction(async (tx) => {
          await tx.executeSql(
            "SELECT * From Quiz WHERE quiz_id = ?",
            [data[i].id],
            async (tx, results) => {
              let len = results.rows.length;
              let quiz = results.rows.item(0);
              if (len === 0) {
                await tx.executeSql(
                  "INSERT INTO Quiz (quiz_id, quiz, date_update) VALUES (?,?, ?);",
                  [send.id, JSON.stringify(send), today.getDay()],
                  () => {
                    console.log("data2 added first time")
                  },
                  error => {
                    console.log(error)
                  }
                );
              } else if(len > 0 && quiz.date_update !== today.getDay()) {
                await tx.executeSql(
                  "UPDATE Quiz SET quiz_id = ?, quiz=?, date_update = ? WHERE quiz_id = ?;",
                  [send.id, JSON.stringify(send), today.getDay(), send.id],
                  () => {
                    console.log("data2 updated")
                  },
                  error => {
                    console.log(error)
                  }
                );
              }
            }
          );
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {

    }
  }

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
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

      setQuizList(_.shuffle(json));

    } catch (error) {
      console.error(error);
    } finally {

    }
  }

  useEffect(() => {
    if(quizList !== undefined){
      NetInfo.fetch().then(state => {
        if(state.isConnected){
          let o = saveQuizListDB(quizList);
          let o2 = saveQuizDB(quizList);
        }
      });
      setLoading(false);
    }
  }, [quizList]);

  const getStartData = () => {
    setLoading(true);
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if(state.isConnected){
        ToastAndroid.show('Internet is on!', ToastAndroid.SHORT);
        let o2 = getQuizList();
        //let o = getQuizListDB();
      }
      else {
        ToastAndroid.show('Internet is off!', ToastAndroid.SHORT);
        let o2 = getQuizListDB();
      }
    });
  }


  useEffect(() => {
    createTable();
    let o = firstRun();

    getStartData();
  }, []);

  timer().then(() => {
    SplashScreen.hide();
  });

  const show_drawer_quiz = () =>{
    return(quizList.map((quiz, index) => {
      return (
        <Drawer.Screen style={{backgroundColor : "#444343"}} key={index+".drawer_quiz_"+quiz.id} name={quiz.name} component={Test}  initialParams={{quizId: quiz.id}}/>
      );
    }))
  }

  return (
    <NavigationContainer style={{backgroundColor : "#444343"}} >
      {isLoading ? <ActivityIndicator/> : (
        <Drawer.Navigator style={{backgroundColor : "#444343"}} initialRouteName="Home page"  drawerContent={props => {
          return (
            <DrawerContentScrollView {...props} style={{backgroundColor : "#444343"}}>
              <DrawerItemList {...props} />
              <DrawerItem label="Reflesh quiz" onPress={() => getStartData()} />
            </DrawerContentScrollView>
          )
        }}>
          <Drawer.Screen name="Home page" component={Home} style={{backgroundColor : "#444343"}} initialParams={{quizList: quizList}}/>
          <Drawer.Screen name="Result" component={Result} />
          <Drawer.Screen key={"rand_drawer_quiz"} name={"Losowy quiz"} component={Test}  initialParams={{quizId: -1, quizList: quizList}}/>
          {show_drawer_quiz()}
          <Drawer.Screen name="Finish" options={{drawerItemStyle: {display:'none'}, swipeEnabled: false, headerShown:false}} component={Finish} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

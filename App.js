/* eslint-disable */
import 'react-native-gesture-handler';

import React, { useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';


function HomePage({ navigation }) {
  return (

    <View style={{ flex: 1}}>
      <View style={styles.container}>
        <View style={styles.middle}>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.</Text>
        </View>
        <View style={styles.middle}>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.</Text>
        </View>
        <View style={styles.middle}>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.</Text>
        </View>


      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer2}>
        <Text style={styles.appButtonText}>Question one</Text>
      </TouchableOpacity>
    </View>
  );
}
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function Results ({navigation}) {


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const animals = [
    {
      Nick: 'Adrian',
      Point: '18/20',
      Type: 'Historia',
      Date: '21-11-2018',
    },
    {
      Nick: 'Maciek',
      Point: '13/20',
      Type: 'Matematyka',
      Date: '18-11-2018',
    },
    {
      Nick: 'Dawid',
      Point: '10/20',
      Type: 'Polski',
      Date: '15-11-2018',
    },
    {
      Nick: 'Filip',
      Point: '05/20',
      Type: 'Geografia',
      Date: '07-11-2018',
    },
  ]

  const headerComponent = () => {
    return(
      <View style={{flexDirection: 'row'}}>
        <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
          <Text style={{textAlign: "center"}}>Nick</Text>
        </View>
        <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
          <Text style={{textAlign: "center"}}>Point</Text>
        </View>
        <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
          <Text style={{textAlign: "center"}}>Type</Text>
        </View>
        <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
          <Text style={{textAlign: "center"}}>Date</Text>
        </View>
      </View>
    )
  }

  const oneAnimal = ( { item } ) => (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
        <Text style={{textAlign: "center"}}>{item.Nick}</Text>
      </View>
      <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
        <Text style={{textAlign: "center"}}>{item.Point}</Text>
      </View>
      <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
        <Text style={{textAlign: "center"}}>{item.Type}</Text>
      </View>
      <View style={{width: 90, borderWidth: 1, borderColor: "black"}}>
        <Text style={{textAlign: "center"}}>{item.Date}</Text>
      </View>
    </View>

  )


  return(

    <View>
      <ScrollView
        contentContainerStyle={styles.appButtonText}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        <Text style={styles.appButtonText}>Results</Text>
        <View style={styles.appButtonText}>
          <View style={{ marginTop: 100 }}>
            <FlatList
              ListHeaderComponent={headerComponent}
              data={animals}
              renderItem = {oneAnimal}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
function TestOne({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, textAlign: 'center'}}>Tu powinno być pytanie?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question one</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question two</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question three</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question four</Text>
      </TouchableOpacity>
    </View>


  );
}
function TestTwo({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, textAlign: 'center'}}>Tu powinno być pytanie?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question one</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question two</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question three</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question four</Text>
      </TouchableOpacity>
    </View>


  );
}
function TestThree({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, textAlign: 'center'}}>Tu powinno być pytanie?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question one</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question two</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question three</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test One')} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Question four</Text>
      </TouchableOpacity>
    </View>
  );
}
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomePage">
        <Drawer.Screen name="HomePage" component={HomePage} />
        <Drawer.Screen name="Results" component={Results} />
        <Drawer.Screen name="Test One" component={TestOne} />
        <Drawer.Screen name="Test Two" component={TestTwo} />
        <Drawer.Screen name="Test Three" component={TestThree} />
      </Drawer.Navigator>
    </NavigationContainer>


  );
}



const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonContainer2: {
    position: 'absolute',
    bottom:0,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonText2: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    fontSize: 18,
    color: "#000000",
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 2,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});

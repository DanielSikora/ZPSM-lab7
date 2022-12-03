import 'react-native-gesture-handler';
/* eslint-disable */
import * as React from 'react';
import { Button, StyleSheet, TouchableOpacity, View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';


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
function Results({ navigation }) {
  const header = ['Nick', 'Point', 'Type','Date']
  const data = [
    ['gfg1', 'gfg2', 'gfg3', 'gfg3'],
    ['gfg4', 'gfg5', 'gfg6', 'gfg3'],
    ['gfg7', 'gfg8', 'gfg9', 'gfg3'],
    ['gfg7', 'gfg8', 'gfg9', 'gfg3']

  ]
  return (
    <View style={{ marginTop: 200}}>
      <Text style={{ fontSize: 18, textAlign: 'center'}}>
        Results</Text>
      <Table borderStyle={{ borderWidth: 2,
        borderColor: '#c8e1ff',textAlign: 'center'}}>
        <Row data={header} />
        <Rows data={data} />
      </Table>
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
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonText2: {
    fontSize: 12,
    color: "#fff",
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

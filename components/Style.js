/* eslint-disable */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonContainer2: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    alignSelf: "center",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonText2: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
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
  },
  rows:{
    flexDirection: 'row' ,
    display:'flex',
    alignItems:'center',
  },
  qustionsNUM:{
    fontSize: 20
  },
  testCONT:{
    display: 'flex',
    backgroundColor: "#675c5c",
    flexDirection: 'column' ,

  },
  answers:{
    display: 'flex',
    flexDirection: 'column'},
  blues: {
    display: 'flex',
  },
  BRNtop:{
    display: 'flex', marginTop: 10,
  },
  BRNdown:{
    display: 'flex',
  },
  btn:{
    backgroundColor:'#6c6b6b',
    margin: 15,
    height: 50,
    width: 170,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  titles:{
    fontWeight: 'bold',
    fontSize:20,
  },
  NRtext:{
    fontSize:14,
  },
  testBTN:{
    margin: 30,
    padding: 10,
    border:  'black',
    borderRadius: 25,
    backgroundColor: '#7d12f3',
    elevation: 20,
  },

});

export { styles }

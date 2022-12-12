/* eslint-disable */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl, ToastAndroid} from 'react-native';
import { styles } from "./Style";

const Result = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(results);

  const onRefresh = React.useCallback(async () => {
    // setRefreshing(true);
    // if (listData.length < 10) {
    //     try {
    //         let response = await fetch(
    //             'http://www.mocky.io/v2/5e3315753200008abe94d3d8?mocky-delay=2000ms',
    //         );
    //         let responseJson = await response.json();
    //         console.log(responseJson);
    //         setListData(responseJson.result.concat(results));
    //         setRefreshing(false)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // else{
    //     ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
    //     setRefreshing(false)
    // }
  }, [refreshing]);

  const results = [
    {
      "nick": "Marek",
      "score": 18,
      "total": 20,
      "type": "historia",
      "date": "2022-11-22"
    },
    {
      "nick": "Paweł",
      "score": 7,
      "total": 20,
      "type": "Geografia",
      "date": "2022-11-11"
    },
    {
      "nick": "Andrzej",
      "score": 17,
      "total": 20,
      "type": "Historia",
      "date": "2022-11-12"
    },
    {
      "nick": "Adam",
      "score": 18,
      "total": 20,
      "type": 'Przyroda',
      "date": "2022-11-16"
    },
  ]

  const item = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
      <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{item.nick}</Text>
      </View>
      <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.score}/{item.total}</Text>
      </View>
      <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.type}</Text>
      </View>
      <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.date}</Text>
      </View>
    </View>
  )

  return (
    // <View style={styles.blues}>
    <View style={{margin: 15}}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Nick</Text>
        </View>
        <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Point</Text>
        </View>
        <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Type</Text>
        </View>
        <View style={{display: 'flex', flex: 1, borderWidth: 1}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Date</Text>
        </View>
      </View>
      <FlatList
        data={results}
        renderItem={item}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={item => item.nick.toString()} />
    </View>
  )
}

export default Result

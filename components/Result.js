import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

const Result = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            let response = await fetch(
                'https://tgryl.pl/quiz/results?last=10',
            );
            let responseJson = await response.json();
            setResults(responseJson);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
        }

    }, [refreshing]);

    const getResults = async () => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/results?last=10');
            const json = await response.json();
            setResults(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let a = getResults();
    }, []);

    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', backgroundColor : "#6c6b6b"}}>
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
                <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.createdOn}</Text>
            </View>
        </View>
    )

    return (
      <View style={{display: 'flex',backgroundColor : "#6c6b6b", flexDirection: 'column', flex: 1}}>
        <View style={{margin: 15, backgroundColor : "#6c6b6b"}}>
            {refreshing ? <ActivityIndicator /> : null}
            {isLoading ? <ActivityIndicator/> : (
             <View>
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
                    style={{marginBottom: 15}}
                    data={results}
                    renderItem={item}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    //keyExtractor={item => item.nick.toString()}
                />
             </View>
            )}
        </View>
      </View>
    )
}

export default Result

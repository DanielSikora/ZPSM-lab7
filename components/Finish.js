import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {useState} from 'react';

const Finish = (props) => {

    const [name, setName] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const send = async () => {
        if(name !== '')
        {
            try {
                setRefreshing(true);
                await fetch('http://tgryl.pl/quiz/result', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nick: name,
                        score: props.route.params.score,
                        total: props.route.params.total,
                        type: props.route.params.nameQuiz
                    }),
                });
            } catch (error) {
                console.error(error);
            } finally {
                setRefreshing(false);
                Alert.alert(
                    'wysłano',
                    '',
                    [
                        {text: 'Wyjdź do menu', onPress: async () => {
                                props.navigation.navigate('Home page')
                            }},
                    ],
                    { cancelable: false }
                );
            }
        }
    }

    return (
        <View style={styles.container}>
            {refreshing ? <ActivityIndicator /> : null}
            <Text style={{margin: 15, justifyContent: 'center', fontSize: 30}}>{props.route.params.nameQuiz}</Text>
            <Text style={{margin: 15, fontSize: 20}}>Wynik: {props.route.params.score}</Text>
            <Text style={{margin: 15, fontSize: 20}}>Twoje imie:</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.TextInput}
                           onChangeText={(name) => setName(name)}
                           value={name}
                />
            </View>
            <TouchableOpacity style={styles.sendBtn}>
                <Text style={{fontSize: 20}} onPress={() => send()}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "#ffffff",
        borderRadius: 30,
        borderWidth: 1,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    sendBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6c6b6b",
        borderWidth: 1
    },
});


export default Finish


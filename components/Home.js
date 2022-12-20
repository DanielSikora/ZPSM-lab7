import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet, ScrollView} from 'react-native';

const Home = (props) => {

    return (
        <ScrollView style={{display: 'flex',backgroundColor : "#6c6b6b", flexDirection: 'column'}}>
            {props.route.params.quizList.map((quiz, index) => {
                return (
                    <TouchableOpacity key={index+".home_quiz_"+quiz.id} style={styles.testBTN} onPress={() => {props.navigation.navigate(quiz.name)}}>
                        <View>
                            <Text style={styles.titles}>{quiz.name}</Text>
                        </View>
                        <View style={styles.ConText}>
                            {
                                quiz.tags.map((tag, sIndex) => {
                                    return(
                                        <Text key={index+".home_quiz_"+quiz.id+"_tag_"+sIndex} style={styles.blues} >#{tag} </Text>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.ConText}>
                            <Text style={styles.NRtext}>
                                Poziom: {quiz.level}{"\n"}
                                {quiz.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })
            }
            <View style={styles.FooterBC}>
                <View>
                    <Text style={styles.FooterTEXT}>Get to know your ranking result</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('Result')} style={styles.FooterBTN}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Check</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
     backgroundColor: '#6c6b6b',
     flex:1
    },
    blues: {
     color: 'blue'
    },
    ConText:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor : "#6c6b6b"
    },
    titles:{
        fontSize: 30,
        backgroundColor : "#6c6b6b",
        fontFamily: 'Roboto-BlackItalic'

    },
    NRtext:{
        color:'black',
        fontcolor:'white',
        fontSize: 24,
        fontFamily: 'Roboto-Black',
        backgroundColor : "#6c6b6b"
    },
    testBTN:{
        margin: 30,
        border:  'black',
        borderWidth: 1,
        padding: 15,
        backgroundColor : "#6c6b6b"
    },
    FooterBTN:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10,
        backgroundColor : "#6c6b6b"
    },
    FooterTEXT:{
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15,
        backgroundColor : "#6c6b6b"
    },
    FooterBC:{ padding: 10, borderWidth: 1, alignItems: 'center'},
   });

export default Home

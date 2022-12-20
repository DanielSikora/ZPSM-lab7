import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const Test = (props) => {

    const [points, setPoints] = useState(0);
    const [currentIndex, setIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [key, setKey] = useState(0);
    const [answerIndex, setAnswerIndex] = useState();

    const [quiz, setQuiz] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const clear = () => {
        setPoints(0);
        setIndex(0);
        setKey(prevKey => prevKey + 1);
        setIsPlaying(true);
    }

    const getQuiz = async () => {
        try {
            let string = 'https://tgryl.pl/quiz/test/'+props.route.params.quizId;
            const response = await fetch(string);
            const json = await response.json();
            setQuiz(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return props.navigation.addListener("focus", () => {
            clear();
            let o = getQuiz();
        });
    }, [props.navigation]);

    const check = () =>{
        setAnswerIndex(-1);
        if(currentIndex === quiz.tasks.length-1){
            setIsPlaying(false);
            props.navigation.navigate('Finish',{
                score: points,
                nameQuiz: quiz.name,
                total: quiz.tasks.length
            })
            clear();
        }else{
            const index = currentIndex + 1;
            setKey(prevKey => prevKey + 1);
            setIndex(index);
        }
    }

    React.useEffect(() => {
        return props.navigation.addListener("focus", () => {
            clear();
        });
    }, [props.navigation]);

    useEffect(() => {
        if(!isLoading && answerIndex !== -1){
            if(quiz.tasks[currentIndex].answers[answerIndex].isCorrect === true){
                setPoints(points + 1);
            }
            else{
                check();
            }
        }
    }, [answerIndex]);

    useEffect(() => {
        if(!isLoading){
            check();
        }
    }, [points]);

    React.useEffect(() => {
        return props.navigation.addListener("blur", () => {
            console.log("wyjscie")
            setIsPlaying(false);
        });
    }, [props.navigation]);


    //navigation.reset

    //dekompoment

    return (
        <View style={{display: 'flex', flexDirection: 'column' ,backgroundColor : "#6c6b6b", flex: 1}}>
            {isLoading ? <ActivityIndicator/> : (
                <View>
                    <View style={{margin: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.qustionsNUM}>Question {currentIndex+1} of {quiz.tasks.length}                 </Text>
                        <CountdownCircleTimer
                            isPlaying={isPlaying}
                            key={key}
                            duration={quiz.tasks[currentIndex].duration}
                            colors={['#004777']}
                            size={50}
                            strokeWidth={5}
                            trailStrokeWidth={5}
                            onComplete={() => {
                                check();
                            }}
                        >
                            {({ remainingTime }) => <Text style={{fontSize: 20}}>{remainingTime}</Text>}
                        </CountdownCircleTimer>
                    </View>
                    <View>
                        <ProgressBar style={{height: 16, margin: 20}} progress={(currentIndex+1)/quiz.tasks.length} color={'green'}  />
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center', margin: 10}}>{quiz.tasks[currentIndex].question}</Text>
                        </View>
                        <View style={styles.answers}>
                            {quiz.tasks[currentIndex].answers.map((answer, index) => {
                                return (
                                    <TouchableOpacity key={quiz.id+'_'+currentIndex+'_'+index} onPress={() => setAnswerIndex(index)} style={styles.btn}>
                                        <Text style={styles.NRtext}>{answer.content}</Text>
                                    </TouchableOpacity>
                                );
                            })
                            }
                        </View>
                    </ScrollView>
                </View>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
     flex:1
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



    },
    answers:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignItems:'center',
    },

    blues: {
        display: 'flex',
    },
    BRNtop:{
        display: 'flex', marginTop: 10
    },
    BRNdown:{
        display: 'flex'
    },
    btn:{
        backgroundColor:'#b2b2b2',
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
        backgroundColor: '#5300B0',
        elevation: 20,

    },
   });

export default Test

import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';

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


const Test = (props) => {

    const [points, setPoints] = useState(0);
    const [currentIndex, setIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [key, setKey] = useState(0);
    const [answerIndex, setAnswerIndex] = useState();

    const [quiz, setQuiz] = useState([]);
    const [id, setId] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const clear = () => {
        setPoints(0);
        setIndex(0);
        setKey(prevKey => prevKey + 1);
        setIsPlaying(true);
    }

    const getQuiz = async (id) => {

        try {
            let string = 'https://tgryl.pl/quiz/test/' + id;
            const response = await fetch(string);
            const json = await response.json();
            json.tasks = _.shuffle(json.tasks);

            for (let i = 0; i < json.tasks.length; i++) {
                json.tasks[i].answers = _.shuffle(json.tasks[i].answers);
            }
            setQuiz(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const DBHelper = {
        getQuizDBTMP: (callback) => {
            db.transaction( (tx) => {
                tx.executeSql(
                  "SELECT quiz From Quiz where quiz_id = ?",
                  [id.toString()],
                  (tx, results) => {
                      let len = results.rows.length;
                      if(len > 0){
                          let quiz = results.rows.item(0);
                          let quiz2 = JSON.stringify(quiz).replaceAll('\\','');
                          quiz2= quiz2.substring(9, quiz2.length-2);
                          let quiz3 = JSON.parse(quiz2);

                          quiz3.tasks = _.shuffle(quiz3.tasks);

                          for (let i = 0; i < quiz3.tasks.length; i++) {
                              quiz3.tasks[i].answers = _.shuffle(quiz3.tasks[i].answers);
                          }
                          callback(quiz3);
                      }
                  }
                );
            });
        },
    }

    const getQuizBD = () => {
        try {
            DBHelper.getQuizDBTMP(value => {
                setQuiz(value);
                setLoading(false);
            });
        } catch (error) {
            console.error(error);
        } finally {

        }
    }

    useEffect(() => {
        getQuizBD();
    }, [id]);

    const getQuizStart = (id) => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected) {
                let o = getQuiz(id);
            } else {
                setId(id)
            }
        });
    }

    const check = () =>{
        setAnswerIndex(-1);
        console.log(typeof quiz)
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

    useEffect(() => {
        return props.navigation.addListener("focus", () => {

            if(props.route.params.quizId === -1)
            {
                let min = 0;
                let max = props.route.params.quizList.length;
                let random = Math.floor(Math.random() * (max - min) + min);
                getQuizStart(props.route.params.quizList[random].id);
            }
            else
            {
                getQuizStart(props.route.params.quizId);
            }
            clear();
        });

    }, [props.navigation]);

    useEffect(() => {
        return props.navigation.addListener("blur", () => {
            setIsPlaying(false);
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

    const showAnswers = () => {
        return(
          <View style={styles.answers}>
              {quiz.tasks[currentIndex].answers.map((answer, index) => {
                  return (
                    <TouchableOpacity key={quiz.id+'_'+currentIndex+'_'+index} onPress={() => setAnswerIndex(index)} style={styles.btn}>
                        <Text style={styles.NRtext}>{answer.content}</Text>
                    </TouchableOpacity>
                  );
              })}
          </View>
        )
    }

    return (
      <View style={{display: 'flex', flexDirection: 'column' ,backgroundColor : "#989696", flex: 1}}>
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
                    {showAnswers()}
                </ScrollView>
            </View>
          )}
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#545353',
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
        backgroundColor: '#6102cc',
        elevation: 20,

    },
   });

export default Test

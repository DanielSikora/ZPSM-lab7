/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import { styles } from "./Style";

const tasks = [
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question" : "Czy dziobak to ssak ?",
    "answers": [
      {
        "content": "Tak",
        "isCorrect": true
      },
      {
        "content": "Nie",
        "isCorrect": false
      },
      {
        "content": "50/50",
        "isCorrect": false
      },
      {
        "content": "Nie wiem",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
]

this.wynik = 0;

const TestTwo = (props) => {

  const [points, setPoints] = useState(0);
  const [currentIndex, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const [answerIndex, setAnswerIndex] = useState();

  const clear = () => {
    setPoints(0);
    this.wynik = 0;
    setIndex(0);
    setKey(prevKey => prevKey + 1);
    setIsComplete(false);
    setIsPlaying(true);
  }

  const result = () => {
    setIsComplete(true);

    Alert.alert(
      'wynik',
      'Twój wynik to ' + this.wynik,
      [
        {text: 'Wyjdź do menu', onPress: async () => {
            props.navigation.navigate('Home page');
          }},
        {text: 'Powtórz', onPress: () => {
            clear();
          }, style: 'cancel'},
      ],
      { cancelable: false }
    );
  }

  const handleCheckAnswer = (answerIndex) => {
    if(tasks[currentIndex].answers[answerIndex].isCorrect === true){
      setPoints(points + 1);
      this.wynik += 1;
      console.log(points);
    }
    if(currentIndex === tasks.length-1){
      result();
    }else{
      const index = currentIndex + 1;
      setKey(prevKey => prevKey + 1);
      setIndex(index);
    }
  };

  React.useEffect(() => {
    return props.navigation.addListener("focus", () => {
      clear();
    });
  }, [props.navigation]);

  useEffect(() => {
    console.log("index:" + currentIndex);
    console.log("indexAnswer:" + answerIndex);



    if(currentIndex === tasks.length-1){
      result();
    }
  }, [currentIndex, answerIndex]);

  //navigation.reset

  //dekompoment

  return (
    <View style={styles.testCONT}>
      <View style={{margin: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.qustionsNUM}>Question {currentIndex+1} of {tasks.length}                 </Text>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          key={key}
          duration={tasks[currentIndex].duration}
          colors={['#004777']}
          size={50}
          strokeWidth={5}
          trailStrokeWidth={5}
          onComplete={() => {
            if(isComplete !== true && currentIndex === tasks.length-1){
              result();
            }
            else if(isComplete !== true) {
              const index = currentIndex + 1;
              setIndex(index);
              return { shouldRepeat: true }
            }
          }}
        >
          {({ remainingTime }) => <Text style={{fontSize: 20}}>{remainingTime}</Text>}
        </CountdownCircleTimer>

      </View>
      <View>
        <ProgressBar style={{height: 16, margin: 20}} progress={(currentIndex+1)/10} color={'green'}  />
      </View>
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center', margin: 10}}>{tasks[currentIndex].question}</Text>
        {/*<Text style={{fontSize: 15, margin: 20}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>*/}
      </View>
      <View style={styles.answers}>
        <View style={styles.rows}>
          <View style={styles.BRNtop}>
            <TouchableOpacity onPress={() => handleCheckAnswer(0)} title="Answer A" style={styles.btn}>
              <Text style={styles.NRtext}>{tasks[currentIndex].answers[0].content}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.BRNtop}>
            <TouchableOpacity onPress={() => handleCheckAnswer(1)} title="Answer B" style={styles.btn}>
              <Text style={styles.NRtext}>{tasks[currentIndex].answers[1].content}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.BRNdown}>
            <TouchableOpacity onPress={() => handleCheckAnswer(2)} title="Answer C" style={styles.btn}>
              <Text style={styles.NRtext}>{tasks[currentIndex].answers[2].content}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.BRNdown}>
            <TouchableOpacity onPress={() => handleCheckAnswer(3)} title="Answer D" style={styles.btn}>
              <Text style={styles.NRtext}>{tasks[currentIndex].answers[3].content}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  )
}


export default TestTwo


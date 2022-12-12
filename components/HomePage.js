/* eslint-disable */
import "react-native-gesture-handler";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { styles } from "./Style";

function HomePage({ navigation }) {
  return (

    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.middle}>
          <Text>Test historyczny</Text>
          <Text>Ten test jest o historii</Text>
        </View>
        <View style={styles.middle}>
          <Text>Ten test jest o biologii</Text>
          <Text>Ten test jest o biologii</Text>
        </View>
        <View style={styles.middle}>
          <Text>Test motoryzacyjny</Text>
          <Text>Ten test jest o motoryzacji</Text>
        </View>


      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Test One")} style={styles.appButtonContainer2}>
        <Text style={styles.appButtonText}>Question one</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomePage;

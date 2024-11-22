import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios  from 'axios';

export default function App() {

  const getPhotos = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
      return response.data;
    } catch (error) {
      console.error('Ocorreu um erro ao buscar as fotos.', error);
      return [];
    }
  };


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

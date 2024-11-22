import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useState } from 'react';
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

  const [photos, setPhotos] = useState ([]);

  const handlePhotos = async () => {
    const newPhotos = await getPhotos();
    setPhotos(newPhotos);
  };


  return (
    <View style={styles.container}>
      <Pressable onPress={handlePhotos} style={styles.botaoPesquisar} > 
        <Text style={styles.botaoTexto} >
          PESQUISAR 
        </Text>
      </Pressable>
       <ScrollView>
        {photos.length > 0 ? (
          photos.slice(0, 5).map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo.url }}
              style={styles.image}
            />
          ))
        ) : (
          <Text>Clique em "pesquisar" para ver fotos de gatinhos!</Text>
        )}
      </ScrollView>
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
  image: {
    width: '50vh',
    height: '50vh',
    margin: 10,
  },
  botaoPesquisar: {
    borderWidth: 1,
    borderColor: '#845EC2', 
    borderRadius: 10,
    fontSize: 18, 
    fontWeight: '700',
    backgroundColor: '#AE7CFF', 
    shadowColor: '#845EC2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    padding: 10,
    margin: 20,
    textAlign: 'center',
  }, botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

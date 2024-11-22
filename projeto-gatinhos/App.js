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
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

export default function Hero({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/images/city-blue-sky.jpg')} // Caminho da imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Logo acima do título */}
        <Image
          source={require('../../assets/images/logo.png')} // Caminho da logo
          style={styles.logo}
          resizeMode="contain" // Ajusta para manter as proporções
        />

        {/* Título e Descrição */}
        <Text style={styles.title}>Resolver+</Text>
        <Text style={styles.subtitle}>
          Transforme sua cidade com denúncias inteligentes. Participe e receba benefícios!
        </Text>

        {/* Botão para Começar */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Começar Agora</Text>
        </TouchableOpacity>

        {/* Botão para About Us */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Text style={styles.buttonText}>Conheça nossa ideia</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo translúcido para contraste
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 150, // Largura da logo
    height: 150, // Altura da logo
    marginBottom: 20, // Espaço entre a logo e o título
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#DDDDDD',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: 'green', // Verde pastel
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // Botão arredondado
    width: '210',
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: 'blue', // Azul pastel
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // Botão arredondado
    width: '210',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function Hero({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/images/city-blue-sky.jpg')} // Caminho corrigido para a imagem
      style={styles.background}
      resizeMode="cover" // Ajusta a imagem para cobrir o fundo
    >
      <View style={styles.overlay}>
        {/* Conteúdo da Hero */}
        <Text style={styles.title}>Resolver+</Text>
        <Text style={styles.subtitle}>
          Transforme sua cidade com denúncias inteligentes. Participe e receba benefícios!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Começar Agora</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro translúcido para melhor contraste
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto branco para destacar sobre o fundo
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#DDDDDD', // Cinza claro para suavidade
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#A4C3B2', // Verde pastel
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // Botão arredondado
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

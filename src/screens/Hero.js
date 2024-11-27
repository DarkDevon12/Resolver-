import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking,
} from 'react-native';

export default function Hero({ navigation }) {
  const handleWhatsApp = () => {
    const message = 'Olá, preciso de ajuda com o Resolver Plus!';
    const phoneNumber = '17981117587';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) =>
      console.error('Erro ao abrir o WhatsApp:', err)
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/city-blue-sky.jpg')} // Caminho da imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Adicionando a Logo */}
        <Image
          source={require('../../assets/images/logo-1.png')} // Caminho da logo
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título e Descrição */}
        <Text style={styles.title}>Resolver+</Text>
        <Text style={styles.subtitle}>
          Transforme sua cidade com denúncias inteligentes. Participe e receba benefícios!
        </Text>

        {/* Botão para Login */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Começar Agora</Text>
        </TouchableOpacity>

        {/* Botão para Sobre Nós */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Text style={styles.buttonText}>Conheça nossa ideia</Text>
        </TouchableOpacity>

        {/* Botão para Notícias */}
        <TouchableOpacity
          style={styles.newsButton}
          onPress={() => Linking.openURL('https://jornaldebarretos.com.br')}
        >
          <Text style={styles.buttonText}>Notícias</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para Suporte/SAC */}
      <TouchableOpacity style={styles.supportButton} onPress={handleWhatsApp}>
        <Text style={styles.supportButtonText}>Fale com o Suporte</Text>
      </TouchableOpacity>
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
    width: 150, // Ajuste da largura da logo
    height: 150, // Ajuste da altura da logo
    marginBottom: 10, // Espaço entre a logo e o título
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
  newsButton: {
    backgroundColor: 'gray', // Cinza para o botão de notícias
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
  supportButton: {
    position: 'absolute',
    bottom: 30, // Posicionado na parte inferior da tela
    right: 20,
    backgroundColor: '#25D366', // Cor do WhatsApp
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

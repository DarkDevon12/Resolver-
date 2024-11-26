import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const cleanedCpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cleanedCpf.length === 11) {
      navigation.navigate('Formulario'); // Navega para a próxima tela
    } else {
      setError('CPF inválido. Digite os 11 dígitos do CPF.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/ruas.jpg')} // Caminho da nova imagem
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Acesse o Resolver+</Text>
          <Text style={styles.subtitle}>Digite seu CPF para continuar</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            placeholderTextColor="#aaa"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Suas informações estão seguras conosco.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo translúcido para contraste
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto branco para destaque
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#DDDDDD', // Cinza claro para suavidade
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    width: '120',
    backgroundColor: '#A4C3B2', // Verde pastel
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});

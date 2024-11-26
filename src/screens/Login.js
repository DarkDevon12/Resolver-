import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // Verifica se o CPF tem 11 dígitos ou é uma sequência repetida
  }

  let sum = 0;
  let remainder;

  // Calcula o primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;

  // Calcula o segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');

  // Formata o CPF com máscara
  const formatCPF = (value) => {
    const cleanedCpf = value.replace(/\D/g, ''); // Remove tudo que não for número
    const maxLength = 11;

    // Limita os caracteres a no máximo 11
    if (cleanedCpf.length > maxLength) return cpf;

    // Adiciona a máscara
    if (cleanedCpf.length <= 3) return cleanedCpf;
    if (cleanedCpf.length <= 6) return `${cleanedCpf.slice(0, 3)}.${cleanedCpf.slice(3)}`;
    if (cleanedCpf.length <= 9) {
      return `${cleanedCpf.slice(0, 3)}.${cleanedCpf.slice(3, 6)}.${cleanedCpf.slice(6)}`;
    }
    return `${cleanedCpf.slice(0, 3)}.${cleanedCpf.slice(3, 6)}.${cleanedCpf.slice(6, 9)}-${cleanedCpf.slice(9)}`;
  };

  const handleLogin = async () => {
    const cleanedCpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cleanedCpf.length < 11) {
      setError('CPF incompleto. Por favor, insira os 11 dígitos do CPF.');
      return;
    }
  
    if (validateCPF(cleanedCpf)) {
      setError('');
      try {
        await AsyncStorage.setItem('currentUserCPF', cleanedCpf); // Salva o CPF no AsyncStorage
        navigation.navigate('Formulario'); // Navega para o formulário
      } catch (error) {
        console.error('Erro ao salvar CPF no AsyncStorage:', error);
      }
    } else {
      setError('CPF inválido. Por favor, insira um CPF válido.');
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
            onChangeText={(value) => setCpf(formatCPF(value))}
            keyboardType="numeric"
            maxLength={14} // Inclui a máscara (11 dígitos + pontos e hífen)
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Suas informações estão seguras conosco.</Text>
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
    width: 250, // Tamanho fixo para o campo de CPF
    height: 45, // Altura consistente para o campo
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  button: {
    width: 250, // Mesma largura do campo de CPF
    height: 45, // Altura consistente
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
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

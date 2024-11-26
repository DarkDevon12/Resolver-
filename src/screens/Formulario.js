import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


export default function Formulario({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [imagens, setImagens] = useState([]);
  const [error, setError] = useState('');

  // Solicitar permissões para a galeria
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Precisamos da permissão para acessar a galeria.');
      }
    };
    requestPermissions();
  }, []);

  const handleChooseFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const validImages = result.assets.filter(
        (image) => !image.fileSize || image.fileSize <= 10 * 1024 * 1024
      );
      if (validImages.length < result.assets.length) {
        Alert.alert(
          'Erro',
          'Algumas imagens foram descartadas por excederem o limite de 10MB.'
        );
      }
      setImagens([...imagens, ...validImages]);
    }
  };

  const handleSubmit = async () => {
    if (!titulo || !descricao || !endereco) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
  
    if (imagens.length === 0) {
      Alert.alert('Atenção', 'Por favor, anexe pelo menos uma imagem como prova.');
      return;
    }
  
    const newReport = {
      title: titulo,
      description: descricao,
      address: endereco,
      status: 'Em análise',
      date: new Date().toLocaleString(),
      files: imagens,
    };
  
    try {
      const currentUserCPF = await AsyncStorage.getItem('currentUserCPF'); // Obtém o CPF atual
      if (!currentUserCPF) {
        Alert.alert('Erro', 'CPF do usuário não encontrado. Faça login novamente.');
        return;
      }
  
      // Carrega denúncias existentes para o CPF
      const storedReports = await AsyncStorage.getItem(`reports_${currentUserCPF}`);
      const reports = storedReports ? JSON.parse(storedReports) : [];
  
      // Adiciona a nova denúncia
      const updatedReports = [newReport, ...reports];
      await AsyncStorage.setItem(`reports_${currentUserCPF}`, JSON.stringify(updatedReports));
  
      Alert.alert('Denúncia Enviada', 'Sua denúncia foi registrada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MyReports'),
        },
      ]);
  
      setTitulo('');
      setDescricao('');
      setEndereco('');
      setImagens([]);
      setError('');
    } catch (error) {
      console.error('Erro ao salvar denúncia:', error);
      Alert.alert('Erro', 'Não foi possível registrar sua denúncia. Tente novamente.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Registrar Denúncia</Text>

          <TextInput
            style={styles.input}
            placeholder="Título da denúncia"
            placeholderTextColor="#aaa"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do problema"
            placeholderTextColor="#aaa"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
          />

          <TextInput
            style={styles.input}
            placeholder="Endereço completo (Rua, Bairro, Cidade, Estado)"
            placeholderTextColor="#aaa"
            value={endereco}
            onChangeText={setEndereco}
          />

          <TouchableOpacity style={styles.fileButton} onPress={handleChooseFile}>
            <Text style={styles.fileButtonText}>
              {imagens.length > 0
                ? `${imagens.length} Imagem(ns) Selecionada(s)`
                : 'Anexar Imagens'}
            </Text>
          </TouchableOpacity>

          <View style={styles.imagePreview}>
            {imagens.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Botão para enviar denúncia */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar Denúncia</Text>
          </TouchableOpacity>

          {/* Botão para ver minhas denúncias */}
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('MyReports')}
          >
            <Text style={styles.buttonText}>Ver Minhas Denúncias</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D5C61',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fileButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  fileButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imagePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: '#007BFF',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});

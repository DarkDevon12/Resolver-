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
import * as ImagePicker from 'expo-image-picker';

export default function Formulario({ navigation }) {
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [referencia, setReferencia] = useState(''); // Novo campo de referência
  const [imagens, setImagens] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Sair do Formulário',
        'Você tem certeza que deseja sair? Os dados preenchidos serão perdidos.',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => {} },
          {
            text: 'Sair',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation]);

  const handleChooseFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      const validImages = result.assets.filter((image) => image.fileSize <= 10 * 1024 * 1024);
      if (validImages.length < result.assets.length) {
        Alert.alert(
          'Erro',
          'Algumas imagens foram descartadas por excederem o limite de 10MB.'
        );
      }
      setImagens([...imagens, ...validImages]);
    }
  };

  const handleSubmit = () => {
    if (!categoria || !descricao || !endereco) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (imagens.length === 0) {
      Alert.alert('Atenção', 'Por favor, anexe pelo menos uma imagem como prova.');
      return;
    }

    const report = {
      category: categoria,
      description: descricao.trim(),
      address: endereco.trim(),
      reference: referencia.trim(), // Adiciona o ponto de referência
      status: 'Em análise',
      date: new Date().toLocaleString(),
      files: imagens,
    };

    Alert.alert(
      'Denúncia Enviada',
      'Sua denúncia foi registrada com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MyReports', { newReport: report }),
        },
      ]
    );

    setCategoria('');
    setDescricao('');
    setEndereco('');
    setReferencia(''); // Limpa o campo de referência
    setImagens([]);
    setError('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Registrar Denúncia</Text>

          <View style={styles.selectBox}>
            <Text style={styles.selectLabel}>Categoria</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() =>
                Alert.alert('Escolha uma categoria', '', [
                  { text: 'Buraco na via', onPress: () => setCategoria('Buraco na via') },
                  { text: 'Luz do poste', onPress: () => setCategoria('Luz do poste') },
                  { text: 'Água parada', onPress: () => setCategoria('Água parada') },
                  { text: 'Lixo acumulado', onPress: () => setCategoria('Lixo acumulado') },
                  { text: 'Árvore caída', onPress: () => setCategoria('Árvore caída') },
                  { text: 'Semáforo defeituoso', onPress: () => setCategoria('Semáforo defeituoso') },
                  { text: 'Placa caída', onPress: () => setCategoria('Placa caída') },
                  { text: 'Cancelar', style: 'cancel' },
                ])
              }
            >
              <Text style={styles.dropdownText}>
                {categoria ? categoria : 'Selecione uma categoria'}
              </Text>
            </TouchableOpacity>
          </View>

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
            placeholder="Endereço (Rua, Número, bairro, cidade)"
            placeholderTextColor="#aaa"
            value={endereco}
            onChangeText={setEndereco}
          />

          <TextInput
            style={styles.input}
            placeholder="Ponto de Referência"
            placeholderTextColor="#aaa"
            value={referencia}
            onChangeText={setReferencia}
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar Denúncia</Text>
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
  selectBox: {
    marginBottom: 20,
  },
  selectLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  fileButton: {
    backgroundColor: 'blue',
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

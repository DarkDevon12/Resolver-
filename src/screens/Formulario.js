import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Formulario() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  // Função para selecionar imagem
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Função para enviar o formulário
  const submitForm = () => {
    if (!title || !description || !image) {
      setError('Todos os campos são obrigatórios, incluindo o anexo.');
      return;
    }
    alert('Denúncia enviada com sucesso!');
    setTitle('');
    setDescription('');
    setImage(null);
    setError('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar Denúncia</Text>
        <TextInput
          style={styles.input}
          placeholder="Título (Ex.: Buraco na Rua)"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.textArea}
          placeholder="Descrição (Detalhe o problema)"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor="#aaa"
        />

        {/* Botão para selecionar imagem */}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>Anexar Prova</Text>
        </TouchableOpacity>

        {/* Exibição da imagem selecionada */}
        {image && <Image source={{ uri: image }} style={styles.image} />}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
          <Text style={styles.submitText}>Enviar Denúncia</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  image: { width: '100%', height: 200, marginTop: 10, borderRadius: 8 },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});

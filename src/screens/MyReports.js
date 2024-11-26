import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyReports({ navigation }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const currentUserCPF = await AsyncStorage.getItem('currentUserCPF'); // Obtém o CPF atual
        if (!currentUserCPF) {
          Alert.alert('Erro', 'CPF do usuário não encontrado. Faça login novamente.');
          return;
        }

        // Carrega denúncias para o CPF atual
        const storedReports = await AsyncStorage.getItem(`reports_${currentUserCPF}`);
        const reports = storedReports ? JSON.parse(storedReports) : [];
        setReports(reports);
      } catch (error) {
        console.error('Erro ao carregar denúncias:', error);
      }
    };

    fetchReports();
  }, []);


  const clearReports = async () => {
    Alert.alert('Confirmar', 'Você tem certeza que deseja excluir todas as denúncias?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('reports');
            setReports([]);
          } catch (error) {
            console.error('Erro ao limpar denúncias:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Denúncias</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{report.title}</Text>
              <Text style={styles.cardDescription}>{report.description}</Text>
              <Text style={styles.cardAddress}>Endereço: {report.address}</Text>
              <Text style={styles.cardStatus}>Status: {report.status}</Text>
              <Text style={styles.cardDate}>{report.date}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReports}>Você ainda não fez nenhuma denúncia.</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Formulario')}
      >
        <Text style={styles.buttonText}>Fazer Nova Denúncia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3d0b3',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  cardAddress: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#777777',
  },
  noReports: {
    fontSize: 16,
    color: '#7D7A81',
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#5D5C61',
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
  clearButton: {
    backgroundColor: 'red',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

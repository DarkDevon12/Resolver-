import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminPanel() {
  const [reports, setReports] = useState([]);

  // Carregar todas as denúncias
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const reportKeys = keys.filter((key) => key.startsWith('reports_'));
        let allReports = [];
        for (let key of reportKeys) {
          const storedReports = await AsyncStorage.getItem(key);
          const parsedReports = JSON.parse(storedReports) || [];
          allReports = [...allReports, ...parsedReports];
        }
        setReports(allReports);
      } catch (error) {
        console.error('Erro ao carregar denúncias:', error);
      }
    };

    fetchReports();
  }, []);

  // Alterar o status de uma denúncia
  const updateStatus = (index, newStatus) => {
    const updatedReports = [...reports];
    updatedReports[index].status = newStatus;
    setReports(updatedReports);

    // Salvar alterações no AsyncStorage
    Alert.alert('Status Atualizado', `O status foi alterado para "${newStatus}".`);
  };

  // Apagar uma denúncia
  const deleteReport = (index) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta denúncia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedReports = reports.filter((_, i) => i !== index);
            setReports(updatedReports);
            Alert.alert('Denúncia Excluída', 'A denúncia foi removida com sucesso.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Denúncias</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{report.title}</Text>
              <Text style={styles.cardDescription}>{report.description}</Text>
              <Text style={styles.cardAddress}>Endereço: {report.address}</Text>
              <Text style={styles.cardStatus}>Status: {report.status}</Text>
              <Text style={styles.cardDate}>Data: {report.date}</Text>

              {/* Botões para alterar status */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.completeButton]}
                  onPress={() => updateStatus(index, 'Concluído')}
                >
                  <Text style={styles.buttonText}>Concluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => deleteReport(index)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noReports}>Nenhuma denúncia encontrada.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 10,
  },
  cardAddress: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 10,
  },
  cardStatus: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#333333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  completeButton: {
    backgroundColor: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noReports: {
    fontSize: 16,
    color: '#7D7A81',
    textAlign: 'center',
    marginTop: 50,
  },
});

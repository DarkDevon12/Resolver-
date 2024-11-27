import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyReports({ navigation, route }) {
  const [reports, setReports] = useState([]); // Lista de denúncias
  const [points, setPoints] = useState(0); // Pontos acumulados
  const [discount, setDiscount] = useState(0); // Porcentagem de desconto acumulada
  const { newReport } = route.params || {}; // Nova denúncia, se houver

  useEffect(() => {
    const fetchReportsAndPoints = async () => {
      try {
        const currentUserCPF = await AsyncStorage.getItem('currentUserCPF');
        if (!currentUserCPF) return;

        // Recupera denúncias
        const storedReports = await AsyncStorage.getItem(`reports_${currentUserCPF}`);
        const existingReports = storedReports ? JSON.parse(storedReports) : [];

        if (newReport) {
          const updatedReports = [newReport, ...existingReports];
          await AsyncStorage.setItem(
            `reports_${currentUserCPF}`,
            JSON.stringify(updatedReports)
          );
          setReports(updatedReports);
        } else {
          setReports(existingReports);
        }

        // Recupera pontos
        const pointsKey = `points_${currentUserCPF}`;
        const currentPoints = parseInt(await AsyncStorage.getItem(pointsKey)) || 0;
        setPoints(currentPoints);

        // Calcula o desconto com base nos pontos
        const calculatedDiscount = Math.min((currentPoints / 100) * 2.5, 10); // Máximo de 10%
        setDiscount(calculatedDiscount);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchReportsAndPoints();
  }, [newReport]);

  const toggleResolveStatus = async (reportIndex) => {
    try {
      const currentUserCPF = await AsyncStorage.getItem('currentUserCPF');
      if (!currentUserCPF) return;

      const storedReports = await AsyncStorage.getItem(`reports_${currentUserCPF}`);
      const existingReports = storedReports ? JSON.parse(storedReports) : [];

      const selectedReport = existingReports[reportIndex];
      let currentPoints = parseInt(await AsyncStorage.getItem(`points_${currentUserCPF}`)) || 0;

      // Alterna o status
      if (selectedReport.status === 'Resolvido') {
        selectedReport.status = 'Não Resolvido';
        currentPoints -= 100; // Remove 100 pontos
      } else {
        selectedReport.status = 'Resolvido';
        currentPoints += 100; // Adiciona 100 pontos
      }

      // Atualiza os dados
      await AsyncStorage.setItem(`reports_${currentUserCPF}`, JSON.stringify(existingReports));
      await AsyncStorage.setItem(`points_${currentUserCPF}`, currentPoints.toString());

      setReports(existingReports);
      setPoints(currentPoints);

      // Recalcula o desconto
      const calculatedDiscount = Math.min((currentPoints / 100) * 2.5, 10); // Máximo de 10%
      setDiscount(calculatedDiscount);

      Alert.alert('Status Atualizado', `Denúncia marcada como "${selectedReport.status}".`);
    } catch (error) {
      console.error('Erro ao alternar status:', error);
    }
  };

  const clearReports = async () => {
    try {
      const currentUserCPF = await AsyncStorage.getItem('currentUserCPF');
      if (!currentUserCPF) {
        Alert.alert('Erro', 'CPF do usuário não encontrado.');
        return;
      }

      Alert.alert(
        'Limpar Denúncias',
        'Você tem certeza que deseja apagar todas as suas denúncias? Seus pontos também serão zerados.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Apagar',
            style: 'destructive',
            onPress: async () => {
              await AsyncStorage.removeItem(`reports_${currentUserCPF}`);
              await AsyncStorage.removeItem(`points_${currentUserCPF}`);
              setReports([]);
              setPoints(0);
              setDiscount(0);
              Alert.alert('Denúncias Removidas', 'Todas as suas denúncias foram apagadas com sucesso.');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao limpar denúncias:', error);
      Alert.alert('Erro', 'Não foi possível limpar as denúncias. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsTitle}>Seus Pontos</Text>
        <Text style={styles.pointsValue}>{points} pontos</Text>
        <Text style={styles.benefitsInfo}>
          Você possui {discount.toFixed(1)}% de desconto em lojas patrocinadoras.
        </Text>
        <Text style={styles.benefitsInfo}>
          A cada 100 pontos você ganha 2,5% de desconto. Acumule até 10% por mês!
        </Text>
      </View>

      <Text style={styles.title}>Minhas Denúncias</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardCategory}>{report.category}</Text>
              <Text style={styles.cardDescription}>{report.description}</Text>
              <Text style={styles.cardAddress}>{report.address}</Text>
              <Text style={styles.cardReference}>Referência: {report.reference}</Text>
              <Text
                style={[
                  styles.cardStatus,
                  report.status === 'Resolvido' ? styles.resolvedStatus : styles.unresolvedStatus,
                ]}
              >
                Status: {report.status}
              </Text>
              <Text style={styles.cardDate}>{report.date}</Text>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  report.status === 'Resolvido' ? styles.resolvedButton : styles.unresolvedButton,
                ]}
                onPress={() => toggleResolveStatus(index)}
              >
                <Text style={styles.toggleButtonText}>
                  {report.status === 'Resolvido' ? 'Marcar como Não Resolvido' : 'Marcar como Resolvido'}
                </Text>
              </TouchableOpacity>
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

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearReports}
      >
        <Text style={styles.buttonText}>Limpar Minhas Denúncias</Text>
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
  pointsContainer: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginTop: 5,
  },
  benefitsInfo: {
    fontSize: 14,
    color: '#00796b',
    marginTop: 10,
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
  cardCategory: {
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
    color: '#555',
    marginBottom: 5,
  },
  cardReference: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resolvedStatus: {
    color: 'green',
  },
  unresolvedStatus: {
    color: 'orange',
  },
  cardDate: {
    fontSize: 12,
    color: '#555',
  },
  toggleButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  resolvedButton: {
    backgroundColor: '#FF5555',
  },
  unresolvedButton: {
    backgroundColor: '#4CAF50',
  },
  toggleButtonText: {
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
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ff5555',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Sobre o Resolver+</Text>

      {/* Texto de Introdução */}
      <Text style={styles.description}>
        Resolver+ é uma plataforma que promove a participação ativa dos cidadãos na gestão urbana. Os usuários podem registrar denúncias de problemas como iluminação pública
        defeituosa, buracos nas ruas ou acúmulo de lixo. A cada denúncia resolvida, o cidadão recebe pontos, que podem ser acumulados e convertidos em benefícios fiscais, como
        descontos no IPTU.
      </Text>

      <Text style={styles.description}>
        O projeto visa integrar tecnologia e engajamento social para melhorar a qualidade de vida urbana, incentivando a participação ativa e a sustentabilidade das cidades.
      </Text>

      {/* Imagem do Grupo */}
      <Image
        source={require('../../assets/images/group.jpg')} // Caminho da imagem fornecida
        style={styles.image}
        resizeMode="contain"
      />

      {/* Créditos ou Frase Inspiradora */}
      <Text style={styles.footer}>
        "Juntos, podemos transformar nossas cidades e criar um futuro mais sustentável."
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5', // Fundo suave
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5D5C61', // Cinza escuro para profissionalismo
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7D7A81', // Cinza claro para suavidade
    textAlign: 'justify',
    lineHeight: 24,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 250, // Ajuste conforme necessário
    marginVertical: 20,
    borderRadius: 10,
  },
  footer: {
    fontSize: 14,
    color: '#A4C3B2', // Verde pastel para inspirar esperança
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});

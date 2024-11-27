import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';

export default function Task({ navigation }) {
    return (
        <ImageBackground
            source={require('../../assets/images/city-blue-sky.jpg')} // Fundo temático
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Escolha uma Opção</Text>

                {/* Botão para Fazer Nova Denúncia */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('Formulario')}
                >
                    <Text style={styles.buttonText}>Fazer Nova Denúncia</Text>
                </TouchableOpacity>

                {/* Botão para Ver Minhas Denúncias */}
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('MyReports')}
                >
                    <Text style={styles.buttonText}>Ver Minhas Denúncias</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo translúcido
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    primaryButton: {
        backgroundColor: 'green', // Verde pastel
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    secondaryButton: {
        backgroundColor: 'blue', // Azul pastel
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

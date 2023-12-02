import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import IconInput from '../components/IconInput';
import commomStyles from '../commomStyles';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'react-native-axios'
import {server, showSuccess, showError} from '../common'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CursoForm = (props) => {    

    const [courseData, setCourseData] = useState({
        nome: '',
        professor: '',
        categoria: '',
        descricao: '',
        imagem: ''
    });

    const handleChange = (field, value) => {
        setCourseData((prevCourseData) => ({
            ...prevCourseData,
            [field]: value,
        }));
    };
    

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('Auth')
    }

    const handleSubmit = async () => {
        try {
          const response = await axios.post(`${server}/curso`, courseData);
          console.log(response);
              
          Alert.alert('Sucesso', 'Curso adicionado com sucesso!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        } catch (error) {
          console.log(error);
        
          Alert.alert('Erro', 'Erro ao adicionar o curso. Tente novamente.');
        }
      };

    return (
        <LinearGradient
            colors={['#F6D365', '#FF73B3']} 
            style={styles.container}
        >
            <SafeAreaView style={styles.formContainer}>
            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={logout}
            >
                <Icon name='sign-out' size={45} color={'red'}/>
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight: 'bold',color: 'black', marginBottom: 20}}>CADASTRAR CURSO</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label} >Nome do Curso:</Text>
                    <IconInput 
                        icon='book'
                        placeholder='Digite o nome do curso'
                        value={courseData.nome}
                        onChangeText={(text) => handleChange('nome', text)}
                    />

                    <Text style={styles.label} >Nome do Professor responsável:</Text>
                    <IconInput 
                        icon={'user'}
                        placeholder={'Digite o nome do professor'}
                        value={courseData.professor}
                        onChangeText={(text) => handleChange('professor', text)}
                    />

                    <Text style={styles.label} >Nome da Categoria:</Text>
                    <IconInput 
                        icon={'tags'}
                        placeholder={'Digite o nome da categoria'}
                        value={courseData.categoria}
                        onChangeText={(text) => handleChange('categoria', text)}
                    />

                    <Text style={styles.label} >Descrição:</Text>
                    <IconInput 
                        icon={'file-text-o'}
                        placeholder={'Digite a descrição do curso'}
                        value={courseData.descricao}
                        onChangeText={(text) => handleChange('descricao', text)}
                        multiline
                    />

                    <Text style={styles.label} >Upload da Imagem</Text>
                    <IconInput 
                        icon={'image'}
                        placeholder={'URL da Imagem'}
                        value={courseData.imagem}
                        onChangeText={(text) => handleChange('imagem', text)}
                    />
                </View>                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Cadastrar Curso</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    logoutButton: {
        position: 'absolute',
        top: -80, 
        left: 20, 
        zIndex: 1,         
        padding: 10,
    },
    formContainer: {        
        padding: 20,
        display: 'flex',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: 'rgba(240, 240, 240, 0.7)',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        boxSizing: 'border-box',
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },     
           
    },
    button: {
        backgroundColor: '#DC1E45',
        display: 'flex',    
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 400,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, .7)',
        shadowOpacity: 2,
        elevation: 8,
        shadowRadius: 20 ,
        shadowOffset : { width: 1, height: 13},
        marginTop: 70
    },
    buttonText: {
        fontFamily: commomStyles.fontFamily,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    label: {
        fontFamily: commomStyles.fontFamily,
        display: 'flex',
        fontSize: 16,
        marginBottom: 5,
        width: 250,    
        marginRight: 120,
        marginTop: 10,
    },
    courseImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,        
    },
});

export default CursoForm;

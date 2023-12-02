import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import IconInput from '../../components/IconInput';
import commomStyles from '../../commomStyles';
import axios from 'react-native-axios'
import { server, showError, showSuccess } from '../../common';

const EditCurso = ({ courseId, visible, onClose }) => {
  const [editedCurso, setEditedCurso] = useState({  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {

        if(courseId !== null && courseId !== undefined) {
          const response = await axios.get(`${server}/curso`)
          const selectedCurso = response.data.find(course => course.id === courseId) 
          if(selectedCurso) {
            setEditedCurso(selectedCurso)
          } else {
            console.error(`Curso com ID ${courseId} não encontrado`)          
          }
        }
      } catch (error) {
        console.error('erro a o buscar cursos:', error)
      }
    }
    fetchCourses()
  }, [courseId]);

  const handleChange = (field, value) => {
    setEditedCurso((prevCurso) => ({
      ...prevCurso,
      [field]: value,
    }));
  };

  const handleEdit = async () => {
    try {      
      const response = await axios.put(`${server}/curso/${courseId}`, editedCurso)
      
      Alert.alert('Edit','Curso editado com sucesso!',null,'OK')

    } catch (error) {
      console.error('Erro ao editar curso:', error)
    }    
    onClose();
  };

  return (
    <Modal visible={visible} animationType='slide' transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Curso</Text>
          <IconInput
            icon='book'
            placeholder='Digite o nome do curso'
            value={editedCurso.nome}
            onChangeText={(text) => handleChange('nome', text)}
          />
          <IconInput
            icon='user'
            placeholder='Digite o nome do professor'
            value={editedCurso.professor}
            onChangeText={(text) => handleChange('professor', text)}
          />
          <IconInput
            icon='tags'
            placeholder='Digite o nome da categoria'
            value={editedCurso.categoria}
            onChangeText={(text) => handleChange('categoria', text)}
          />
          <IconInput
            icon='file-text-o'
            placeholder='Digite a descrição do curso'
            value={editedCurso.descricao}
            onChangeText={(text) => handleChange('descricao', text)}
            multiline
          />
          <IconInput
            icon='image'
            placeholder='URL da Imagem'
            value={editedCurso.imagem}
            onChangeText={(text) => handleChange('imagem', text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Salvar Edição</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#DC1E45',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: 10,
      marginTop: 10,
    },
    buttonText: {
      fontFamily: commomStyles.fontFamily,
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default EditCurso;

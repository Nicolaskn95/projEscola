import {Alert,Platform} from 'react-native'
import axios from 'react-native-axios'

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000' : 'http://10.0.2.2:3000'


function showError(err) {
    if(err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err.response.data}`)
    } else {
        Alert.alert('Ops!, Ocorreu um problema', `Mensagem: ${err}`)
    }
}   

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
}

 const activateDeactivateCourse = async (courseId) => {
    try {
        await axios.put(`${server}/curso/${courseId}/ativar-desativar`);
    } catch (error) {
        console.error('Erro ao ativar/desativar curso:', error);
        throw error; 
    }
}

export {server, showError, showSuccess, activateDeactivateCourse}
import React, { Component, useState } from 'react'
import commomStyles from '../commomStyles'
import backGroundImage from '../../assets/imgs/screenLogin.jpg'
import AuthInput from '../components/AuthInput'
import { server, showError, showSuccess } from '../common'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { 
    ImageBackground, 
    StyleSheet, 
    Text , 
    View,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native'

const initialState= {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    acesso: false,
    stageNew: false
}

export default class Auth extends Component {
    
    state= {
        ...initialState,
        isSignedIn: true,     
    }    

    signInOrSignUp = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try{
            await axios.post(`${server}/signup`, {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                acesso: this.state.acesso,
                confirmPassword: this.state.confirmPassword,
            })
            showSuccess('Usuario cadastrado com sucesso!')
            this.setState({...initialState})
        } catch(e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,                
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`            
            if(res.data.acesso) {
                this.props.navigation.navigate('Admin', res.data)
            } else {
                this.props.navigation.navigate('Curso', res.data)
            }                
        } catch (e) {
            showError(e)
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground 
                source={backGroundImage} 
                style={styles.background}
                
            >
             <View style={styles.overlay} >
                <Text style={styles.title}>Escola</Text>
                <Image style={styles.image} source={require('../../assets/imgs/bear-png.png')}/>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {
                        this.state.stageNew &&
                        <AuthInput icon='user' 
                            placeholder='Nome' 
                            value={this.state.name} 
                            style={styles.input} 
                            onChangeText={name => this.setState({ name })}
                        />
                    }
                        <AuthInput icon='at'                             
                            placeholder='E-mail' 
                            value={this.state.email} 
                            style={styles.input} 
                            onChangeText={email => this.setState({ email })}
                        />
                        <AuthInput icon='lock' 
                            placeholder='Senha' 
                            value={this.state.password} 
                            style={styles.input} 
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry={true}
                        />
                    {
                        this.state.stageNew &&
                        <AuthInput icon='asterisk' 
                            placeholder='Confirmação de Senha' 
                            value={this.state.confirmPassword} 
                            style={styles.input} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry={true}
                        />
                    }
                    <TouchableOpacity onPress={this.signInOrSignUp}
                        disabled={!validForm}
                    >
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}}
                    onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    image: {
      width: 250,
      height: 250  
    },    
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(220, 30, 69, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'contain',       
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
        
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        width: '90%'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontFamily: commomStyles.fontFamily,
        color: "#FFF",
        fontSize: 20
    }, 
    subtitle: {
        fontFamily: commomStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10

    }
    
})
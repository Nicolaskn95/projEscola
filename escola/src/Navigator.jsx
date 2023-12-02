import React, { Component } from 'react'
import Auth from './screens/Auth'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthOrApp from './screens/AuthOrApp'
import CursoForm from './screens/CursoForm'
import AdminCurso from './screens/AdminCurso'

const Stack = createNativeStackNavigator()


export default class Navigator extends Component {
    
    render () {
        
        return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth' screenOptions={{headerShown: false}}>
            <Stack.Screen name='AuthOrApp' component={AuthOrApp} />            
            <Stack.Screen name='Admin' component={AdminCurso}/>
            <Stack.Screen name="Auth" component={Auth}/>
            <Stack.Screen name='Curso' component={CursoForm} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
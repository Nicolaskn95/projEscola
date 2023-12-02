import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export default props => {
    
    const [isFocused, setIsFocused] = useState(false)

    handleFocus = () => {        
        setIsFocused(true)
    }

    handleBlur = () => {
        setIsFocused(false)
    }

    return(
        <View style={[styles.container, props.style, isFocused && styles.inputFocused]}>
            <Icon name={props.icon} size={20} style={styles.icon}/>
            <TextInput 
                {...props} 
                style={[styles.input]}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 2,
        borderColor: 'black'    
    }, 
    inputFocused: {
        borderWidth: 2,
        borderColor: '#DC1E45',
    },
    icon :{
        color: '#333',
        marginLeft: 20
    },
    input: {
        marginLeft: 20,
        width: '70%',        
    }
})
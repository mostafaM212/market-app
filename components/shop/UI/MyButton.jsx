import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableNativeFeedback , TouchableOpacity, Platform, Alert } from 'react-native'
import propTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'; 


const MyButton = (props) => {

    const [disabled, setDisabled] = useState(true)
    const MyComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    const Children = props.iconName !== '' ? <FontAwesome5 name={props.iconName} size={24} color={props.iconColor} /> : props.children
     
    const onPressHandler = () => {
        if (disabled ) {
            props.onPress()
            
        } 
    }    
    return (
        <MyComponent activeOpacity={.5} onPress={onPressHandler} >
            <View style={{...styles.buttonContainer , ...props.style}}>
                <Text style={styles.text}>{ Children }</Text>
            </View>
        </MyComponent>
    )
}
MyButton.propTypes = {
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
    iconName: propTypes.string,
    iconSize: propTypes.number,
    iconColor: propTypes.string.isRequired,
    
}
export default MyButton

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
        
    },
    text: {
        color : 'white'
    }
})

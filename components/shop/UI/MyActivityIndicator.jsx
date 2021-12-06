import React from 'react'
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import Colors from '../../../constants/Colors'

const MyActivityIndicator = () => {
    return (
        <View style={styles.indicatorContainer}>
            <ActivityIndicator color={Colors.primary}
                size="large"
                
            />
        </View>
    )
}

export default MyActivityIndicator

const styles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center'
    }
})

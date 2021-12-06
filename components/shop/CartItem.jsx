import React from 'react'
import { StyleSheet, Text, View , TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons/'
import propTypes from 'prop-types'
import Colors from '../../constants/Colors'

const CartItem = (props) => {
    const {onRemove , cartItem , deleteable} = props
    const iconName = Platform.OS === 'android' ? 'md-trash' : 'ios-trash';
    
    return (
        <View style={styles.cardItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{cartItem.quantity}</Text>
                <Text style={styles.title}>{cartItem.productTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${cartItem.productPrice}</Text>
                {
                    deleteable && (
                    <TouchableOpacity onPress={ ()=>props.onRemove(cartItem.productId)}
                        style={styles.deleteButton}
                    >
                    <Ionicons name={iconName}
                        size={26}
                        color={'red'}
                    />
                </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

CartItem.propTypes = {
    onRemove: propTypes.func,
    cartItem : propTypes.object,
    deleteable : propTypes.bool.isRequired
}

export default CartItem

const styles = StyleSheet.create({
    cardItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        flex : 1
        
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    deleteButton: {
        margin :20
    },
    quantity: {
        color: Colors.primary ,
        fontSize: 16,
        marginRight : 8
    },
    title: {
        
    },
    amount: {
        
    }
})



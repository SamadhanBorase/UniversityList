import React from 'react'
import { View, StyleSheet } from 'react-native'


export const Divider = ({ topMargin = 10, color = '#f6921e' }) => {

    return (
        <View style={{ paddingVertical: 10 }}>
            <View style={{ ...styles.divider, marginTop: topMargin, borderBottomColor: color }} />
        </View>
    );
}


const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 1,
        borderBottomColor: '#f6921e',
        borderBottomWidth: 1
    }

})
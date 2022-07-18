
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from './divider';


const Like = ({ onPress: saveFavourite, isFavourite: favourite }) => {
    return (
        <TouchableOpacity delayPressOut={0.8} onPress={saveFavourite}
            style={{ ...styles.buttonContainer, backgroundColor: 'orange', borderColor: 'black', flex: 0.28 }}>
            {favourite ? <Text style={{ ...styles.button, color: 'black' }}>Unlike</Text> : <Text style={{ ...styles.button, color: 'black' }}>Like</Text>}
        </TouchableOpacity>
    )
}

function CardItem(props) {

    const { data, dataBase, isFavourite } = props;
    const [list, setList] = useState([]);

    function saveFavourite(data) {
        console.log("pressed");
        dataBase.transaction(txn => {
            txn.executeSql(
                `INSERT INTO universities (country,name,web_pages) 
                VALUES (?,?,?)`,
                [data.country.toString(), data.name.toString(), data.web_pages.toString()],
                (sqlTxn, res) => {
                    console.log(`${data.name} added successfully`);
                },
                error => {
                    console.log("error on adding " + error.message);
                },
            );
        });
    }
    


    return (
        <View style={styles.container}>
            <View style={styles.viewStyle}>
                <View style={{ marginLeft: 10, marginTop: 23, width:'100%' }}>
                    <Text style={styles.displayName}>{data?.name}</Text>
                    <Text style={styles.number}>{data?.web_pages}</Text>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Like onPress={() => { saveFavourite(data) }} />
                    </View>
                    <Divider />
                </View>
            </View>
        </View>);

}

const styles = StyleSheet.create({
    displayName: {
        textTransform: 'capitalize',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: 'black',
        textAlign: 'left'

    },
    buttonContainer: {
        borderRadius: 40,
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: 'blue',
        justifyContent: 'center',
        width: 94,
        height: 25,
        alignSelf: 'flex-end'
    },
    button: {
        color: 'orange',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    container: {

        alignItems: 'flex-start',
        alignContent: 'center'
    },
    number: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#7f7f7f',
        fontWeight: "bold",
        textAlign: 'left'
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }

});

export default CardItem;
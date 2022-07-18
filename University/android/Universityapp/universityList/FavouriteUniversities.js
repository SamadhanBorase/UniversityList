import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./ButtonComponent";
import { Divider } from "./divider";

const Like = ({ onPress: deleteFavourite }) => {
    return (
        <TouchableOpacity delayPressOut={0.8} onPress={deleteFavourite}
            style={{ ...styles.buttonContainer, backgroundColor: 'orange', borderColor: 'black', flex: 0.28 }}>
            <Text style={{ ...styles.button, color: 'black' }}>Unlike</Text> 
        </TouchableOpacity>
    )
}

function FavouriteUniversities(props) {
    const { dataBase, setFavourite } = props;
    const [list, setList] = useState([]);
    useEffect(() => {
        getUniversity();
    }, []);
   
    const getUniversity = () => {
        dataBase.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM universities ORDER BY id asc`,
                [],
                (sqlTxn, res) => {
                    console.log("university retrieved successfully");
                    let len = res.rows.length;

                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ id: item?.id, country: item?.country, name: item?.name, web_pages: item?.web_pages });
                        }
                        setList(results);
                    }
                },
                error => {
                    console.log("error on getting universities " + error.message);
                },
            );
        });
    };

    const deleteFavourite = (id) => {
        dataBase?.transaction(txn => {
            txn.executeSql('DELETE FROM  universities where id=?',
                [id],
                (sqlTxn, res) => {
                    if (res.rowsAffected > 0) {
                        //then proceed ahead.
                        console.log(`${id} deleted successfully`);
                        setList(list.filter(item => item.id !== id));
                    }                   
                    },
                error => {
                    console.log("error on deleting " + error.message);
                },
            );
        });
    }

    return (
        <View >
            <View style={{ alignItems: 'flex-end' }}>
                <Button
                    onPress={() => { setFavourite(false) }}
                    title="Go Back"
                    color="#f194ff"
                />
            </View>
            <View style={styles.container}>
                <View style={{ padding: 24 }}>
                        <View style={{ overflow: 'hidden' }}>
                            <FlatList
                                initialNumToRender={10}
                                showsVerticalScrollIndicator={false}
                                data={list}
                            renderItem={({ item }) => <View style={styles.container}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <View style={{ marginLeft: 10, marginTop: 23, width: '100%' }}>
                                        <Text style={styles.displayName}>{item?.name}</Text>
                                        <Text style={styles.number}>{item?.web_pages}</Text>
                                        <View style={{ paddingHorizontal: 25 }}>
                                            <Like onPress={() => { deleteFavourite(item?.id) }} />
                                        </View>
                                        <Divider />
                                    </View>
                                </View>
                            </View>}
                            />
                        </View>
                </View>
            </View>
        </View >)
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
    }

});
export default FavouriteUniversities;
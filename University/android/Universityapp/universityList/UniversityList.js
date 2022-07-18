import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,

} from 'react-native';
import CardItem from './CardItem';

function UniversityList(props) {
    const { dataList, isLoading, dataBase, isFavourite, getUniversity } = props;
    useEffect(() => {
        console.log(dataList);
    })
    return (
        <View style={styles.container}>

            <View style={{ padding: 24 }}>
                {isLoading ? <Text>Loading...</Text> :
                    <View style={{ overflow: 'hidden' }}>
                        <FlatList
                            initialNumToRender={10}
                            showsVerticalScrollIndicator={false}
                            data={dataList}
                            renderItem={({ item }) => <CardItem data={item} dataBase={dataBase} isFavourite={isFavourite} getUniversity={getUniversity} />}
                        />
                    </View>
                }
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        alignContent: 'center'
    }

});

export default UniversityList;
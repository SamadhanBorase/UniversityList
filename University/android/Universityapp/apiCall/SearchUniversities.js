import React, {  useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,

} from 'react-native';
import Button from '../universityList/ButtonComponent';


function SearchUniversities(props)  {
    const { setDataList, setLoading } = props;
    const [text, onChangeText] = React.useState(null);  
    let country;
    const callAPI = async (enteredText) => {
        if (!enteredText) {
            country = "India"
        }
        else {
             country = enteredText?.replace(" ", "+");
        }
        console.log(country);
        await fetch('http://universities.hipolabs.com/search?country=' + country, { method: 'GET' })
            .then(response => response.json())
            .then(resp => setDataList(resp))
            .catch((error) => console.error(error.message))
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Enter country name to get universities'
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Button
                onPress={() => { callAPI(text) }}
                title="Get Universities"
                color="#f194ff"
            />
            
        </View>)
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center'
    },
    input: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 20,
        height: 40,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: 'blue',
        color: 'black',
        fontWeight: 'Poppins-Light',
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        
    }
})

export default SearchUniversities;

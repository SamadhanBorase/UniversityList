import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { openDatabase } from 'react-native-sqlite-storage';
import SearchUniversities from "./android/Universityapp/apiCall/SearchUniversities";
import UniversityList from "./android/Universityapp/universityList/UniversityList";
import FavouriteUniversities from "./android/Universityapp/universityList/FavouriteUniversities";
import Button from "./android/Universityapp/universityList/ButtonComponent";



const App = () => {
  const [favourite, setFavourite] = useState(false);

  const [dataList, setDataList] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setLoading] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const db = openDatabase({
    name: "universities",
  });

  const createTables = async () => {
    await db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS universities (id INTEGER PRIMARY KEY AUTOINCREMENT,country VARCHAR(50),name VARCHAR(150),web_pages VARCHAR(150))`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };

  useEffect(() => {
    createTables();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <StatusBar backgroundColor="orange" />

        {!favourite ? <View style={{}}>
          <Button
            onPress={() => { setFavourite(true) }}
            title="Favourite Universities"
            color="#f194ff"
          /><SearchUniversities setDataList={setDataList} setLoading={setLoading} />
          <UniversityList dataList={dataList} isLoading={isLoading} dataBase={db} setDataList={setDataList} />
        </View> : <FavouriteUniversities dataBase={db} setFavourite={setFavourite} isLoading={isLoading} />}
      </View>
    </SafeAreaView>
  )
}

export default App;
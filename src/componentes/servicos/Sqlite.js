import SQLite from 'react-native-sqlite-storage'

function abreConexao() {
   const database = SQLite.openDatabase("db.db")
   
   return database
}

export const db = abreConexao()
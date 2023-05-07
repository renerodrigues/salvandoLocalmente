import { db } from "./Sqlite";

export function criaTabela() {
  return db.transaction((transaction) => {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS ' +
      'Notas ' +
      '(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);')
  })

}

export async function adicionaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql('INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);', [nota.titulo, nota.categoria, nota.texto],
        () => {
          resolve('Nota adicionada com sucesso')
        })

    })
  })
}
export async function atualizaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql('UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;',
        [nota.titulo, nota.categoria, nota.texto, nota.id],
        () => {
          resolve('Nota atualizada com sucesso')
        })

    })
  })
}

export async function removeNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql('DELETE FROM Notas WHERE id = ?;',
        [nota.id],
        () => {
          resolve('Nota removida com sucesso')
        })

    })
  })
}

export async function buscaNotas() {
  // return  new Promise((resolve) => {
  //   db.transaction((transaction) => {
  //           transaction.executeSql('SELECT * FROM Notas;', [],
  //       (transaction, resultado) => {
  //         console.log('log== ' + resultado.rows._array)
  //         resolve(resultado.rows._array)

  //       })

  //   })
  // })
  var sqlResults = []

  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM Notas;', [], (tx, results) => {
      for (let i = 0; i < results.rows.length; i++) {
        sqlResults.push(results.rows.item(i))
      }
    });
  });
  return sqlResults;
}
export async function buscaNotasFiltro(categoria) {
  var sqlResults = []
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM Notas WHERE categoria = ?;', [categoria], (tx, results) => {
      
      for (let i = 0; i < results.rows.length; i++) {
        sqlResults.push(results.rows.item(i))
      }

      // sqlSize = results.rows.length;
      // sqlResults = results;
    });
  });
  return sqlResults;
}
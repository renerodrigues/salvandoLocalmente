import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react"
import { Nota } from "./src/componentes/Nota"
import { buscaNotas, buscaNotasFiltro, criaTabela } from "./src/componentes/servicos/NotasQuerys"
import { Picker } from "@react-native-picker/picker"

export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()

  }, [])

  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])
  const [filtro, setFiltro] = useState("Todos")



  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  async function filtraNotas(novoFiltro) {
    if(novoFiltro != 'Todas'){
       const filtroNota = await buscaNotasFiltro(novoFiltro)
    setNotas(filtroNota)
    return
    }
    mostraNotas()
  }
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.modalPicker}>
        <Picker
          selectedValue={filtro}
          onValueChange={novoFiltro => {setFiltro(novoFiltro),filtraNotas(novoFiltro) }}

        >
          <Picker.Item label="Todas" value="Todas" />
          <Picker.Item label="Pessoal" value="Pessoal" />
          <Picker.Item label="Trabalho" value="Trabalho" />
          <Picker.Item label="Outros" value="Outros" />
        </Picker>
      </View>
      <FlatList data={notas}
        renderItem={(nota) =>
          <Nota {...nota} setNotaSelecionada={setNotaSelecionada} mostraNotas={mostraNotas} />}
        keyExtractor={nota => nota.id}
      />

      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada} />
      <StatusBar />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#333333"
  },
  modalPicker: {
    borderRadius:8,
    backgroundColor: "#555555",
    marginHorizontal:15,
    marginVertical:10
  }
})


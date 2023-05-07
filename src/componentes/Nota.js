import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { buscaNotas, removeNota } from "./servicos/NotasQuerys";

export function Nota({ item, setNotaSelecionada, mostraNotas }) {
  const categorias = { Pessoal: "#FF924F", Outros: "#00911F", Trabalho: "#2F71EB" }
  const estilos = styleFunction(categorias[item.categoria])

  async function deletaNota() {
    await removeNota(item)
    mostraNotas()
  }
  return (
    <TouchableOpacity style={estilos.cartao} onPress={() => setNotaSelecionada(item)}>
      <Text style={estilos.titulo} >{item.titulo}</Text>
      <Text style={estilos.categoria} >{item.categoria}</Text>
      <Text style={estilos.texto} numberOfLines={5}>{item.texto}</Text>
      <View style={estilos.viewDeletar}  >
        <TouchableOpacity style={estilos.deletar} onPress={() => { deletaNota() }}>
          <Text style={estilos.textoDeletar} >deletar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styleFunction = (cor) => StyleSheet.create({
  cartao: {
    borderRadius: 8,
    backgroundColor: "#d6d6d6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderTopWidth: 5,
    borderColor: cor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewDeletar: {
    borderRadius: 4,
    padding: 5,
    width: 80,
    alignItems: "center",
    position: 'absolute',
    alignSelf: "flex-end",

    marginRight: 50,
    marginTop: 40,

  },
  deletar: {
    borderRadius: 4,
    backgroundColor: "#d62a18",
    padding: 2,
    width: 80,
    alignItems: "center",
    alignSelf: "flex-end",


  },
  textoDeletar: {
    padding: 4,
    color: "#FAFAFA",
    textAlign: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    color: '#454545'
  },
  categoria: {
    borderRadius: 4,
    backgroundColor: cor,
    padding: 4,
    color: "#FAFAFA",
    alignSelf: "flex-start",
  },
  texto: {
    lineHeight: 28,
    color: '#848484'
  }
})

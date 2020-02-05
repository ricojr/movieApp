import React, { useState } from 'react';
import Axios from "axios";

import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';

export default function App() {

  const apiUrl = "http://www.omdbapi.com/?apikey=8a80a5c9";
  const [state, setState] = useState({
    search: "Enter a movie...",
    results: [],
    selected: {}
  })

  const search = () => {
    Axios(apiUrl + "&s=" + state.search).then(({data}) => {
      let results = data.Search;
      setState(prevState => {
        return {...prevState, results: results}
      })
    })
  }

  const openPopup = id => {
    Axios(apiUrl + "&i=" + id).then(({ data }) => {
      let result = data;
      

      setState(prevState => {
        return {...prevState, selected: result}
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rico DB</Text>
      <TextInput 
        style={styles.searchbox}
        onChangeText={text => setState(prevState => {
          return {...prevState, search: text}
        })}
        onSubmitEditing={search}
        value={state.search}
      />

      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight 
          key={result.imdbID} 
          onPress={() => openPopup(result.imdbID)}>
          <View style={styles.result}>
            <Image
            source={{ uri: result.Poster}}
            style={{
              width: '100%',
              height: 300,
              
            }}
            resizeMode="cover"
            />
            <Text style={styles.heading}>{result.Title}</Text>
          </View>
          </TouchableHighlight>
        ))}

      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={(typeof state.selected.Title != "undefined")}
      >
        <View style={styles.popup}>
        <Text style={styles.poptitle}>{state.selected.Title}</Text>
        <Text style={{marginBottom: 20}}>Rating: {state.selected.imdbRating}</Text>
        <Text>{state.selected.Plot}</Text>
        </View>
        <TouchableHighlight
          onPress={() => setState(prevState => {
            return { ...prevState, selected: {}}
          })}
        >
          <Text style={styles.closeBtn}>Close</Text>


        </TouchableHighlight>
        

      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b63838',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginBottom: 40
  },
  results: {
    flex: 1,
    borderRadius: 30
  },
  result: {
    flex: 1,
    width: '100%',
    borderRadius: 40,
    marginBottom: 20,
    
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#c39898'
    
  },
  popup: {
    padding: 50,
    paddingTop: 80
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    
    padding: 10,
    width: '30%',
    marginLeft: 50,
    
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
    backgroundColor: '#d23c3c'
  }

});

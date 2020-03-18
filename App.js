import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from "./components/Header"
import TodoItem from "./components/todoItem"
import AddTodo from "./components/AddTodo"

export default function App() {

  const [todos, setTodos] = useState([
    {text: 'buy milk', key: '1'},
    {text: 'create an app', key: '2'},
  ])

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key !== key)
    })
  }

  const submitHandler = (text) => {
    if(text.length > 3) {
      setTodos((prevTodos) => {
        return [
          {text: text, key:Math.random().toString()},
          ...prevTodos
        ]
      });
    } else {
      Alert.alert('OOPS!', 'TODOS MUST BE OVER 3 CHARS LONG',[
        {text: 'Understood', onPres: () => console.log('alert closed')}
      ]);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dissmissed keyboard')  
    }}>
      <View style={styles.container}>
        {/* Header */}
        <Header />
        <AddTodo  submitHandler={submitHandler}/>
        <View style={styles.content}>
          {/* To Do form */}
          <View style={styles.list}>
            <FlatList 
            data={todos}
            renderItem={({item}) => (
              <TodoItem 
              item={item}
              pressHandler={pressHandler} />
            )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20
  },
});

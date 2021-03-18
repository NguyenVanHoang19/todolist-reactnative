import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  // useEffect(() => {
  //   getValueFor('taskList')
  // }, [])

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

  const getValueFor = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    Alert.alert("Dữ liệu đã lưu", result)
  }

  const handleAddTask = () => {
    save('taskList', task )
    getValueFor('taskList');
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const TaskList = (props) => {
    return (
      <TouchableOpacity onPress={() => props.eventButton()}>
        <Task text={props.task} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSccreen}>
          <Text style={styles.sectionTitle}>Tên bệnh</Text>
          <Text style={styles.thoigian}>Sửa đổi 22/03/2012</Text>
        </View>
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <FlatList
              data={taskItems}
              renderItem={({item, index}) =>(
                <TaskList task= {item} eventButton={() => completeTask(index)}/>
              )}
              keyExtractor={(item,index) => index.toString()}
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(value) => setTask(value)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  topSccreen: {
    width: Dimensions.get("window").width,
    height: 70,
    backgroundColor: "#E49A9A",
  },
  thoigian: {
    fontSize: 12,
    fontWeight: "100",
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});

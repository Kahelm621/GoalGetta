// screens/TaskDetailScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskDetailScreen = ({ navigation }) => {
  const [task, setTask] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const taskId = navigation.getParam("taskId");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/tasks/${taskId}`, {
          headers: { "x-auth-token": token },
        });
        setTask(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTask();
  }, [taskId]);

  const updateTask = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title,
          description,
        },
        {
          headers: { "x-auth-token": token },
        }
      );
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        headers: { "x-auth-token": token },
      });
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update Task" onPress={updateTask} />
      <Button title="Delete Task" onPress={deleteTask} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default TaskDetailScreen;

// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/tasks", {
          headers: {
            "x-auth-token": token,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Button
              title="View"
              onPress={() =>
                navigation.navigate("TaskDetail", { taskId: item._id })
              }
            />
          </View>
        )}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("TaskDetail")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  taskContainer: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
  },
});

export default HomeScreen;

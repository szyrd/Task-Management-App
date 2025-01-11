import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TamaguiProvider } from "@tamagui/core";
import config from "./tamagui.config";
import App from "./App";
import AddTask from "./AddTask";

const Stack = createStackNavigator();

// Create a TaskContext to share tasks globally
export const TaskContext = createContext<any>(null);

const MainApp = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Daily meeting with team", completed: false },
    { id: "2", title: "Pay for rent", completed: true },
    { id: "3", title: "Check emails", completed: false },
    { id: "4", title: "Lunch with Emma", completed: false },
  ]);

  const addTask = (task: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), title: task, completed: false },
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={App} />
          <Stack.Screen name="AddTask" component={AddTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskContext.Provider>
  );
};

export default MainApp;



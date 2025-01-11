import React, { useState } from "react";
import { TamaguiProvider, Button, Input, Text, YStack, XStack } from "tamagui";
import Icon from "react-native-vector-icons/MaterialIcons";
import config from "./tamagui.config";
import uuid from "react-native-uuid"; // Import UUID generator

const AddTask = ({ navigation, route }: any) => {
  const { setToDos } = route.params; // Get setToDos from route params
  const [newTask, setNewTask] = useState("");

  return (
    <TamaguiProvider config={config}>
      <YStack flex={1} padding={20} backgroundColor="white">
        {/* Header */}
        <XStack justifyContent="flex-end" paddingTop={40} marginBottom={32}>
          <Button
            circular
            size="$4"
            onPress={() => navigation.goBack()}
            backgroundColor="transparent"
          >
            <Icon name="close" size={24} color="#000" />
          </Button>
        </XStack>

        {/* Task Input */}
        <Input
          placeholder="Enter new task"
          value={newTask}
          onChangeText={setNewTask}
          size="$8"
          borderWidth={0}
          backgroundColor="transparent"
          fontSize={24}
          placeholderTextColor="#999"
        />

        {/* Date Selector */}
        <XStack space={12} marginTop={32}>
          <Button
            size="$4"
            backgroundColor="transparent"
            borderWidth={1}
            borderColor="#eee"
            borderRadius={20}
          >
            <Icon name="calendar-today" size={16} color="#666" />
            <Text marginLeft={8} color="#666">
              Today
            </Text>
          </Button>
          <Button
            circular
            size="$4"
            backgroundColor="transparent"
            borderWidth={1}
            borderColor="#eee"
          >
            <Icon name="circle" size={16} color="#56a7e0" />
          </Button>
        </XStack>

        {/* Bottom Section */}
        <YStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          padding={20}
        >
          {/* Action Icons */}
          <XStack space={24} marginBottom={32}>
            <Button circular backgroundColor="transparent">
              <Icon name="add" size={24} color="#666" />
            </Button>
            <Button circular backgroundColor="transparent">
              <Icon name="flag" size={24} color="#666" />
            </Button>
            <Button circular backgroundColor="transparent">
              <Icon name="nightlight-round" size={24} color="#666" />
            </Button>
          </XStack>

          {/* Add Button */}
          <Button
            size="$6"
            backgroundColor="#4169e1"
            borderRadius={30}
            onPress={() => {
              if (newTask.trim()) {
                setToDos((prevToDos: any) => [
                  ...prevToDos,
                  {
                    id: uuid.v4(), // Generate unique ID
                    title: newTask,
                    completed: false,
                    category: "business", // Default category
                  },
                ]);
                navigation.goBack(); // Go back to main screen
              }
            }}
          >
            <Text color="white" fontSize={18}>
              New task
            </Text>
            <Icon name="keyboard-arrow-up" size={24} color="white" />
          </Button>
        </YStack>
      </YStack>
    </TamaguiProvider>
  );
};

export default AddTask;



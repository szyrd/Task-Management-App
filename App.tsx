import React, { useState } from "react";
import { FlatList, StatusBar, Modal } from "react-native";
import {
  TamaguiProvider,
  Button,
  Text,
  YStack,
  XStack,
  ScrollView,
  Input,
} from "tamagui";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import config from "./tamagui.config";
import uuid from "react-native-uuid";

interface ToDo {
  id: string;
  title: string;
  completed: boolean;
  category: "business" | "personal";
}

const App = () => {
  const [toDos, setToDos] = useState<ToDo[]>([
    { id: "1", title: "Daily meeting with team", completed: false, category: "business" },
    { id: "2", title: "Pay for rent", completed: true, category: "personal" },
    { id: "3", title: "Check emails", completed: false, category: "business" },
    { id: "4", title: "Lunch with Emma", completed: false, category: "business" },
    { id: "5", title: "Meditation", completed: false, category: "personal" },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");

  const toggleToDo = (id: string) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteToDo = (id: string) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  const renderToDo = ({ item }: { item: ToDo }) => (
    <Swipeable
      renderRightActions={() => (
        <Button
          onPress={() => deleteToDo(item.id)}
          size="$4"
          backgroundColor="#ff3b30"
          padding={16}
          borderRadius={16}
          marginBottom={8}
          height="100%"
          width={90}
          alignItems="center"
          justifyContent="center"
        >
          <Icon name="delete-outline" size={24} color="white" />
        </Button>
      )}
    >
      <XStack
        alignItems="center"
        padding={16}
        borderRadius={16}
        marginBottom={8}
        backgroundColor="#1e2235"
        opacity={item.completed ? 0.6 : 1}
      >
        <YStack
          width={24}
          height={24}
          borderRadius={12} // Makes the shape circular
          borderWidth={2} // Adds a border for the empty circle
          borderColor={item.completed ? "green" : item.category === "business" ? "#e056e0" : "#56a7e0"}
          alignItems="center"
          justifyContent="center"
          onPress={() => toggleToDo(item.id)}
        >
          {item.completed && (
            <Icon name="check" size={16} color="green" /> // Show checkmark if completed
          )}
        </YStack>

        <Text
          flex={1}
          marginLeft={12}
          color="white"
          opacity={item.completed ? 0.5 : 1}
          textDecorationLine={item.completed ? "line-through" : "none"}
        >
          {item.title}
        </Text>
      </XStack>
    </Swipeable>
  );

  const CategoryCard = ({ title, tasks, color }: { title: string, tasks: number, color: string }) => (
    <YStack
      backgroundColor="#1e2235"
      borderRadius={24}
      padding={16}
      width={160}
      marginRight={16}
    >
      <Text color="#666" fontSize={14}>{tasks} tasks</Text>
      <Text color="white" fontSize={24} fontWeight="bold" marginVertical={8}>
        {title}
      </Text>
      <XStack height={4} backgroundColor="#2a2f45" borderRadius={2} overflow="hidden">
        <XStack
          backgroundColor={color}
          width={`${(tasks / 100) * 100}%`}
          borderRadius={2}
        />
      </XStack>
    </YStack>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <StatusBar barStyle="light-content" />
        <YStack
          flex={1}
          padding={20}
          space
          backgroundColor="#1a1f37"
        >
          {/* Header */}
          <XStack
            alignItems="center"
            justifyContent="space-between"
            paddingTop={40}
            marginBottom={32}
          >
            <Button size="$3" circular backgroundColor="transparent">
              <Icon name="menu" size={24} color="white" />
            </Button>
            <XStack space={16}>
              <Button size="$3" circular backgroundColor="transparent">
                <Icon name="search" size={24} color="white" />
              </Button>
              <Button size="$3" circular backgroundColor="transparent">
                <Icon name="notifications" size={24} color="white" />
              </Button>
            </XStack>
          </XStack>

          <Text color="white" fontSize={32} fontWeight="bold" marginBottom={32}>
            What's up, Olivia!
          </Text>

          {/* Categories */}
          <Text color="#666" fontSize={14} marginBottom={16}>
            CATEGORIES
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} marginBottom={32}>
            <CategoryCard title="Business" tasks={40} color="#e056e0" />
            <CategoryCard title="Personal" tasks={18} color="#56a7e0" />
          </ScrollView>

          {/* To-Do List */}
          <Text color="#666" fontSize={14} marginBottom={16}>
            TODAY'S TASKS
          </Text>
          <FlatList
            data={toDos}
            keyExtractor={(item) => item.id}
            renderItem={renderToDo}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          {/* Floating Add Button */}
          <Button
            onPress={() => {setModalVisible(true); setNewTask("");}}
            size="$6"
            position="absolute"
            bottom={100}
            right={20}
            circular
            backgroundColor="#e056e0"
          >
            <Icon name="add" size={50} color="white" />
          </Button>
        </YStack>

        {/* Modal for Adding Task */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <YStack flex={1} padding={20} backgroundColor="white">
            {/* Header */}
            <XStack justifyContent="flex-end" paddingTop={40} marginBottom={32}>
              <Button
                width={50} // Ensure the button is a perfect square
                height={50} // Same value as width
                borderRadius={30} // Half of the width/height for a perfect circle
                borderColor="#eee" // Border color
                borderWidth={2} // Border width
                justifyContent="center" // Center content vertically
                alignItems="center" // Center content horizontally
                backgroundColor="transparent" // Transparent background
                onPress={() => setModalVisible(false)} // Close modal on press
              >
                <Icon
                  name="close"
                  size={24}
                  color="#000"
                  style={{ alignSelf: 'center' }} // Ensure the icon itself aligns at the center
                />
              </Button>

            </XStack>

            {/* Task Input */}
            <Input
              marginLeft={50}
              marginTop={100}
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
            <XStack space={12} marginTop={50} marginLeft={50}>
              {/* Today Button */}
              <Button
                size="$4"
                paddingHorizontal={16} // Add padding for proper spacing inside the button
                paddingVertical={10} // Vertical padding for better height
                backgroundColor="transparent"
                borderWidth={2}
                borderColor="#eee"
                borderRadius={20}
                flexDirection="row" // Ensure content is in a row
                alignItems="center" // Center the icon and text
              >
                <Icon name="calendar-today" size={16} color="#666" />
                <Text marginLeft={8} color="#666">
                  Today
                </Text>
              </Button>

              {/* Circle Icon */}
              <Button
                circular
                size="$5" // Slightly larger size
                backgroundColor="transparent"
                borderWidth={2}
                width={50}
                height={50}
                borderColor="#eee"
                alignItems="center"
                justifyContent="center" // Center the icon
              >
                <YStack
                  width={25} // Outer circle diameter
                  height={25}
                  borderRadius={20} // Makes it a circle
                  borderWidth={3} // Outer border width
                  borderColor="#56a7e0" // Outer border color
                  alignItems="center"
                  justifyContent="center"
                >
                  <YStack
                    width={14} // Inner circle diameter
                    height={14}
                    borderRadius={8} // Makes it a circle
                    backgroundColor="#56a7e0" // Inner circle color
                  />
                </YStack>
              </Button>
            </XStack>


            {/* Bottom Section */}
            <YStack
              position="absolute"
              bottom={100}
              left={0}
              right={0}
              padding={20}
            >
              {/* Action Icons */}
              <XStack marginBottom={200} alignItems="center" justifyContent="center">
                <Button circular backgroundColor="transparent" marginHorizontal={20}>
                  <Icon name="add" size={24} color="#666" />
                </Button>
                <Button circular backgroundColor="transparent" marginHorizontal={20}>
                  <Icon name="flag" size={24} color="#666" />
                </Button>
                <Button circular backgroundColor="transparent" marginHorizontal={20}>
                  <Icon name="nightlight-round" size={24} color="#666" />
                </Button>
              </XStack>


              {/* Add Button */}
              <Button
                width={180} // Fixed width
                height={60} // Fixed height
                backgroundColor="#4169e1"
                borderRadius={30}
                position="absolute" // Allows absolute positioning
                bottom={30} // Distance from the bottom of the screen
                right={20} // Distance from the right edge
                justifyContent="center"
                flexDirection="row" // Aligns text and icon in a row
                alignItems="center"
                onPress={() => {
                  if (newTask.trim()) {
                    setToDos((prevToDos: any) => [
                      ...prevToDos,
                      {
                        id: uuid.v4(),
                        title: newTask,
                        completed: false,
                        category: "business",
                      },
                    ]);
                    setModalVisible(false);
                  }
                }}
              >
                <Text color="white" fontSize={14} marginRight={8} fontWeight={"bold"}>
                  New task
                </Text>
                <Icon name="keyboard-arrow-up" size={24} color="white" />
              </Button>

            </YStack>
          </YStack>
        </Modal>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
};

export default App;














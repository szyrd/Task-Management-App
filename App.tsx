import React, { useState } from "react";
import { FlatList, StatusBar } from "react-native";
import {
  TamaguiProvider,
  Button,
  Text,
  YStack,
  XStack,
  ScrollView,
} from "tamagui";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import config from "./tamagui.config";

interface ToDo {
  id: string;
  title: string;
  completed: boolean;
  category: "business" | "personal";
}

const App = ({ navigation }: any) => {
  const [toDos, setToDos] = useState<ToDo[]>([
    { id: "1", title: "Daily meeting with team", completed: false, category: "business" },
    { id: "2", title: "Pay for rent", completed: true, category: "personal" },
    { id: "3", title: "Check emails", completed: false, category: "business" },
    { id: "4", title: "Lunch with Emma", completed: false, category: "business" },
    { id: "5", title: "Meditation", completed: false, category: "personal" },
  ]);

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
            onPress={() => navigation.navigate("AddTask", { setToDos })}
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
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
};

export default App;














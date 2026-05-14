import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// === CHANGED === added FlatList import
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      done: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What needs doing?"
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* === CHANGED === replaced placeholder with FlatList */}
      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No todos yet</Text>
          </View>
        }
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
  inputRow: { flexDirection: 'row', marginBottom: 24 },
  input: { flex: 1, backgroundColor: '#2a2a2a', color: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, marginRight: 8, fontSize: 16 },
  addButton: { backgroundColor: '#4a9eff', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  // === NEW === list + item + empty styles
  list: { flex: 1 },
  todoItem: { backgroundColor: '#2a2a2a', padding: 16, borderRadius: 8, marginBottom: 8 },
  todoText: { color: '#fff', fontSize: 16 },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyText: { color: '#666', fontSize: 16 },
});
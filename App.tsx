import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
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
    const newTodo: Todo = { id: Date.now().toString(), text, done: false };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  // === NEW === toggle done state
  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // === NEW === delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
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

      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id}
        // === CHANGED === each item is now interactive
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoTextWrap}
              onPress={() => toggleTodo(item.id)}
            >
              <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
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
  list: { flex: 1 },
  // === CHANGED === item is now a row with text + delete button
  todoItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2a2a2a', borderRadius: 8, marginBottom: 8 },
  todoTextWrap: { flex: 1, padding: 16 },
  todoText: { color: '#fff', fontSize: 16 },
  // === NEW === strikethrough + faded color when done
  todoTextDone: { color: '#666', textDecorationLine: 'line-through' },
  // === NEW === delete button styles
  deleteButton: { paddingHorizontal: 16, paddingVertical: 16 },
  deleteButtonText: { color: '#ff6b6b', fontSize: 18, fontWeight: 'bold' },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyText: { color: '#666', fontSize: 16 },
});
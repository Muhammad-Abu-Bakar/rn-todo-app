// === CHANGED === added useState import
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

// === NEW === type for one todo
type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function App() {
  // === NEW === state for todos list and input field
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // === NEW === handler to add a todo
  const addTodo = () => {
    const text = input.trim();
    if (!text) return; // ignore empty input
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      done: false,
    };
    setTodos([newTodo, ...todos]); // new ones at top
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
          // === CHANGED === controlled input + submit on Enter
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        {/* === CHANGED === button now triggers addTodo */}
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listArea}>
        {/* === CHANGED === show count instead of static text */}
        <Text style={styles.emptyText}>
          {todos.length === 0 ? 'No todos yet' : `${todos.length} todo(s) added`}
        </Text>
      </View>

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
  listArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#666', fontSize: 16 },
});
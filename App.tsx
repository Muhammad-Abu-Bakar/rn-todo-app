// === NEW === full rewrite for Day 7
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What needs doing?"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listArea}>
        <Text style={styles.emptyText}>No todos yet</Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4a9eff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});
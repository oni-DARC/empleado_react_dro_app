// src/screens/EmployeeListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { firestore } from '../../firebase';
import Employee from '../models/Employee';

export default function EmployeeListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Escucha en tiempo real los cambios en la colección "employees"
  useEffect(() => {
    const unsubscribe = firestore.collection('employees').onSnapshot(snapshot => {
      const list = snapshot.docs.map(doc => Employee.fromFirestore(doc));
      setEmployees(list);
      setLoading(false);
    }, error => {
      console.log(error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Cálculo del resumen por niveles
  const resumen = () => {
    const senior = employees.filter(e => e.level.toLowerCase() === 'senior').length;
    const junior = employees.filter(e => e.level.toLowerCase() === 'junior').length;
    const gerente = employees.filter(e => e.level.toLowerCase() === 'gerente').length;
    return { senior, junior, gerente };
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  const { senior, junior, gerente } = resumen();

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EmployeeDetail', { employee: item })}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>Resumen:</Text>
            <Text style={styles.footerText}>Senior: {senior}</Text>
            <Text style={styles.footerText}>Junior: {junior}</Text>
            <Text style={styles.footerText}>Gerentes: {gerente}</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEditEmployee')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex:1, justifyContent: 'center', alignItems: 'center' },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemSubtitle: { fontSize: 16, color: '#555' },
  footer: { padding: 16, backgroundColor: '#f9f9f9' },
  footerText: { fontSize: 16 },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1E90FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: { color: '#fff', fontSize: 32, marginBottom: 4 },
});

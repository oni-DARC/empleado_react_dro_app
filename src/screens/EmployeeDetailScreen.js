// src/screens/EmployeeDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firestore } from '../../firebase';

export default function EmployeeDetailScreen({ route, navigation }) {
  const { employee } = route.params;

  const eliminarEmpleado = () => {
    Alert.alert(
      'Eliminar Empleado',
      '¿Estás seguro de eliminar este empleado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: async () => {
            try {
              await firestore.collection('employees').doc(employee.id).delete();
              navigation.goBack();
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{employee.name}</Text>

      <Text style={styles.label}>Identificación:</Text>
      <Text style={styles.value}>{employee.identification}</Text>

      <Text style={styles.label}>Correo electrónico:</Text>
      <Text style={styles.value}>{employee.email}</Text>

      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.value}>{employee.address}</Text>

      <Text style={styles.label}>Departamento:</Text>
      <Text style={styles.value}>{employee.department}</Text>

      <Text style={styles.label}>Nivel laboral:</Text>
      <Text style={styles.value}>{employee.level}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditEmployee', { employee })}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={eliminarEmpleado}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  value: { fontSize: 16, marginBottom: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
  editButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

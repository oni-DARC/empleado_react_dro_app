// src/screens/AddEditEmployeeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { firestore } from '../../firebase';

export default function AddEditEmployeeScreen({ route, navigation }) {
  const employeeToEdit = route.params ? route.params.employee : null;

  const [name, setName] = useState('');
  const [identification, setIdentification] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('junior'); // Valor por defecto

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setIdentification(employeeToEdit.identification);
      setEmail(employeeToEdit.email);
      setAddress(employeeToEdit.address);
      setDepartment(employeeToEdit.department);
      setLevel(employeeToEdit.level);
    }
  }, [employeeToEdit]);

  const guardarEmpleado = async () => {
    if (!name || !identification || !email || !address || !department || !level) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const data = {
      name,
      identification,
      email,
      address,
      department,
      level,
    };

    try {
      if (employeeToEdit) {
        // Actualizar empleado
        await firestore.collection('employees').doc(employeeToEdit.id).update(data);
      } else {
        // Agregar nuevo empleado
        await firestore.collection('employees').add(data);
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Ocurrió un error al guardar los datos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre del empleado:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Número de identificación:</Text>
      <TextInput style={styles.input} value={identification} onChangeText={setIdentification} />

      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />

      <Text style={styles.label}>Departamento:</Text>
      <TextInput style={styles.input} value={department} onChangeText={setDepartment} />

      <Text style={styles.label}>Nivel laboral (senior, junior, gerente):</Text>
      <TextInput style={styles.input} value={level} onChangeText={setLevel} />

      <TouchableOpacity style={styles.button} onPress={guardarEmpleado}>
        <Text style={styles.buttonText}>{employeeToEdit ? 'Actualizar' : 'Agregar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: { color: '#fff', fontSize: 18 },
});

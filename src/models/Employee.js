// src/models/Employee.js

export default class Employee {
  constructor(id, name, identification, email, address, department, level) {
    this.id = id; // id asignado por Firestore
    this.name = name;
    this.identification = identification;
    this.email = email;
    this.address = address;
    this.department = department;
    this.level = level; // "senior", "junior", "gerente"
  }

  // Método para convertir el objeto a un formato que Firestore entienda (mapa)
  toFirestore() {
    return {
      name: this.name,
      identification: this.identification,
      email: this.email,
      address: this.address,
      department: this.department,
      level: this.level,
    };
  }

  // Crear un empleado a partir de un documento de Firestore
  static fromFirestore(doc) {
    const data = doc.data();
    return new Employee(doc.id, data.name, data.identification, data.email, data.address, data.department, data.level);
  }
}

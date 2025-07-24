import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Health = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    bmi: '',
    bloodpressure: '',
    bloodglucose: '',
    heartrate: '',
    hairDensity: '',
    hairLossRate: '',
    scalpCondition: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: '1',
      age: '30',
      gender: 'Male',
      height: '175',
      weight: '70',
      bmi: '22.9',
      bloodpressure: '120/80',
      bloodglucose: '95',
      heartrate: '72',
      hairDensity: '60',
      hairLossRate: '50',
      scalpCondition: 'Good',
    },
  ]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newEntry = {
      id: (tableData.length + 1).toString(),
      ...formData,
    };
    setTableData(prev => [...prev, newEntry]);
    setModalVisible(false);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      age: '',
      gender: '',
      height: '',
      weight: '',
      bmi: '',
      bloodpressure: '',
      bloodglucose: '',
      heartrate: '',
      hairDensity: '',
      hairLossRate: '',
      scalpCondition: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Patient Health Data</Text>
      
      <Button title="Open Health Form" onPress={() => setModalVisible(true)} />

      <FlatList
        data={tableData}
        keyExtractor={item => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableText}>#{item.id} - {item.age} yrs - {item.gender}</Text>
            <Text style={styles.tableText}>Height: {item.height} cm | Weight: {item.weight} kg</Text>
            <Text style={styles.tableText}>BMI: {item.bmi} | BP: {item.bloodpressure}</Text>
            <Text style={styles.tableText}>Glucose: {item.bloodglucose} mg/dL | HR: {item.heartrate}</Text>
            <Text style={styles.tableText}>Hair Density: {item.hairDensity}</Text>
            <Text style={styles.tableText}>Hair Loss: {item.hairLossRate} | Scalp: {item.scalpCondition}</Text>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Health Details Form</Text>

          {Object.entries(formData).map(([key, value]) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              value={value}
              onChangeText={(text) => handleChange(key, text)}
              keyboardType={['age', 'height', 'weight', 'bmi', 'bloodglucose', 'heartrate', 'hairDensity', 'hairLossRate'].includes(key) ? 'numeric' : 'default'}
            />
          ))}

          <View style={styles.buttonRow}>
            <Button title="Reset" color="#6c757d" onPress={handleReset} />
            <Button title="Submit" color="#28a745" onPress={handleSubmit} />
          </View>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Health;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  tableRow: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginBottom: 10,
    elevation: 1,
  },
  tableText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 12,
  },
  closeButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

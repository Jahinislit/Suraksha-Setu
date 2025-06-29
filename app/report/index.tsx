import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ReportDisasterIndex() {
  const router = useRouter();
  const [disasterType, setDisasterType] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleNext = () => {
    if (!disasterType || !name || !contact) {
      alert('Please fill all fields');
      return;
    }

    router.push({
      pathname: '/report/form',
      params: { disasterType, name, contact },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerText}>Report Disaster</Text>
      </View>


      {/* Form */}
      <View style={styles.form}>

      <Text style={styles.label}>Your Name</Text>
        <TextInput
          placeholder="Enter full name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

      <Text style={styles.label}>Contact Number</Text>
        <TextInput
          placeholder="Enter phone number"
          style={styles.input}
          keyboardType="phone-pad"
          value={contact}
          onChangeText={setContact}
        />


        <Text style={styles.label}>Select Disaster Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={disasterType}
            onValueChange={(itemValue) => setDisasterType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#007AFF"
          >
            <Picker.Item label="Select type..." value="" />
            <Picker.Item label="Earthquake" value="Earthquake" />
            <Picker.Item label="Flood" value="Flood" />
            <Picker.Item label="Fire" value="Fire" />
            <Picker.Item label="Landslide" value="Landslide" />
            <Picker.Item label="Cyclone" value="Cyclone" />
            <Picker.Item label="Accident" value="Accident" />
            <Picker.Item label="Medical Emergency" value="Medical Emergency" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1' },
  header: {
    backgroundColor: '#0077b7',
    paddingTop:55,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: { marginRight: 12 },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
    gap: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,

  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    elevation: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
    height: 60,
    
  },
  picker: {
    height: 60,
    width: '100%',
    lineHeight: 50,
    
    
  },
  button: {
    backgroundColor: '#0077b7',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

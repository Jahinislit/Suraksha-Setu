import { View, Text, Image, Modal, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function Status() {
  const { disasterType, severity, desc, lat, lon, image } = useLocalSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      router.replace('/'); // Go to home after closing
    }, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-circle" size={64} color="#4BB543" />
          </View>
          <Text style={styles.title}>Report Submitted!</Text>
          <Text style={styles.subtitle}>Thank you for your contribution.</Text>
          <View style={styles.details}>
            <Text style={styles.detailText}>Type: <Text style={styles.bold}>{disasterType}</Text></Text>
            <Text style={styles.detailText}>Severity: <Text style={styles.bold}>{severity}</Text></Text>
            <Text style={styles.detailText}>Location: <Text style={styles.bold}>{lat}, {lon}</Text></Text>
            {desc ? (
              <Text style={styles.detailText}>Description: <Text style={styles.bold}>{desc}</Text></Text>
            ) : null}
            {image ? (
              <Image source={{ uri: image as string }} style={styles.image} />
            ) : null}
          </View>
          <Pressable style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  iconCircle: {
    backgroundColor: '#eafbe6',
    borderRadius: 50,
    padding: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
  },
  details: {
    width: '100%',
    marginBottom: 18,
  },
  detailText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 2,
  },
  bold: {
    fontWeight: '600',
    color: '#0077b7',
  },
  image: {
    width: 120,
    height: 90,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#0077b7',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 38,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

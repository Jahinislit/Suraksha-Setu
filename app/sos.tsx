import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SOSPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'requesting' | 'done' | 'error'>('requesting');
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Ask for location permission immediately
        const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
        if (locStatus !== 'granted') {
          Alert.alert('Location Required', 'Please enable location to send SOS');
          setStatus('error');
          return;
        }
        // Get location
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude });
        // Save SOS report to AsyncStorage
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const created_at = new Date().toISOString();
        const report = {
          id,
          disaster_type: 'SOS Emergency',
          severity: 'Critical',
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          description: 'N/A',
          photos: ['N/A'],
          status: 'pending',
          created_at,
        };
        const existing = await AsyncStorage.getItem('my_reports');
        let reports = [];
        if (existing) {
          try {
            reports = JSON.parse(existing);
          } catch (e) {
            reports = [];
          }
        }
        reports.unshift(report);
        await AsyncStorage.setItem('my_reports', JSON.stringify(reports));
        setStatus('done');
        setVisible(true);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Could not get location');
        setStatus('error');
      }
    })();
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      router.replace('/');
    }, 300);
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {status === 'requesting' && <Text>Requesting location access...</Text>}
      {status === 'error' && <Text style={{ color: 'red' }}>❌ SOS Failed</Text>}
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
            <Text style={styles.title}>SOS Submitted!</Text>
            <Text style={styles.subtitle}>Your emergency SOS has been sent.</Text>
            <View style={styles.details}>
              <Text style={styles.detailText}>Type: <Text style={styles.bold}>SOS Emergency</Text></Text>
              <Text style={styles.detailText}>Severity: <Text style={styles.bold}>Critical</Text></Text>
              <Text style={styles.detailText}>Description: <Text style={styles.bold}>N/A</Text></Text>
              <Text style={styles.detailText}>Photo: <Text style={styles.bold}>N/A</Text></Text>
              {location && (
                <Text style={styles.detailText}>Location: <Text style={styles.bold}>{location.lat.toFixed(4)}, {location.lon.toFixed(4)}</Text></Text>
              )}
            </View>
            <Pressable style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
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

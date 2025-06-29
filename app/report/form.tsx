import { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, Image, Alert, ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


const severities = ['Low', 'Medium', 'High', 'Critical'];

export default function ReportForm() {
  const router = useRouter();
  const { disasterType } = useLocalSearchParams<{ disasterType: string }>();

  const [severity, setSeverity] = useState('Low');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showSeverityPicker, setShowSeverityPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      }
    })();
  }, []);

  const pickImage = async () => {
    if (images.length >= 5) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri].slice(0, 5));
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      if (!location) {
        Alert.alert('Error', 'Location not available');
        setUploading(false);
        return;
      }

      // Generate a unique id and created_at timestamp
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const created_at = new Date().toISOString();

      let photoUrls = images.length > 0 ? images : [];

      // Build the report object
      const report = {
        id,
        disaster_type: disasterType,
        severity,
        latitude: location.latitude,
        longitude: location.longitude,
        description: desc,
        photos: photoUrls,
        status: 'pending',
        created_at,
      };

      // Get existing reports from AsyncStorage
      const existing = await AsyncStorage.getItem('my_reports');
      let reports = [];
      if (existing) {
        try {
          reports = JSON.parse(existing);
        } catch (e) {
          reports = [];
        }
      }
      // Add new report to the beginning
      reports.unshift(report);
      await AsyncStorage.setItem('my_reports', JSON.stringify(reports));

      setUploading(false);
      router.push({
        pathname: '/report/status',
        params: {
          disasterType,
          severity,
          desc,
          lat: location.latitude.toString(),
          lon: location.longitude.toString(),
          image: photoUrls[0] || '',
        },
      });
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Submission failed');
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerText}>Reporting: {disasterType}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {/* Severity */}
        <Text style={styles.label}>Select Severity</Text>
        <View style={styles.pickerContainer}>
          <Pressable onPress={() => setShowSeverityPicker(true)} style={{ padding: 12 }}>
            <Text>{severity}</Text>
          </Pressable>
          {showSeverityPicker && (
            <View style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 8, elevation: 2 }}>
              {severities.map((level) => (
                <Pressable
                  key={level}
                  onPress={() => {
                    setSeverity(level);
                    setShowSeverityPicker(false);
                  }}
                  style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                >
                  <Text>{level}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Description */}
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          value={desc}
          onChangeText={setDesc}
          placeholder="Describe the situation..."
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        {/* Photo Upload */}
        <Pressable style={[styles.uploadBtn, images.length >= 5 && { opacity: 0.5 }]} onPress={pickImage} disabled={images.length >= 5}>
          <Text style={styles.uploadBtnText}>📷 Add Photo ({images.length}/5)</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          {images.map((img, idx) => (
            <View key={img} style={styles.imageWrapperSmall}>
              <Image source={{ uri: img }} style={styles.previewImageSmall} />
              <Pressable style={styles.removeImageBtnSmall} onPress={() => setImages(images.filter((_, i) => i !== idx))}>
                <Ionicons name="close-circle" size={22} color="#ff3b30" />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Location Info */}
        {location && (
          <Text style={styles.locationText}>
            Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Text>
        )}

        {/* Submit Button */}
        <Pressable style={styles.submitBtn} onPress={handleSubmit} disabled={uploading}>
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>Submit Report</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1' },
  header: {
    backgroundColor: '#0077b7',
    paddingVertical: 25,
    paddingTop: 55,
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
    paddingVertical: 35,
    paddingHorizontal: 23,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'visible',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  uploadBtn: {
    backgroundColor: '#aec6d4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  uploadBtnText: {
    fontWeight: '600',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    marginTop: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 2,
    elevation: 4,
  },
  
  locationText: {
    fontStyle: 'italic',
    color: '#555',
  },
  submitBtn: {
    backgroundColor: '#0077b7',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageWrapperSmall: {
    position: 'relative',
    width: 70,
    height: 70,
    marginRight: 8,
    marginBottom: 8,
  },
  previewImageSmall: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeImageBtnSmall: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 1,
    elevation: 4,
  },
});


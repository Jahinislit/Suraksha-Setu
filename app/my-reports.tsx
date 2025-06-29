import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Report {
  id: string;
  disaster_type: string;
  severity: string;
  description: string;
  status: string;
  latitude: number;
  longitude: number;
  created_at: string;
  photos: string[];
}

export default function MyReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const stored = await AsyncStorage.getItem('my_reports');
        let localReports = [];
        if (stored) {
          try {
            localReports = JSON.parse(stored);
          } catch (e) {
            localReports = [];
          }
        }
        setReports(localReports);
      } catch (e) {
        console.error('Unexpected error:', e);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerText}>My Reports</Text>
      </View>

      {/* Report List */}
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {reports.length === 0 ? (
            <Text style={styles.noReports}>You haven't submitted any reports yet.</Text>
          ) : (
            reports.map((report) => (
              <View key={report.id} style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.title}>{report.disaster_type}</Text>
                  <Text style={[styles.severity, getSeverityColor(report.severity)]}>
                    {report.severity}
                  </Text>
                </View>

                <Text style={styles.status}>Status: {report.status}</Text>

                {report.description ? (
                  <Text style={styles.description}>{report.description}</Text>
                ) : (
                  <Text style={styles.descriptionMuted}>(No description)</Text>
                )}

                <Text style={styles.meta}>
                  📍 {report.latitude.toFixed(3)}, {report.longitude.toFixed(3)}
                </Text>
                <Text style={styles.meta}>🕒 {new Date(report.created_at).toLocaleString()}</Text>

                {report.photos?.length > 0 && (
                  <Image source={{ uri: report.photos[0] }} style={styles.image} />
                )}
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const getSeverityColor = (level: string) => {
  switch (level) {
    case 'Low':
      return { color: 'green' };
    case 'Medium':
      return { color: '#FFA500' };
    case 'High':
      return { color: 'orangered' };
    case 'Critical':
      return { color: 'red' };
    default:
      return { color: '#333' };
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1' },
  header: {
    backgroundColor: '#0077b7',
    paddingVertical: 20,
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  severity: {
    fontSize: 14,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 4,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  descriptionMuted: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  meta: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  noReports: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 40,
  },
});

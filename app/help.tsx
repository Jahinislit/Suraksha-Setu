import { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Collapsible from 'react-native-collapsible';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const faqData = [
  {
    question: '📍 How do I report a disaster?',
    answer:
      'Tap "Report Disaster" on the home screen. Select a disaster type, set severity, share location, and optionally add a description/photo before submitting.',
  },
  {
    question: '🚨 What happens when I tap Emergency SOS?',
    answer:
      'Your current location is immediately sent as a Critical alert. No other info is required. Use this only for serious emergencies.',
  },
  {
    question: '🗂 What can I see in "My Reports"?',
    answer:
      'You’ll see a list of all your submitted reports, including disaster type, status, time, and attached photos.',
  },
  {
    question: '🛡️ Are my reports secure?',
    answer:
      'Yes, your data is stored securely using Supabase with row-level security enabled. Only you can view your reports.',
  },
  {
    question: '🌐 Do I need internet to submit a report?',
    answer:
      'Yes, an internet connection is required to submit your report. Offline submission is not currently supported.',
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerText}>Help & FAQ</Text>
      </View>

      {/* Accordion FAQ */}
      <ScrollView contentContainerStyle={styles.content}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Pressable onPress={() => toggle(index)} style={styles.cardHeader}>
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={activeIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#007AFF"
              />
            </Pressable>
            <Collapsible collapsed={activeIndex !== index}>
              <Text style={styles.answer}>{item.answer}</Text>
            </Collapsible>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

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
  content: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0077b7',
    flex: 1,
    paddingRight: 8,
  },
  answer: {
    paddingTop: 20,
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
});

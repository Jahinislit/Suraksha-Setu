import { View, Text, Pressable, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Blue Header */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}> Suraksha Setu </Text>
        
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push('/report')}>
          <Text style={styles.buttonText}>📍 Report Disaster</Text>
        </Pressable>

        <Pressable style={styles.sosbutton} onPress={() => router.push('/sos')}>
          <Text style={styles.buttonText}>🚨 Emergency SOS</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/help')}>
          <Text style={styles.buttonText}>📘 Help</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/my-reports')}>
          <Text style={styles.buttonText}>🗂 My Reports</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {
    backgroundColor: '#0077b7',
    paddingTop:80,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 25,
    marginTop: 5,
    borderRadius: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 10,
  },
  quoteText:{
    color: '#eb9b34',
    fontSize:16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    
    
  },
  buttonContainer: {
    marginTop: 90,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#0077b7',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  sosbutton: {
    backgroundColor: '#bf1534',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});



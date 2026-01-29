import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Assignment!</Text>
      <Text style={styles.info}>
        This app contains two main modules:
      </Text>
      <Text style={styles.item}>• Video Learning Module</Text>
      <Text style={styles.item}>• Games Module (download & play offline)</Text>
      <Text style={styles.note}>
        Use the tabs below to navigate between Videos and Games.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
});

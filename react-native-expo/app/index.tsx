import React, { useEffect, useState } from 'react';
import { invokeRust, sayAfter, performAsyncTask, startCounter, getCounter } from '@/modules/penumbra-sdk-module';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    startCounter();

    const interval = setInterval(async () => {
      const value = await getCounter();
      setCounter(value);
    }, 1000); // Fetch counter value every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter using tokio: {counter}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

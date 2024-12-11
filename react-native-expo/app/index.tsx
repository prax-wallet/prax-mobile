import React, { useEffect, useState } from 'react';
import { startServer } from '@/modules/penumbra-sdk-module';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0); 

  useEffect(() => {
    const interval = setInterval(async () => {
      const value = await startServer(); 
      setCounter(value);
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>view server block height: {counter}</Text>
    </View>
  );
};

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

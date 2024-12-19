import Icon from '@/components/Icon';
import AppInitializationContext from '@/contexts/AppInitializationContext';
import { getBlockHeight } from '@/modules/penumbra-sdk-module';
import { CheckCircle } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View, Text } from 'dripsy';

export default function AppRoute() {
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const appInitialization = useContext(AppInitializationContext);

  // Handle block height polling
  useEffect(() => {
    if (appInitialization.isLoading) return;

    const interval = setInterval(async () => {
      try {
        const value = await getBlockHeight();
        setCounter(value);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get block height');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [appInitialization.isLoading]);

  if (appInitialization.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text>Initializing...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        <Icon IconComponent={CheckCircle} size='md' /> view server block height: {counter}
      </Text>
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
  errorText: {
    fontSize: 18,
    color: '#ff0000',
    fontWeight: 'bold',
  },
});

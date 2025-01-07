import * as FileSystem from 'expo-file-system';

/// File path to the SQLite database.
export async function getDatabasePath() {
  const databaseFolder = `${FileSystem.documentDirectory}SQLite`;
  await FileSystem.makeDirectoryAsync(databaseFolder, { intermediates: true });
  
  return `${databaseFolder}/mobile.sqlite`;
}

/// Prepare the SQLite database by checking its existence.
export async function prepareDatabase(dbPath: string) {
  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(dbPath);
  }
}

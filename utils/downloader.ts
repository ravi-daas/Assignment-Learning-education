import * as FileSystem from 'expo-file-system/legacy';
import JSZip from 'jszip';

const GAMES_DIR = FileSystem.documentDirectory + 'games/';

export async function downloadAndExtractGame(
  gameId: string,
  zipUrl: string
): Promise<string> {
  const gameDir = `${GAMES_DIR}${gameId}/`;
  const zipPath = `${gameDir}${gameId}.zip`;
  const indexHtml = `${gameDir}index.html`;

  console.log('Preparing to download and extract game:', gameId);
  console.log('Game directory:', gameDir);
  console.log('Zip path:', zipPath);
  console.log('Index HTML path:', indexHtml);

  const indexInfo = await FileSystem.getInfoAsync(indexHtml);
  if (indexInfo.exists) {
    return indexHtml;
  }

  await FileSystem.makeDirectoryAsync(gameDir, { intermediates: true });

  const zipInfo = await FileSystem.getInfoAsync(zipPath);
  if (!zipInfo.exists) {
    await FileSystem.downloadAsync(zipUrl, zipPath);
  }

  const base64 = await FileSystem.readAsStringAsync(zipPath, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const zip = await JSZip.loadAsync(base64, { base64: true });

  for (const [filename, file] of Object.entries(zip.files)) {
    if (file.dir) continue;

    const content = await file.async('base64');

    const outPath = gameDir + filename;
    const outDir = outPath.substring(0, outPath.lastIndexOf('/'));

    await FileSystem.makeDirectoryAsync(outDir, { intermediates: true });
    await FileSystem.writeAsStringAsync(outPath, content, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }

  return indexHtml;
}

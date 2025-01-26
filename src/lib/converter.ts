import { ZipArchive } from "@shortercode/webzip";

/**
 * Compare two Uint8Arrays for equality. https://stackoverflow.com/q/76127214
 *
 * @param arr1 The first array to compare
 * @param arr2 The second array to compare
 * @returns Whether the two arrays are equal
 */
function isEqual(arr1: Uint8Array, arr2: Uint8Array): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value, index) => value === arr2[index]);
}

export async function convert(file: File): Promise<File> {
  const archive = await ZipArchive.from_blob(file);
  const levelDat = archive.get("level.dat");
  if (!levelDat) {
    throw new Error("level.dat not found");
  }
  const buffer = await levelDat.get_array_buffer();
  const array = new Uint8Array(buffer);
  // We could use the Boyer–Moore string search algorithm here, but I don't want
  // to write it since there doesn't appear to be a library.
  const needle = new Uint8Array([
    // `eduoffer` in UTF-8
    0x65, 0x64, 0x75, 0x4f, 0x66, 0x66, 0x65, 0x72,
    // The flag
    0x01, 0x00, 0x00, 0x00,
  ]);
  console.debug("Looking for eduoffer attribute");
  let i = 0;
  while (true) {
    i = array.indexOf(0x65, i);
    if (i === -1) {
      break;
    }
    if (isEqual(array.slice(i, i + needle.length), needle)) {
      break;
    }
    i++;
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  if (i === -1) {
    throw new Error("eduoffer attribute not found");
  }
  console.debug("Found eduoffer attribute at", i);
  const view = new DataView(buffer);
  view.setUint8(i + 12, 0); // Set the flag to 0
  await archive.set("level.dat", new Blob([buffer]));
  const blob = archive.to_blob();
  return new File([blob], file.name.replace("MEE", "BE"), { type: file.type });
}

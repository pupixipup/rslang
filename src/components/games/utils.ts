export class gameUtils {

 static trimArrayLength<T>(array: Array<T>, length: number) {
  const trimmedArray = array;
  while (array.length > length) {
    trimmedArray.pop();
  }
  return trimmedArray;
 }
 static chunkArray<T>(array: Array<T>, chunkSize: number) {
  const chunkedArray: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i+= chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
 }
 static getRandomElement<T>(array: Array<T>) {
  return array[Math.floor(Math.random() * array.length)];
 }
 static areWordsEqual(name1: string, name2: string) {
  return name1 === name2;
}
}
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
}
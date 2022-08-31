export class gameUtils {

 static trimArrayLength<T>(array: Array<T>, length: number) {
  const trimmedArray = array;
  while (array.length > length) {
    trimmedArray.pop();
  }
  return trimmedArray;
 }
}
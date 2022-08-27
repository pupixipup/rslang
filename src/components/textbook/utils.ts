function areObjectsEqual(obj1: object, obj2: object) {
  console.log(obj1, '1');
  
  console.log(obj2, '2');
  
 return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export { areObjectsEqual }
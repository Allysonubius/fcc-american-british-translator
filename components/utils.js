export function reverseObject(obj) {
  let newObj = {};

  for (prop in obj) {
    let value = obj[prop];

    newObj[value] = prop;
  }

  return newObj;
}
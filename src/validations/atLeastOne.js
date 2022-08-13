export function atLeastOne(list, propName) {
    return list.some(item => item[propName] === true);
}

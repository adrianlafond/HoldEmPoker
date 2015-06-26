function pluck(array, key) {
  var arr = array.map(function (obj) {
    return obj[key];
  });
  return arr;
}

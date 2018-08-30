var store = require("../src/singletonStore");

var myStore = store.getStore(function() {});
console.log(myStore.getState());

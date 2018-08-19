var store;

function getStore() {
  if (!store) store = createStore();
  return store;
}

function createStore() {
  var currentState = {},
    subscribers = [],
    finalReducerSet = {},
    reducer = function(state, action) {
      return state;
    };
  function dispatch(action) {
    var oldState = currentState,
      newState = reducer(oldState, action);
    subscribers.forEach(function(subscriber) {
      subscriber(oldState, newState);
    });
  }

  function addReducers(reducers) {
    finalReducerSet = Object.assign(finalReducerSet, reducers);
    reducer = function(state, action) {
      for (var key in reducers) {
        finalReducerSet = reducers[key](state[key], action);
      }
    };
    return finalReducerSet;
  }

  function subscribe(fn) {
    subscribers.push(fn);
  }

  function unsubscribe(fn) {
    subscribers.splice(subscribers.indexOf(fn), 1);
  }

  function getState() {
    var copyOfState;
    return Object.assign(copyOfState, currentState);
  }

  return {
    dispatch,
    addReducers,
    subscribe,
    unsubscribe,
    getState
  };
}
module.exports = getStore();

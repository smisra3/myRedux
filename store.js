var store;

/**
 * Create a single source of truth i.e., single instance of the store should be created.
 */
function getStore() {
  if (!store) store = createStore();
  return store;
}

function createStore(reducer) {
  if (typeof reducer !== "function")
    throw new Error("Expected reducer to be a function");
  var currentState = {},
    subscribers = [],
    finalReducerSet = {},
    defaultAction = "@INIT";

  /**
   * Reads the state tree managed by the store
   * @returns {Object} The current state of the application, but it's replica.
   */
  function getState() {
    return Object.assign({}, currentState);
  }

  /**
   * Adds a method to the listeners array.
   */
  function subscribe(fn) {
    subscribers.push(fn);
  }

  /**
   * Removes a method from the listeners array
   */
  function unsubscribe(fn) {
    subscribers.splice(subscribers.indexOf(fn), 1);
  }

  /**
   * This method is used to dispatch an action to the store.
   * @param {Object} action Is the action dispatched to the store.
   */
  function dispatch(action) {
    if (action.type === "undefined")
      throw new Error("Action cannot have type as undefined");
    var newState = reducer(Object.assign({}, currentState), action);
    subscribers.forEach(function(subscriber) {
      subscriber(currentState, newState);
    });
    return action;
  }

  /**
   * This method is used to combine reducers.
   * @param {function} reducers Is the reducers we want to combine.
   */
  function combineReducers(reducers) {
    finalReducerSet = Object.assign(finalReducerSet, reducers);
    for (var key in reducers) {
      finalReducerSet = reducers[key](state[key], action);
    }
    return finalReducerSet;
  }

  return {
    dispatch,
    addReducers,
    subscribe,
    unsubscribe,
    getState,
    combineReducers
  };
}
module.exports = getStore();

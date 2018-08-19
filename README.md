Steps to create a store:

- Create a singleton instance of the store for the whole application.
- Add a reducer to accept a state through a dispatched action and it returns a new state. Reducer is the only way to modify the state, but it does not mutate the state, rather, it returns a new copy of the state.
- Create an array of subscribers who want to listen to any state change.
- Create a dispatcher which will be exposed throught the module so that action can be dispatched and can be assigned to the respective users.
- Now we handover the copy of the current state to the reducer through the dispatch function which will use the action type to decide what to do with the current dispatched action.
- Now as we have updated the state, we have to notify the interested parties about the changes in the state.
- Create a state tree with reducers, so that each reducer can handle only their part of the complete app state but have the flexibility to read or modify values of the other part of the state also.
- Create an function which adds all the reducers and the recducer name returned by each one of them will be a separate part of the whole state tree. Thus creating the reducer tree and division in the entire application state.
- Now we need to check if other part of the apps are creating same reducers or not. If we have two reducers with same name we should collapse them as they have to perform same activity and running both of them is not performance centric.
- Create an API for adding and removing subscribers.
- Create an API for giving back the state of the store as and when needed.

---

Total functions needed to be exposed are as follows:

- addReducers
- dispatch
- subscribe
- unsubscribe
- getState

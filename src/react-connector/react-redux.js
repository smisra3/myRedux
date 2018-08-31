import React from "react";

import { getStore } from "../singletonStore";

const connect = (mapStateToProps, mapDispatchToProps) => {
  return WrappedComponent => {
    return class MyComponent extends React.Component {
      state = { storeState: getStore.getstate() };

      /**
       * This method checks whether to call render or not based on difference in props
       */
      shouldComponentUpdate() {
        return (
          Object.assign(
            {},
            mapStateToProps(this.state.storeState, this.props)
          ) === this.previousProps
        );
      }

      /**
       * This method subscribes to the store to listen to any updates.
       */
      componentDidMount() {
        this.unsubscribe = getStore.subscribe(() =>
          this.setState({ state: getStore.getstate() })
        );
      }

      /**
       * This method removes the component's subscription to the store.
       */
      componentWillUnmount() {
        this.unsubscribe();
      }
      /**
       * This method handles the render of the wrapped component by passing the slice of the state it requires and the dispatch of the store.
       */
      render() {
        this.previousProps = mapStateToProps(this.state.storeState, this.props);
        const newProps = Object.assign(
          {},
          this.previousProps,
          mapDispatchToProps(getStore.dispatch.bind(this))
        );
        <WrappedComponent {...newProps} />;
      }
    };
  };
};

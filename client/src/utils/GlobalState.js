import React from "react";
import store from './store'
import { Provider } from 'react-redux';

function StoreProvider (props) {
  return <Provider store={store} {...props} />;
};

export default StoreProvider

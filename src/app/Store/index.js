//@flow
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import mainReducer from './mainReducer';
import mainSaga from './mainSaga';

// const sagaMiddleware = createSagaMiddleware();

export type MainReducer = Object;

const configStore = () => {
    const initStore = createStore(
        mainReducer,
        composeWithDevTools(applyMiddleware()),
    );
    // sagaMiddleware.run(mainSaga);
    return initStore;
};

export default configStore();

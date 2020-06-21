import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		reducers, 
		compose(
			applyMiddleware(sagaMiddleware),
		),
	);
	sagaMiddleware.run(rootSaga);
	return store;
}
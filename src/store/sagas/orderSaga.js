import { takeEvery, call, fork, all, put } from 'redux-saga/effects';
import * as ACTION_TYPES from '../ActionTypes';

import { getConfigurations, createMerchantOrder } from '../../apis/orderAPIs';
		
import { getConfigurationsDone, getConfigurationsFailed, createOrder, createOrderDone, createOrderFailed } from '../actions/orderActions';

function* watchGetConfigurationsDone() {
	yield takeEvery(ACTION_TYPES.FETCH_CONFIGURATIONS, function*(action) {
		try {
			const configurations = yield call(getConfigurations);
			if(configurations) {
				yield put(getConfigurationsDone(configurations)); 
			}else {
				yield put(getConfigurationsFailed(configurations)); 
			}
		}
		catch(error) {
			yield put(getConfigurationsFailed(error)); 
		}
	})
}

function* watchCreateOrderDone() {
	yield takeEvery(ACTION_TYPES.CREATE_ORDER, function*(action) {
		try {
			const result = yield call(createMerchantOrder, action.data);
			if(result) {
		        yield put(createOrderDone(result));
		    }
		}
		catch(error) {
			yield put(createOrderFailed(error)); 
		}
	});
}


export default function* rootSaga() {
    yield all([
		fork(watchGetConfigurationsDone),
		fork(watchCreateOrderDone),
    ])
}
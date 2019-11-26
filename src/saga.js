import {all, takeEvery} from 'redux-saga/effects'
import {sagaFetchEntity} from './ducks/entities';

function* myFirstSaga(action) {
    console.log('myFirstSaga');
    console.log(action);
}

function* mainSaga() {
    yield(all([sagaFetchEntity(), takeEvery('*', myFirstSaga)]))
}

export default mainSaga;
import { put, takeEvery, all } from 'redux-saga/effects'
import { initCountries, paginateCountries } from './actions'

function* fetchCountries() {
    try {
        const response = yield fetch('https://test-dec0e.firebaseio.com/countries.json')
        const responseData = yield response.json()
        let dataArray = []
        for (const key in responseData) {
            dataArray = responseData[key]
        }
        yield put(initCountries(dataArray))
        yield put(paginateCountries(1))
    } catch (error) {
        console.log(error)
    }
}

export default function* rootSaga(): Generator {
    yield all([
        fetchCountries()
    ])
}

// function* fetchUser(action) {
//    try {
//       const user = yield call(Api.fetchUser, action.payload.userId);
//       yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//    } catch (e) {
//       yield put({type: "USER_FETCH_FAILED", message: e.message});
//    }
// }

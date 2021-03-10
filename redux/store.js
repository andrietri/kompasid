import { 
    createStore, 
    applyMiddleware,
    compose
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'
import {
    persistStore
} from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'

let store
const middlewareItem = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middlewareItem.push(logger)
}
const middleware = compose(applyMiddleware(...middlewareItem))

const isClient = typeof window !== 'undefined'
if (isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: []
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    store = createStore(
        persistedReducer,
        composeWithDevTools(middleware)
    )
    store.__PERSISTOR = persistStore(store)
}else{
    store = createStore(
        rootReducer,
        composeWithDevTools(middleware)
    )
}

export {
    store
}
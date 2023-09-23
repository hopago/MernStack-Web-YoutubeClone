import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({ user: userReducer, video: videoReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
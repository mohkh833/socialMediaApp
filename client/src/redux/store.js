import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import thunk from "redux-thunk";

const rootPersistConfig = {
        key: "root",
        storage,
};

const userPersistConfig = {
        key: "user",
        storage: storageSession,
};

// const postPersistConfig = {
//         key: "post",
//         storage: storageSession
// }

const rootReducer = combineReducers({
        user: persistReducer(userPersistConfig, userReducer),
        post: postReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
        reducer: persistedReducer,
        middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;

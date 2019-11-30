import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // import in the type of storage we want (dùng localStorage hay sessionStorage)

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// Định nghĩa persist config (json obj mô tả cái config mình muốn)
const persistConfig = {
  key: 'root', // Nghĩa là: at what point inside of our reducer object do we want to start storing everything and we want to start from the root
  storage,
  whitelist: ['cart', 'directory', 'shop'] // whitelist là 1 mảng chứa các tên của reducer mà mình muốn store. Ko cần user vì user được xử lý bởi firebase authentication rồi (Có observer lắng nghe r)
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// Trả về modified version of our rootReducer with this persistConfig on top of it
export default persistReducer(persistConfig, rootReducer);

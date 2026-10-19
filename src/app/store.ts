import { configureStore } from '@reduxjs/toolkit';
import { borrowLimitMiddleware } from './middleware/borrowLimitMiddleware';
import { rootReducer } from './rootReducer';

export function createAppStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddleware),
  });
}

export const store = createAppStore();

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];

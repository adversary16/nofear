import { configureStore } from '@reduxjs/toolkit';
import connectionSlice from '../slices/connectionSlice';

export default configureStore({
    reducer: {
        connection: connectionSlice
    }
})
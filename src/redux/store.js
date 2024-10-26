import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/languageSlice";



export default configureStore({
    reducer: { language },
})
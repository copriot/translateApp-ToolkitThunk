//apiden dil verilerini alıp stora'a dispatch edicek asenkron thunk aksiyonu
import { api } from '../../utils/api'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLanguages = createAsyncThunk("language/getLanguages", async () => {
    const response = await api.get('/getLanguages')

    // console.log(response.data);
    //veri data.languages olarak geliyor
    return response.data.data.languages;
})
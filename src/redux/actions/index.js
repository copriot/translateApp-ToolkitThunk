//apiden dil verilerini alıp stora'a dispatch edicek asenkron thunk aksiyonu
import { api } from '../../utils/api'
import { createAsyncThunk } from "@reduxjs/toolkit";


// api'dan dil verilerini alıp store'a dispatch edicek asenkron thunk askiyonu
export const getLanguages = createAsyncThunk(
    'language/getLanguages',
    async () => {
        const res = await api.get('/getLanguages');

        return res.data.data.languages;
    }
);

// apidan çeviri sonucunu alır
export const translateText = createAsyncThunk(
    'translate/translateText',
    async (p) => {
        //api e gönderilecek parametreler
        const params = new URLSearchParams();
        params.set('source_language', p.sourceLang.value);
        params.set('target_language', p.targetLang.value);
        params.set('text', p.text);
        //headeri belirle
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
        };
        //api istegi at pos metodu ile
        const res = await api.post('/translate', params, { headers });
        //aksiyonun payload return et
        return res.data.data.translatedText;
    }

);
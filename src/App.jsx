import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages } from "./redux/actions";
import Select from "react-select";

const App = () => {
  const langState = useSelector((store) => store.language);

  const [sourceLang, setSourceLang] = useState();
  const [targetLang, setTargetLang] = useState();
  const [text, setText] = useState();
  const dispatch = useDispatch();
  // console.log(langState);
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  //react-select döküman verisi
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  //apiden geleni select kütüphanesine uyarlama
  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [langState.languages],
  );
  console.log(text, targetLang, sourceLang);
  return (
    <div className="bg-zinc-900 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-content-center ">
        <h1 className="text-center text-4xl font-semibold mb-7">
          Translate App
        </h1>
        <div className="flex gap-2 text-black">
          <Select
            // isDisabled engelle isLoading yüklenme durumu boyunca
            onChange={(lang) => setSourceLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            placeholder={"Seçiniz"}
            className="flex-1"
          />

          <button className="py-2 px-6 bg-zinc-600 rounded transition hover:ring-2 hover:bg-zinc-800 text-white p-[10px]">
            Değiştir
          </button>
          <Select
            onChange={(lang) => setTargetLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            placeholder={"Seçiniz"}
            className="flex-1"
          />
        </div>
        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
          ></textarea>
          <textarea
            disabled
            className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-white"
          ></textarea>
        </div>
        <button className="rounded-md py-3 px-5 text-[19px] font-semibold cursor-pointer bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900 transition">
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;

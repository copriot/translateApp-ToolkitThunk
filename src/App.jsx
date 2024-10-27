import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions";
import Select from "react-select";
import Loader from "./Loader";
import { setAnswer } from "./redux/slices/translateSlice";

const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);

  console.log(translateState);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // Uygulama yüklendiğinde dilleri al
    dispatch(getLanguages());
  }, []);

  // Apiden gelen dilleri select kütüphanesine uyarlama
  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages],
  );

  const handleTranslate = () => {
    // Çeviri işlemini başlat
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    // Dilleri değiştir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translateState.answer);
    dispatch(setAnswer(text));
  };

  return (
    <div className="bg-[#0b0b15] h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-content-center">
        <h1 className="text-center text-4xl font-semibold mb-7 text-[#00e1ff]">
          Translate App
        </h1>
        <div className="flex gap-2">
          <Select
            value={sourceLang}
            onChange={(lang) => setSourceLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            placeholder={"Seçiniz"}
            className="flex-1 text-black"
            formatOptionLabel={(data) => (
              <div className="flex items-center">
                <span className="mr-2 text-[#00e1ff]">●</span> {data.label}
              </div>
            )}
          />
          <button
            onClick={handleSwap}
            className="py-2 px-6 rounded bg-[#00e1ff] hover:bg-[#33e7ff] text-black transition duration-200"
          >
            Değiştir
          </button>
          <Select
            value={targetLang}
            onChange={(lang) => setTargetLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            placeholder={"Seçiniz"}
            className="flex-1 text-black "
            formatOptionLabel={(data) => (
              <div className="flex items-center">
                <span className="mr-2 text-[#00e1ff]">●</span> {data.label}
              </div>
            )}
          />
        </div>
        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-white bg-[#121226] border border-[#00e1ff]"
          ></textarea>

          <div className="w-full relative">
            <textarea
              value={translateState.answer}
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-[#00e1ff] bg-[#121226] border border-[#00e1ff] opacity-90"
            />
            {translateState.isLoading && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleTranslate}
          className="rounded-md py-3 px-5 text-[19px] font-semibold bg-[#00e1ff] mt-3 hover:scale-110 transition duration-200 text-black"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;

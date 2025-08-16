import { memo, useMemo } from "react";
import { FaVolumeUp } from "react-icons/fa";

const Definitions = ({ word, meanings, darkTheme }) => {
  const audioPhonetic = useMemo(() => {
    if (meanings[0]?.phonetics?.length && word) {
      return meanings[0].phonetics.find(p => p.audio);
    }
    return null;
  }, [meanings, word]);

  const playAudio = () => {
    if (audioPhonetic && audioPhonetic.audio) {
      const audio = new Audio(audioPhonetic.audio);
      audio.play().catch(() => {
        console.warn("Audio playback failed");
      });
    }
  };

  return (
    <div className="meanings flex flex-col items-center w-full py-4 transition-colors duration-500">
      {/* Audio & phonetic */}
      {word && (
        <div className="flex flex-col items-center mb-6">
          {meanings[0]?.phonetic && (
            <p
              className={`text-xl font-medium mt-1 ${
                darkTheme ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {meanings[0].phonetic}
            </p>
          )}
          {audioPhonetic && (
            <button
              onClick={playAudio}
              aria-label="Play pronunciation"
              className={`bg-none border-none cursor-pointer mt-3 text-3xl ${
                darkTheme
                  ? "text-blue-300 bg-gray-800 hover:bg-gray-700 border-blue-400"
                  : "text-blue-600 bg-white hover:bg-blue-100 border-blue-200"
              } rounded-full shadow-lg p-3 transition-colors duration-500 border`}
              title="Play pronunciation"
            >
              <FaVolumeUp />
            </button>
          )}
        </div>
      )}

      {/* Start text */}
      {word === "" ? (
        <span
          className={`text-2xl font-semibold font-[Montserrat] ${
            darkTheme ? "text-gray-200" : "text-gray-800"
          } transition-colors duration-500`}
        >
          Start by typing a word in Search
        </span>
      ) : meanings.length === 0 ? (
        <span
          className={`text-lg font-medium ${
            darkTheme ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No definitions found. Try another word.
        </span>
      ) : (
        <div
          className={`w-full max-w-xl h-[55vh] min-h-[300px] overflow-y-auto rounded-xl ${
            darkTheme ? "bg-gray-900" : "bg-white"
          } p-4 transition-colors duration-500 scroll-smooth custom-scrollbar`}
        >
          {meanings.map((meaning, i) => (
            <div key={`${meaning.word}-${i}`} className="mb-8">
              {/* Grouped by part of speech */}
              {meaning.meanings.map(item => (
                <div key={item.partOfSpeech} className="mb-6">
                  <p
                    className={`text-sm uppercase tracking-wider font-bold mb-3 ${
                      darkTheme ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    {item.partOfSpeech}
                  </p>

                  {item.definitions.map(def => (
                    <div
                      key={def.definition}
                      className={`p-5 mb-4 rounded-2xl border shadow-md ${
                        darkTheme
                          ? "bg-gray-800 border-gray-700 text-gray-100"
                          : "bg-gray-50 border-gray-200 text-black"
                      } hover:shadow-lg transition duration-300`}
                    >
                      <p className="text-base font-semibold mb-2">
                        {def.definition}
                      </p>

                      {def.example && (
                        <p
                          className={`text-sm italic mb-2 ${
                            darkTheme ? "text-blue-300" : "text-blue-600"
                          }`}
                        >
                          “{def.example}”
                        </p>
                      )}

                      {def.synonyms?.length > 0 && (
                        <p className="text-sm text-green-500">
                          Synonyms:{" "}
                          <span className="text-gray-400">
                            {def.synonyms.join(", ")}
                          </span>
                        </p>
                      )}

                      {def.antonyms?.length > 0 && (
                        <p className="text-sm text-red-500 mt-1">
                          Antonyms:{" "}
                          <span className="text-gray-400">
                            {def.antonyms.join(", ")}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}

                  {(item.synonyms?.length > 0 || item.antonyms?.length > 0) && (
                    <div
                      className={`p-4 space-y-2 rounded-2xl border shadow-md ${
                        darkTheme
                          ? "bg-gray-800 border-gray-700 text-gray-100"
                          : "bg-gray-50 border-gray-200 text-black"
                      } hover:shadow-lg transition duration-300`}
                    >
                      {/* Synonyms */}
                      {item.synonyms?.length > 0 && (
                        <p className="text-green-500">
                          Synonyms:{" "}
                          <span className="text-gray-400">
                            {item.synonyms.join(", ")}
                          </span>
                        </p>
                      )}
                      {/* Antonyms */}
                      {item.antonyms?.length > 0 && (
                        <p className="text-red-500">
                          Antonyms:{" "}
                          <span className="text-gray-400">
                            {item.antonyms.join(", ")}
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Sources */}
              {meaning.sourceUrls?.length > 0 && (
                <div className="mt-4 text-xs">
                  <span className="font-medium">Source:</span>
                  {meaning.sourceUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ml-1 hover:underline ${
                        darkTheme ? "text-blue-300" : "text-blue-600"
                      } line-clamp-1`}
                    >
                      {url}
                    </a>
                  ))}
                </div>
              )}

              {/* License */}
              {meaning.license && (
                <p className="mt-1 text-xs italic">
                  Licensed under{" "}
                  <a
                    href={meaning.license.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {meaning.license.name}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Definitions);

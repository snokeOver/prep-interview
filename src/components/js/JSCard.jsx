import { useState } from "react";
import { TiTick } from "react-icons/ti";

const JSCard = ({ item }) => {
  const [copy, setCopy] = useState(false);
  const handleCopyCode = () => {
    const codeText = item.code;
    navigator.clipboard
      .writeText(codeText)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 3000);
      })
      .catch((err) => {
        setCopy(false);
      });
  };

  return (
    <div className="card card-compact w-auto bg-base-100 rounded-xl  group-hover:scale-[0.99] hover:!scale-100 duration-500  border">
      <div className="card-body">
        <h2 className="card-title text-left font-bold flex-grow">
          {item.question}
        </h2>

        <div className="divider p-0 m-0"></div>

        <div className="flex flex-col text-base gap-5 py-3 text-justify">
          <h3>{item?.answerLine1}</h3>

          {item.code && (
            <div className="relative">
              <pre className="bg-base-200 p-4 rounded-lg whitespace-pre-wrap font-mono">
                {item?.code}
              </pre>
              <button
                onClick={handleCopyCode}
                className="absolute btn-sm text-gray-200 font-semibold right-2 top-2  bg-primary  rounded-md"
              >
                {copy ? (
                  <div className="flex gap-1  items-center">
                    <TiTick className="text-xl" /> Copied
                  </div>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
          )}

          <h3>{item?.answerLine2}</h3>
          <h3>{item?.answerLine3}</h3>
          <h3>{item?.answerLine4}</h3>
          <h3>{item?.answerLine5}</h3>
          <h3>{item?.answerLine6}</h3>
        </div>
      </div>
    </div>
  );
};

export default JSCard;

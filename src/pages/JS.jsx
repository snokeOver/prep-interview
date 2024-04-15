import { useEffect, useState } from "react";
import JSCard from "../components/js/JSCard";

const JS = () => {
  const [jSItems, setJsItems] = useState([]);
  useEffect(() => {
    fetch("/jsQuestions.json")
      .then((result) => result.json())
      .then((data) => setJsItems(data));
  }, []);
  return (
    <div className="container mx-auto min-h-screen">
      <div>
        <div className="py-10 px-2">
          <div className="text-center bg-base-100 py-3 lg:p-3 md:py-14">
            <div className="grid grid-cols-1  gap-10 px-2 md:px-5 group">
              {jSItems.map((item) => (
                <JSCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JS;

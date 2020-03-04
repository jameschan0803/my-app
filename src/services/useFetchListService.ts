import { useEffect, useState } from "react";

export interface BreedList {
  data: BreedItem[];
}

const useFetchListService = () => {  

  const [result, setResult] = useState<Service<BreedList>>({
    status: "loading"
  });

  
  useEffect(() => {
    fetch("http://localhost:43000/dog-api")
      .then(response => response.json())
      .then(response => {
        if (response.success === true) {

          let dict: Dict = {};
          for (const item of response.data) {
            if (!dict[item.breed]) dict[item.breed] = [];
            if (item.subbreed) {
              dict[item.breed].push(item.subbreed);
            }
          }

          let arrs:BreedItem[] = [];
          Object.keys(dict).forEach(item => {
            let breed: BreedItem = { breed: item ,subbreed: []}
            if (dict[item].length > 0 ) breed.subbreed =  dict[item]
            arrs.push(breed);
          }); 

          setResult({ status: "loaded", payload: {data : arrs} });
          
        } else {
          setResult({
            status: "error",
            error: new Error(response.message)
          });
        }
      })
      .catch(error => setResult({ status: "error", error }));
  }, []);

  //console.log("@result",result);
  return result;
};

export default useFetchListService;

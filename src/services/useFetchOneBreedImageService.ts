import { useEffect, useState } from 'react';

const useFetchBreedImageService = (breed:string,subbreed:string) => {
  const [result, setResult] = useState<Service<ImageRes>>({
    status: 'loading'
  });

  useEffect(() => {
    if (breed) {

      var subBreedstr = subbreed.length > 0 ? "/" +subbreed : ""

      setResult({ status: 'loading' });
      fetch("http://localhost:43000/dog-api/view/"+breed+subBreedstr)
        .then(response => response.json())
        .then(response => {
          response.url = response.data;
          if (response.success === true) {

            setResult({ status: 'loaded', payload: response})
            
          } else {

            setResult({
              status: "error",
              error: new Error(response.message)
            });
          }
      })
        .catch(error => { 
          console.log("err",error)
          setResult({ status: 'error', error })
      
      });
    }
  }, [breed,subbreed]); 

  return result;
};

export default useFetchBreedImageService;



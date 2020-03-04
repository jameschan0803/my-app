import { useEffect, useState } from 'react';

const useFetchBreedImageService = (breed:string,subbreed:string) => {
  const [result, setResult] = useState<Service<ImageRes>>({
    status: 'loading'
  });

  useEffect(() => {
    if (breed) {

      var subBreedstr = subbreed.length > 0 ? "/" +subbreed : ""

      setResult({ status: 'loading' });
      fetch("http://localhost:43000/dog-api/"+breed+subBreedstr)
        .then(response => response.json())
        .then(response => {
         
          if (response.success === true) {

            if ( response.data.length === 0 ){
              setResult({
                status: "error",
                error: new Error("NO pictures are available currently..")
              });
            }else{ 
              setResult({ status: 'loaded', payload: response })
            }
          } else {
            setResult({
              status: "error",
              error: new Error(response.message)
            });
          }
      })
        .catch(error => setResult({ status: 'error', error }));
    }
  }, [breed,subbreed]); 

  //console.log("image",result)
  return result;
};

export default useFetchBreedImageService;



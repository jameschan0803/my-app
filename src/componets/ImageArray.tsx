import React from "react";
import useFetchBreedImageService from "../services/useFetchBreedImageService";
import Loader from "./Loader";
import BreedListItemDisplay from "./BreedListItemDisplay";

interface ImageArrayProps {
  breedImage: BreedImageParam;
}

const ImageArray: React.FC<ImageArrayProps> = ({ breedImage }) => {
  const serviceImage = useFetchBreedImageService(
    breedImage.breed,
    breedImage.subbreed
  );

  const [imageDetail, setImageDetail] = React.useState<imageDetail>({ 
    breed: "",
    subbreed: "",
    url: ""
   });



  //split the images into 4 group
  let count = 0;
  const g1: string[] = [];
  const g2: string[] = [];
  const g3: string[] = [];
  const g4: string[] = [];
  const gs: string[][] = [];

  if (
    serviceImage.status === "loaded" &&
    serviceImage.payload.data.length > 0
  ) {
    serviceImage.payload.data.forEach(url => {
      if (count % 4 === 0) {
        g1.push(url);
      } else if (count % 4 === 1) {
        g2.push(url);
      } else if (count % 4 === 2) {
        g3.push(url);
      } else if (count % 4 === 3) {
        g4.push(url);
      }
      count++;
    });
  }

  gs.push(g1);
  gs.push(g2);
  gs.push(g3);
  gs.push(g4);

  //console.log(count, g1.length, g2.length, g3.length, g4.length);

  let columnCount = 0;

  return (
    <>
      <div className="card">
        <div>
          <label className="notice">*Disply Column will vary from 4 to 1 according to the screen width.</label> 
          <div></div>
        </div>
        
        {serviceImage.status === "loading" && (
          <div className="loader-container">
            <Loader />
          </div>
        )}

        {serviceImage.status === "loaded" && (
          <div className="row">
            {gs.map(group => {
              return (
                <div className="column" key = {breedImage.breed +columnCount++}>
                  {group.map(url => {
                    return (
                      <img 
                        className="image-item"
                        src={String(url)}
                        alt={
                          breedImage.breed +
                          (breedImage.subbreed.length > 0
                            ? " " + breedImage.subbreed
                            : "")
                        }
                        onClick={() => setImageDetail({ 
                          breed: breedImage.breed,
                          subbreed: breedImage.subbreed,
                          url: String(url)
                         })}
                        key={url}
                      ></img>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
         {!!imageDetail.url && <BreedListItemDisplay imageDetail={imageDetail} onClose={() => setImageDetail({ 
                          breed: breedImage.breed,
                          subbreed: breedImage.subbreed,
                          url: ""
                         })} />}
      </div>

      {serviceImage.status === "error" && (
        <div className="err-info">Server 2Error: {serviceImage.error.message}</div>
      )}
    </>
  );
};

export default ImageArray;

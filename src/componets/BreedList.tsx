import React, { ChangeEvent, useState } from "react";
import useFetchListService from "../services/useFetchListService";
import Loader from "./Loader";
import BreedListItem from "./BreedListItem";
import ImageArray from "./ImageArray";



const BreedList: React.FC = () => {
  const service = useFetchListService();

  //breed droplist
  const [breedListValue, setBreedListValue] = useState<string>("");
  //subbreed droplist
  const [subbreedListValue, setSubBreedListValue] = useState<string>("");
  const [hideSubOption, setHideSubOption] = useState<boolean>(true);

  //images Array
  const [breedIamge, setBreedIamge] = useState<BreedImageParam>({
    breed: "",
    subbreed: ""
  });

  //breedlist, subBreedlist value chagne
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const id: string = e.target.id;
    const selected = e.target.selectedOptions[0].value;

    if (e.target.value !== "" && e.target.value !== breedListValue) {
      //breed
      if (id === "breedList") {
        setBreedListValue(selected);
        console.log("selected breed :", selected);
        setHideSubOption(true);
        setBreedIamge({
          breed: selected,
          subbreed: ""
        });
      }
      //subbreed
      if (id === "subbreedList") {
        setSubBreedListValue(selected);
        console.log("selected subbreed :", selected);
        setBreedIamge({
          breed: breedListValue,
          subbreed: selected
        });
      }
    }
  };

  return (
    <>
      <div>
        {service.status === "loading" && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>

      <div className="wrapper">
        {service.status === "loaded" && (
          <div className="left-select">
            <div className="select-label">
              <label>Breed:</label>
            </div>
            <div className="droplist">
              <div className="select">
                <select
                  id="breedList"
                  value={breedListValue}
                  onChange={handleChange}
                >
                  {<option value="">-Select a Breed-</option>}
                  {service.payload.data.map(breed => {
                    return (
                      <BreedListItem value={breed.breed} key={breed.breed} />
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        )}

        {service.status === "loaded" && (
          <div className="right-select">
            <div className="select-label" hidden={hideSubOption}>
              <label>Sub-Breed:</label>
            </div>
            <div className="droplist" hidden={hideSubOption}>
              <div className="select">
                <select
                  id="subbreedList"
                  value={subbreedListValue}
                  onChange={handleChange}
                >
                  <option value=""> - Select a SubBreed - </option>
                  {service.payload.data.map(breed => {
                    if (breed.breed === breedListValue) {
                      return breed.subbreed.map(subbreed => {
                        if (hideSubOption) setHideSubOption(false);
                        return (
                          <BreedListItem value={subbreed} key={subbreed} />
                        );
                      });
                    } else return "";
                  })}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {service.status === "loaded" && breedListValue !== "" && (
        <div className="container">
          <ImageArray breedImage={breedIamge} />
        </div>
      )}

      {service.status === "error" && (
        <div className="err-info">Server Error: {service.error.message}</div>
      )}
    </>
  );
};

export default BreedList;

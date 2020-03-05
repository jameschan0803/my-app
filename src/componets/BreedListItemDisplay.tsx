import React from "react";
import useFetchOneBreedImageService from "../services/useFetchOneBreedImageService";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export interface DetailProps {
  onClose(): void;
  imageDetail: imageDetail;
}

const BreedListItemDisplay: React.FC<DetailProps> = ({
  imageDetail,
  onClose
}) => {
  const str =
    imageDetail.breed +
    (imageDetail.subbreed.length > 0 ? " " + imageDetail.subbreed : "");

  let serviceImage = useFetchOneBreedImageService(
    imageDetail.breed,
    imageDetail.subbreed
  );

  return (
    <div>
      
        <div className="detail-modal-container">
          <div className="detail-modal-background" onClick={onClose} />

          {serviceImage.status === "loading" && (
            <div className="loader-container">
              <Loader />
            </div>
          )}

          {serviceImage.status === "error" && (
            <div className="detail-modal-container">
              <div className="detail-modal-background" />
              <div className="detail">
                {!imageDetail.tag && (
                  <label className="close-label">
                    Click background to close
                  </label>
                )}

                {imageDetail.tag && (
                  <Link to="/" className="close-link">
                    Go Back
                  </Link>
                )}

                <div className="warning">{serviceImage.error.message}</div>
              </div>
            </div>
          )}

          {serviceImage.status === "loaded" && serviceImage.payload.url !== "" && (
            <div className="detail">
              {!imageDetail.tag && (
                <label className="close-label">Click background to close</label>
              )}

              {imageDetail.tag && (
                <Link to="/" className="close-link">
                  Go Back
                </Link>
              )}

              <div className="detail-info">
                <div className="detail-info-item">
                  <div className="label">Breed:</div>
                  <div className="data">{imageDetail.breed}</div>
                </div>
                <div className="detail-info-item">
                  <div className="label">Subbreed:</div>
                  <div className="data">{imageDetail.subbreed}</div>
                </div>
              </div>
              <div className="url">
                <div className="label">URL:</div>
                <div className="data">{serviceImage.payload.url}</div>
              </div>
              <div id="image-container">
                <img src={serviceImage.payload.url} alt={str} key={str}></img>
              </div>
            </div>
          )}
        </div>

    </div>
  );
};

export default BreedListItemDisplay;

import React from "react";

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

  return (
    <div className="detail-modal-container">
      <div className="detail-modal-background" onClick={onClose} />

      <div className="detail">
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
          <div className="data">{imageDetail.url}</div>
        </div>

        <div id="image-container">
          <img  src={imageDetail.url} alt={str} key={str}></img>
        </div>
      </div>
    </div>
  );
};

export default BreedListItemDisplay;

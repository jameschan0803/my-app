import React from "react";

interface BreedListItemProps {
  value: string
}

const BreedListItem: React.FC<BreedListItemProps> = ({
  value
}) => {
  return (
    <option
      //put subbreed into value
      value={value}
      key = {value}
    > 

      {value}
    </option>
  );
};

export default BreedListItem;


/* Service Type  */

interface ServiceInit {
  status: "init";
}

interface ServiceLoading {
  status: "loading";
}

interface ServiceLoaded<T> {
  status: "loaded";
  payload: T;
}

interface ServiceError {
  status: "error";
  error: Error;
}

type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

/* Breed subBreed  */

type Breed = {
  value: string;
  label: string;
};

type BreedItem = {
  breed: string;
  subbreed: string[];
};

type Dict = { [id: string]: string[] };

/* Breed subBreed image */

type BreedImageParam = {
  breed: string;
  subbreed: string;
};

type BreedImage = {
  breed: string;
  subbreed: string;
  urls: string[];
};

type imageDetail = {
  breed: string;
  subbreed: string;
  url: string;
};

type  ImageRes= {
  success: boolean;
  message: string;
  page: number;
  perpage : number;
  total : number;
  data: string[]
}
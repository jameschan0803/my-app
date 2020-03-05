import React from "react";
import BreedList from "./componets/BreedList";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps
} from "react-router-dom";
import BreedListItemDisplay from "./componets/BreedListItemDisplay";

//* deep link setup
type UParams = { breed: string; subbreed: string };

function MainApp() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="header">
          <div className="container">
            <h1>Would you like to view some lovely dog pictures? </h1>
            <p className="slogan">
              The pictures are from{" "}
              <b>
                <a href="https://dog.ceo/dog-api/"> Dog API </a>
              </b>
              .
            </p>
          </div>
        </header>
        <div>
          <BreedList />
        </div>
      </div>
    </React.Fragment>
  );
}

//* deep link page
function displayBreed({ match }: RouteComponentProps<UParams>, tag : boolean) {
 
  console.log("url params:",match.params);
  const breed = match.params.breed || "";
  const subBreed = match.params.subbreed || "";

  const imageDetail = { 
    breed:breed,
    subbreed: subBreed,
    url: "",
    tag:true
   }


  return (
    <React.Fragment>
        <BreedListItemDisplay imageDetail={imageDetail}  onClose={ () => void({ })} />
    </React.Fragment>
  );
}

const App: React.FC = () => {

  return (
    <Router>
      <div>
       
        <Route
          exact
          path="/breed/:breed?/:subbreed?"
          component={displayBreed}
        />
         <Route path="/" component={MainApp} />
      </div>
    </Router>
  );
};

export default App;

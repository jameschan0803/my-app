import React from "react";
import BreedList from './componets/BreedList';


const App: React.FC = () => {
 
  return (
    <React.Fragment>
     <div className="App">
     <header className="header">
       <div className="container">
         <h1>Would you like to view some lovely dog pictures? </h1>
         <p className="slogan">
           The pictures are from <b><a href="https://dog.ceo/dog-api/"> Dog API </a></b>.
         </p>
       </div>
     </header>
     <div >
       <BreedList />
     </div>
    </div>

   </React.Fragment>

  );


};

export default App;

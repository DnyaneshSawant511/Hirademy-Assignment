import React from "react";
import {Routes, Route} from 'react-router-dom';
import BookHome from "./pages/BookHome";
import BookDetails from "./pages/BookDetails";
import Spinner from "./components/Spinner.jsx";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Spinner />} />
      <Route path='/books' element={<BookHome />} />
      <Route path='/books/:id' element={<BookDetails />} />
    </Routes>
  );
}

export default App;
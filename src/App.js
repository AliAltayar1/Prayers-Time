import { useEffect } from "react";
import Header from "./Components/header";
import Search from "./Components/search";
import Content from "./Components/search-body";
import "./App.css";

function App() {
  return (
    <div className="main-page">
      <Header />
      <Content />
    </div>
  );
}

export default App;

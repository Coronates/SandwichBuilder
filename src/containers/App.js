import React from "react";
import Layout from "../components/Layout/Layout";
import BurguerBuilder from './BurguerBuilder/BurguerBuilder';



function App() {
  return (
    <div className="App">
      <Layout>
        <BurguerBuilder/>
        
      </Layout>
    </div>
  );
}

export default App;

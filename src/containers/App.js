import React from "react";
import Layout from "../containers/Layout/Layout";
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

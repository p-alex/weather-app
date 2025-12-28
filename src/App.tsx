import Layout from "./components/Layout/Layout";
import Nav from "./components/Nav/Nav";
import UnitsContextProvider from "./context/UnitsContextProvider";

function App() {
  return (
    <Layout>
      <UnitsContextProvider>
        <Nav />
      </UnitsContextProvider>
    </Layout>
  );
}

export default App;

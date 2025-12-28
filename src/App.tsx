import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Nav from "./components/Nav/Nav";
import UnitsContextProvider from "./context/UnitsContextProvider";

function App() {
  return (
    <Layout>
      <UnitsContextProvider>
        <Nav />
        <Header title="How’s the sky looking today?" />
      </UnitsContextProvider>
    </Layout>
  );
}

export default App;

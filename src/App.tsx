import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";
import Nav from "./components/Nav/Nav";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import UnitsContextProvider from "./context/UnitsContextProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import setDefaultLastSearchedLocation from "./utils/setDefaultLastSearchedLocation";

const queryClient = new QueryClient();

function App() {
  setDefaultLastSearchedLocation();

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <UnitsContextProvider>
          <Nav />
          <WeatherDisplay />
        </UnitsContextProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Layout>
  );
}

export default App;

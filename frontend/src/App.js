import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Layout from "./component/Layout";
import Home from "./pages/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Layout>
    <Home />
  </Layout>
  );
}

export default App;

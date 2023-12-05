import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import Home from './components/pages/Home';
import TablePage from "./components/pages/TablePage";
import NotFound from "./components/pages/NotFound";
import { fetchStatuses } from "./redux/statusesRedux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatuses()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<TablePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Apply } from "./pages/Apply";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="apply" element={<Apply />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

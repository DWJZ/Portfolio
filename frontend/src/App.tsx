import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { DemosPage } from "./pages/DemosPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { LabPage } from "./pages/LabPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="demos" element={<DemosPage />} />
      <Route path="playground" element={<PlaygroundPage />} />
      <Route path="lab" element={<LabPage />} />
    </Route>
  )
);

function App() {
  console.log("App");
  return <RouterProvider router={router} />;
}

export default App;

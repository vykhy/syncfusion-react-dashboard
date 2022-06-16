import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";

import { useStateContext } from "./contexts/ContextProvider";
import "./App.css";

const Ecommerce = lazy(() => import("./pages/Ecommerce"));
const Orders = lazy(() => import("./pages/Orders"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Employees = lazy(() => import("./pages/Employees"));
const Customers = lazy(() => import("./pages/Customers"));
const Kanban = lazy(() => import("./pages/Kanban"));
const ColorPicker = lazy(() => import("./pages/ColorPicker"));
const Editor = lazy(() => import("./pages/Editor"));

const Stacked = lazy(() => import("./pages/Charts/Stacked"));
const Pyramid = lazy(() => import("./pages/Charts/Pyramid"));
const Area = lazy(() => import("./pages/Charts/Area"));
const Bar = lazy(() => import("./pages/Charts/Bar"));
const Pie = lazy(() => import("./pages/Charts/Pie"));
const Financial = lazy(() => import("./pages/Charts/Financial"));
const ColorMapping = lazy(() => import("./pages/Charts/ColorMapping"));
const Line = lazy(() => import("./pages/Charts/Line"));

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                  style={{ background: currentColor, borderRadius: "50%" }}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                activeMenu ? " md:ml-72 " : "flex-2"
              }`}
            >
              <div className="fixed md:static bg-main-bg dark:bg-maian-dark-bg navbar w-full">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}
                <Suspense
                  fallback={
                    <center>
                      <h3>...Loading</h3>
                    </center>
                  }
                >
                  <Routes>
                    {/* Dashboard */}
                    <Route path="/" element={<Ecommerce />} />
                    <Route path="/ecommerce" element={<Ecommerce />} />

                    {/* Pages */}
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/customers" element={<Customers />} />

                    {/* Apps */}
                    <Route path="/kanban" element={<Kanban />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/color-picker" element={<ColorPicker />} />

                    {/* Charts  */}
                    <Route path="/line" element={<Line />} />
                    <Route path="/area" element={<Area />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/financial" element={<Financial />} />
                    <Route path="/color-mapping" element={<ColorMapping />} />
                    <Route path="/pyramid" element={<Pyramid />} />
                    <Route path="/stacked" element={<Stacked />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

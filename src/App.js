import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes } from "./routes/PublicRoutes";
import SideNavber from "./components/pages/sideNavber/SideNavber";
import { privateAdminRoutes, privateCustomerRoutes, privateDeliveryAgentRoutes } from "./routes/PrivateRoutes";
import AdminDashboard from "./components/pages/admin/adminDashboard/AdminDashboard";
import BookingHistory from "./components/pages/customer/bookingHistory/BookingHistory";
import AgentDashboard from "./components/pages/deliveryAgent/agentDashboard/AgentDashboard";
import RequireAuth from "./components/pages/auth/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        {/*--------------- public Routes --------------*/}
        {publicRoutes.map(({ path, Component }, index) => (
          <Route
            key={index}
            path={path}
            element={<Component></Component>}
          ></Route>
        ))}
       <Route element={<RequireAuth />}>    
          <Route path="/admin" element={<SideNavber />}>
            <Route index element={<AdminDashboard />} />
            {privateAdminRoutes.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />}></Route>
            ))}
          </Route>
        </Route>
        <Route element={<RequireAuth />}>        
          <Route path="/customer" element={<SideNavber />}>
            <Route index element={<BookingHistory />} />
            {privateCustomerRoutes.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />}></Route>
            ))}
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/agent" element={<SideNavber />}>
            <Route index element={<AgentDashboard />} />
            {privateDeliveryAgentRoutes.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />}></Route>
            ))}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

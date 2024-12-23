import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar ";
import { Toaster } from "sonner";

//! Layout Here:
function Layout() {
  const user = false;
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-gray-50 sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      {/* <MobileSidebar/> */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
const App = () => {
  return (
    <main className="w-full min-h-screen bg-gray-100">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to={"/dashboard"} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trash" element={<Trash />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster richColors />
    </main>
  );
};

export default App;

/*
state in the Navigate function we used to know the user is logged in or not or to know the location of the user

*/

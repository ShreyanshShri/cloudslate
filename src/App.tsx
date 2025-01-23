import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAlertStore from "./stores/AlertStore";

import Editor from './editor/Editor';
import Homepage from "./homepage/Homepage";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ProfilePage from "./auth/ProfilePage";
import Alert from "./common/Alert";

import './App.css';

function App() {

  const alert = useAlertStore((state: any) => state.alert)

  return (
    <BrowserRouter>
      {alert.status === true && <Alert type={alert.type} message={alert.message} />}
      <Routes>
          <Route index element={<Homepage />} />
          <Route path="/editor" element={<Navigate to="/editor/new" replace />} />
          <Route path="/editor/new" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/auth" element={<Navigate to="/auth/register" replace />} />
          <Route path="/auth/register" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/profile" element={<ProfilePage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

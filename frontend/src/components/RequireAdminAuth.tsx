import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type RequireAdminAuthProps = {
  children: JSX.Element;
};

const RequireAdminAuth = ({ children }: RequireAdminAuthProps) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default RequireAdminAuth;

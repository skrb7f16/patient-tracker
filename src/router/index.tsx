import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../layout/HomeLayout";
import PatientRegistration from "../views/PatiendRegistration";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: '/',
            element: <HomeLayout />,
            children: [
              {
                path: 'add',
                element: <PatientRegistration />
              }
            ]
        }
      ]
    },
  ]);

export default router;
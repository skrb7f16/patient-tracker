import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../layout/HomeLayout";
import PatientRegistration from "../views/PatiendRegistration";
import Search from "../views/Search";
import PatientDetailsLayout from "../layout/PatientDetailsLayout";

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
              },
              {
                path: 'search',
                element: <Search />
              }
            ]
        },
        {
          path: '/p/:patientId',
          element: <PatientDetailsLayout />
        }
      ]
    },
  ]);

export default router;
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard/Dashboard";
import UserBookDetails from "../components/Dashboard/UserBookDetails";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import LoginRegister from "../components/LoginRegister";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/footer/contact/ContactUs";
import FacilityListingPage from "../components/Facility/FacilityListing";
import FacilityDetailsPage from "../components/Facility/FacilityDetails";
import BookingForm from "../components/BookingForm";
import NotFound from "../pages/NotFound";
import AdminFacilityManagement from "../components/Dashboard/AdminFacilityManagement";
import AddAdmin from "../components/Dashboard/AddAdmin";
import AdminBookingManagement from "../components/Dashboard/AdminBookingManagement";
import UserBookings from "../components/Dashboard/UserBookings";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "/about",
    element: <AboutUs></AboutUs>,
  },
  {
    path: "/contact",
    element: <ContactUs></ContactUs>,
  },
  {
    path: "/facility",
    element: (
      <ProtectedRoute>
        <FacilityListingPage></FacilityListingPage>
      </ProtectedRoute>
    ),
  },
  {
    path: "/facility/:id",
    element: <FacilityDetailsPage></FacilityDetailsPage>,
  },
  {
    path: "/facility/:id/book",
    element: <BookingForm></BookingForm>,
  },
  {
    path: "/sign",
    element: <LoginRegister></LoginRegister>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: "/dashboard/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/manage-facilities",
    element: <AdminFacilityManagement />,
  },
  {
    path: "/admin/add-admin",
    element: <AddAdmin />,
  },
  {
    path: "/admin/booking-management",
    element: <AdminBookingManagement />,
  },
  {
    path: "/user/bookings",
    element: <UserBookings />,
  },
  {
    path: "/booking-details/:bookingId",
    element: <UserBookDetails />,
  },
]);
export default router;

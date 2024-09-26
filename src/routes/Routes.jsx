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
import UserProfile from "../components/Dashboard/UserProfile";
import EditProfile from "../components/Dashboard/EditProfile";
import LoginForm from "../components/LoginForm";

import BookingConfirmation from "../components/BookingConfirmation";

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
    path: "/booking-form",
    element: <BookingForm></BookingForm>,
  },
  {
    path: "/booking-confirmation",
    element: <BookingConfirmation></BookingConfirmation>,
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
    path: "/facilities",
    element: <FacilityListingPage></FacilityListingPage>,
  },
  {
    path: "/facility/:id",

    element: <FacilityDetailsPage />,
  },
  {
    path: "/facility/:id/book",
    element: <ProtectedRoute element={<BookingForm />} />,
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
    path: "/user/profile",
    element: <UserProfile />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },

  {
    path: "/user/:userId/bookings",
    element: <UserBookings />,
  },

  {
    path: "/bookings/:bookingId",
    element: <UserBookDetails />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);
export default router;

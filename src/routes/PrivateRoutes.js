import { Component } from 'react';
import AdminDashboard from '../components/pages/admin/adminDashboard/AdminDashboard';
import AllBookings from '../components/pages/admin/allBookings/AllBookings';
import AllUsers from '../components/pages/admin/allUsers/AllUsers';
import Reports from '../components/pages/admin/reports/Reports';
import BookingHistory from '../components/pages/customer/bookingHistory/BookingHistory';
import BookParcel from '../components/pages/customer/bookParcel/BookParcel'
import CustomerDashboard from '../components/pages/customer/customerDashboard/CustomerDashboard';
import CustomerProfile from '../components/pages/customer/customerProfile/CustomerProfile';
import TrackParcel from '../components/pages/customer/trackParcel/TrackParcel';
import AgentDashboard from '../components/pages/deliveryAgent/agentDashboard/AgentDashboard';
import AgentProfile from '../components/pages/deliveryAgent/agentProfile/AgentProfile';
import AssignedParcels from '../components/pages/deliveryAgent/assignedParcels/AssignedParcels';
import Agents from '../components/pages/admin/Agents/Agents';
import NewBookings from '../components/pages/admin/NewBookings/NewBookings';
import Delivered from '../components/pages/deliveryAgent/Delivered/Delivered';
import BookingDetails from '../components/pages/admin/BookingDetails/BookingDetails';
import Parcel from '../components/pages/deliveryAgent/parcel/Parcel';






/* ============ private admin routes start =============== */
export const privateAdminRoutes = [
  { path: "dashboard", Component: AdminDashboard },
  { path: "bookings", Component: AllBookings },
  { path: "bookings/:id", Component: BookingDetails },
  { path: "new-bookings", Component: NewBookings },
  { path: "users", Component: AllUsers },
  { path:"agents", Component: Agents},
  { path: "reports", Component: Reports },
];
/* ============ private admin routes end =============== */
/* ============ private customer routes start =============== */
export const privateCustomerRoutes = [
  { path: "booking-history", Component: BookingHistory },
  { path: "book-parcel", Component: BookParcel },
  { path: "customer-dashboard", Component: CustomerDashboard },
  { path: "customer-profile", Component: CustomerProfile },
  { path: "track-parcel", Component: TrackParcel },
];
/* ============ private customer routes end =============== */
/* ============ private delivery Agent routes start =============== */
export const privateDeliveryAgentRoutes = [
  { path: "dashboard", Component:  AgentDashboard},
  { path: "agent-profile", Component: AgentProfile },
  { path: "assigned-parcels", Component: AssignedParcels },
  { path: "delivered-parcels", Component: Delivered },
  { path: "parcel/:id", Component: Parcel },
];
/* ============ private delivery Agent routes emd =============== */
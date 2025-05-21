import { Routes, Route } from "react-router-dom";

// main ones
import AppLayout from "./components/Main/AppLayout";
import DashboardPage from "./pages/Overview/Dashboard"
import Profile from "./pages/Overview/Profile";
import NotificationsPage from "./pages/Overview/NotificationsPage"
import EditProfile from "./pages/Overview/EditProfile"

// Property Management
import PropertiesPage from "./pages/PropertyManagement/PropertiesPage";
import MaintenancePage from "./pages/PropertyManagement/MaintenancePage";

// Booking&TenantMaintainance
import BookingsPage from "./pages/Booking&TenantManagement/BookingsPage";
import TenantsPage from "./pages/Booking&TenantManagement/TenantsPage";
import PaymentsPage from "./pages/Booking&TenantManagement/PaymentsPage";
import ViewInvoice from "./pages/Booking&TenantManagement/ViewInvoice";

// Analytics&Reports
import AnalyticsPage from "./pages/Analytics&Reports/AnalyticsPage";
import ReportsPage from "./pages/Analytics&Reports/ReportsPage";

// Settings&Permissions
import SettingsPage from "./pages/Settings&Permissions/SettingsPage";
import PropertyDetails from "./pages/PropertyManagement/PropertyDetails";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="propertydetails/:id" element={<PropertyDetails />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="tenants" element={<TenantsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="invoiceview" element={<ViewInvoice />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Malos Haven';

    switch (location.pathname) {
      case '/':
        title = 'Malos Haven - Dashboard';
        break;
      case '/properties':
        title = 'Manage Properties';
        break;
      case '/rooms':
        title = 'Room Management';
        break;
      case '/maintenance':
        title = 'Maintenance Requests';
        break;
      case '/bookings':
        title = 'Bookings & Reservations';
        break;
      case '/tenants':
        title = 'Tenant Management';
        break;
      case '/payments':
        title = 'Payments & Invoices';
        break;
      case '/analytics':
        title = 'Analytics Overview';
        break;
      case '/reports':
        title = 'Reports Dashboard';
        break;
      case '/settings':
        title = 'Settings';
        break;
      case '/permissions':
        title = 'User Permissions';
        break;
      case '/invoiceview':
        title= 'Invoice View'
        break;
      default:
        title = 'Malos Haven';
    }

    document.title = title;
  }, [location]);

  return null;
};

export default PageTitleUpdater;

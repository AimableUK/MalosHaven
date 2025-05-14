import propertiesList from "./Properties";

const properties = propertiesList;

let notificationId = 1;

const notifications = properties.flatMap((property) =>
  property.units.flatMap((unit) => {
    const tenant = unit.tenant;

    if (
      tenant &&
      Array.isArray(tenant.maintenanceRequests) &&
      tenant.maintenanceRequests.length > 0
    ) {
      return tenant.maintenanceRequests.map((req) => ({
        id: notificationId++,
        type: "maintenance",
        isRead: false,
        tenant: {
          ...tenant,
          unit: unit.UnitNumber,
        },
      }));
    }

    return [];
  })
);

export default notifications;

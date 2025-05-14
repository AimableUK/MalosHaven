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
      return {
        id: notificationId++,
        type: "maintenance",
        isRead: false,
        tenant: {
          ...tenant,
          property: property.name,
          unit: unit.unitNumber,
        },
        tenantImage: tenant.image,
        tenantName: tenant.name,
        timeStamp: tenant.maintenanceRequests[0]?.dateSubmitted,
      };
    }
    return [];
  })
);

export default notifications;

import houseImg from "../assets/house.jpg";
import houseImg1 from "../assets/house1.jpg";
import houseImg2 from "../assets/house2.jpg";

const properties = [
  {
    id: 1,
    image: houseImg,
    title: "Luxury Waterfront Villa",
    description:
      'Located right by the beach, this luxurious waterfront villa offers breathtaking views of the ocean and serene surroundings.',
    location: "Miami, USA",
    units: [
      { 
        id: 1, 
        UnitNumber: "101", 
        UnitValue: 1200000,
        tenant: {
          tenant_id: "TNT-001",
          name: "Laurie Flores",
          email: "laurie.flores@gmail.com",
          phone: "001-394-589-1643",
          national_id: "1299003155395965",
          property: "Luxury Waterfront Villa",
          unit: "101",
          image: "https://randomuser.me/api/portraits/women/34.jpg",
          gender: "Female",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 2, 
        UnitNumber: "102", 
        UnitValue: 1500000,
        tenant: {
          tenant_id: "TNT-002",
          name: "Ryan Adams",
          email: "ryan.adams@hotmail.com",
          phone: "001-394-589-1643x78218",
          national_id: "4567002134567890",
          property: "Luxury Waterfront Villa",
          unit: "102",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          gender: "Male",
          paymentStatus: "Not Yet"
        }
      },
      { 
        id: 3, 
        UnitNumber: "103", 
        UnitValue: 1300000,
        tenant: {
          tenant_id: "TNT-003",
          name: "Jessica Nguyen",
          email: "jessica.nguyen@gmail.com",
          phone: "001-456-789-1542",
          national_id: "2345001234567891",
          property: "Luxury Waterfront Villa",
          unit: "103",
          image: "https://randomuser.me/api/portraits/women/22.jpg",
          gender: "Female",
          paymentStatus: "Partially"
        }
      },
      { 
        id: 4, 
        UnitNumber: "104", 
        UnitValue: 1400000,
        tenant: {
          tenant_id: "TNT-004",
          name: "Mohammed Ali",
          email: "mohammed.ali@gmail.com",
          phone: "001-564-785-9987",
          national_id: "9876543210123456",
          property: "Luxury Waterfront Villa",
          unit: "104",
          image: "https://randomuser.me/api/portraits/men/64.jpg",
          gender: "Male",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 5, 
        UnitNumber: "105", 
        UnitValue: 1250000,
        tenant: {
          tenant_id: "TNT-005",
          name: "Emma Watson",
          email: "emma.watson@gmail.com",
          phone: "001-394-999-6645",
          national_id: "5647382910563728",
          property: "Luxury Waterfront Villa",
          unit: "105",
          image: "https://randomuser.me/api/portraits/women/56.jpg",
          gender: "Female",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 6, 
        UnitNumber: "106", 
        UnitValue: 1550000,
        tenant: {
          tenant_id: "TNT-006",
          name: "John Doe",
          email: "john.doe@hotmail.com",
          phone: "001-732-113-4567",
          national_id: "6655443322119988",
          property: "Luxury Waterfront Villa",
          unit: "106",
          image: "https://randomuser.me/api/portraits/men/15.jpg",
          gender: "Male",
          paymentStatus: "Not Yet"
        }
      },
      { 
        id: 7, 
        UnitNumber: "107", 
        UnitValue: 1450000,
        tenant: {
          tenant_id: "TNT-007",
          name: "Sophia Turner",
          email: "sophia.turner@gmail.com",
          phone: "001-994-384-5741",
          national_id: "7788996655443322",
          property: "Luxury Waterfront Villa",
          unit: "107",
          image: "https://randomuser.me/api/portraits/women/18.jpg",
          gender: "Female",
          paymentStatus: "Partially"
        }
      },
      { 
        id: 8, 
        UnitNumber: "108", 
        UnitValue: 1350000,
        tenant: {
          tenant_id: "TNT-008",
          name: "Mark Johnson",
          email: "mark.johnson@gmail.com",
          phone: "001-321-654-9987",
          national_id: "1122334455667788",
          property: "Luxury Waterfront Villa",
          unit: "108",
          image: "https://randomuser.me/api/portraits/men/35.jpg",
          gender: "Male",
          paymentStatus: "Paid"
        }
      }
    ]
  },
  {
    id: 2,
    image: houseImg1,
    title: "Modern Loft in the City Center",
    description:
      'A stylish loft situated in the heart of the city with easy access to cafes, shopping, and entertainment.',
    location: "New York, USA",
    units: [
      { 
        id: 1, 
        UnitNumber: "201", 
        UnitValue: 850000,
        tenant: {
          tenant_id: "TNT-009",
          name: "Lucas Miller",
          email: "lucas.miller@gmail.com",
          phone: "001-223-887-3645",
          national_id: "7788991122334455",
          property: "Modern Loft in the City Center",
          unit: "201",
          image: "https://randomuser.me/api/portraits/men/12.jpg",
          gender: "Male",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 2, 
        UnitNumber: "202", 
        UnitValue: 900000,
        tenant: {
          tenant_id: "TNT-010",
          name: "Olivia Brown",
          email: "olivia.brown@hotmail.com",
          phone: "001-563-723-2645",
          national_id: "9876543210192837",
          property: "Modern Loft in the City Center",
          unit: "202",
          image: "https://randomuser.me/api/portraits/women/29.jpg",
          gender: "Female",
          paymentStatus: "Not Yet"
        }
      },
      { 
        id: 3, 
        UnitNumber: "203", 
        UnitValue: 950000,
        tenant: {
          tenant_id: "TNT-011",
          name: "Chloe Evans",
          email: "chloe.evans@gmail.com",
          phone: "001-345-876-6543",
          national_id: "2233445566778899",
          property: "Modern Loft in the City Center",
          unit: "203",
          image: "https://randomuser.me/api/portraits/women/53.jpg",
          gender: "Female",
          paymentStatus: "Partially"
        }
      },
      { 
        id: 4, 
        UnitNumber: "204", 
        UnitValue: 970000,
        tenant: {
          tenant_id: "TNT-012",
          name: "Ryan Scott",
          email: "ryan.scott@gmail.com",
          phone: "001-765-987-5642",
          national_id: "1122334455667788",
          property: "Modern Loft in the City Center",
          unit: "204",
          image: "https://randomuser.me/api/portraits/men/22.jpg",
          gender: "Male",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 5, 
        UnitNumber: "205", 
        UnitValue: 980000,
        tenant: {
          tenant_id: "TNT-013",
          name: "Emma Stone",
          email: "emma.stone@gmail.com",
          phone: "001-223-555-9988",
          national_id: "3344556677889900",
          property: "Modern Loft in the City Center",
          unit: "205",
          image: "https://randomuser.me/api/portraits/women/62.jpg",
          gender: "Female",
          paymentStatus: "Not Yet"
        }
      },
      { 
        id: 6, 
        UnitNumber: "206", 
        UnitValue: 990000,
        tenant: {
          tenant_id: "TNT-014",
          name: "James Smith",
          email: "james.smith@hotmail.com",
          phone: "001-987-654-2311",
          national_id: "5566778899001122",
          property: "Modern Loft in the City Center",
          unit: "206",
          image: "https://randomuser.me/api/portraits/men/33.jpg",
          gender: "Male",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 7, 
        UnitNumber: "207", 
        UnitValue: 960000,
        tenant: {
          tenant_id: "TNT-015",
          name: "Sophia Clarke",
          email: "sophia.clarke@gmail.com",
          phone: "001-893-665-4332",
          national_id: "6677889900112233",
          property: "Modern Loft in the City Center",
          unit: "207",
          image: "https://randomuser.me/api/portraits/women/25.jpg",
          gender: "Female",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 8, 
        UnitNumber: "208", 
        UnitValue: 940000,
        tenant: {
          tenant_id: "TNT-016",
          name: "Michael Jordan",
          email: "michael.jordan@gmail.com",
          phone: "001-543-898-6721",
          national_id: "9988776655443322",
          property: "Modern Loft in the City Center",
          unit: "208",
          image: "https://randomuser.me/api/portraits/men/21.jpg",
          gender: "Male",
          paymentStatus: "Not Yet"
        }
      }
    ]
  },
  {
    id: 3,
    image: houseImg2,
    title: "Cozy Mountain Retreat",
    description:
      'Escape to this peaceful mountain cabin, offering a cozy retreat with panoramic views of the surrounding peaks.',
    location: "Aspen, USA",
    units: [
      { 
        id: 1, 
        UnitNumber: "301", 
        UnitValue: 450000,
        tenant: {
          tenant_id: "TNT-017",
          name: "Evelyn Grace",
          email: "evelyn.grace@gmail.com",
          phone: "001-432-897-2345",
          national_id: "1112233445566778",
          property: "Cozy Mountain Retreat",
          unit: "301",
          image: "https://randomuser.me/api/portraits/women/19.jpg",
          gender: "Female",
          paymentStatus: "Paid"
        }
      },
      { 
        id: 2, 
        UnitNumber: "302", 
        UnitValue: 500000,
        tenant: {
          tenant_id: "TNT-018",
          name: "David Lee",
          email: "david.lee@hotmail.com",
          phone: "001-346-883-2204",
          national_id: "9911223344556677",
          property: "Cozy Mountain Retreat",
          unit: "302",
          image: "https://randomuser.me/api/portraits/men/50.jpg",
          gender: "Male",
          paymentStatus: "Not Yet"
        }
      },
      { 
        id: 3, 
        UnitNumber: "303", 
        UnitValue: 480000,
        tenant: {
          tenant_id: "TNT-019",
          name: "Olivia Grey",
          email: "olivia.grey@gmail.com",
          phone: "001-576-456-7632",
          national_id: "2233445566778899",
          property: "Cozy Mountain Retreat",
          unit: "303",
          image: "https://randomuser.me/api/portraits/women/24.jpg",
          gender: "Female",
          paymentStatus: "Paid"
        }
      }
    ]
  }
];

export default properties;

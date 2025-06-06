import houseImg from "../../assets/house.jpg";
import houseImg1 from "../../assets/house1.jpg";
import houseImg2 from "../../assets/house2.jpg";

const lodges = [
  {
    id: 1,
    name: "Haven Lodge",
    location: "Downtown City Center",
    image: houseImg,
    rooms: [
      {
        id: 101,
        name: "Room 101",
        type: "Single",
        price: 50,
        isAvailable: false,
        client: {
          name: "John Doe",
          phone: "123-456-7890",
          email: "john@example.com",
          checkInDate: "2025-05-01",
          checkOutDate: "2025-05-10",
        },
      },
      {
        id: 102,
        name: "Room 102",
        type: "Double",
        price: 80,
        isAvailable: true,
        client: null,
      },
    ],
  },
  {
    id: 2,
    name: "Sunset Lodge",
    location: "Beachfront Avenue",
    image: houseImg1,
    rooms: [
      {
        id: 201,
        name: "Room 201",
        type: "Suite",
        price: 120,
        isAvailable: true,
        client: null,
      },
      {
        id: 202,
        name: "Room 202",
        type: "Double",
        price: 85,
        isAvailable: false,
        client: {
          name: "Jane Smith",
          phone: "234-567-8901",
          email: "jane@example.com",
          checkInDate: "2025-05-06",
          checkOutDate: "2025-05-12",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Hilltop Boulevard",
    image: houseImg2,
    rooms: [
      {
        id: 301,
        name: "Room 301",
        type: "Single",
        price: 45,
        isAvailable: true,
        client: null,
      },
      {
        id: 302,
        name: "Room 302",
        type: "Suite",
        price: 130,
        isAvailable: false,
        client: {
          name: "Carlos Vega",
          phone: "789-012-3456",
          email: "carlos@example.com",
          checkInDate: "2025-05-04",
          checkOutDate: "2025-05-09",
        },
      },
    ],
  },
  {
    id: 4,
    name: "Palm Grove Lodge",
    location: "Tropical Road",
    image: houseImg,
    rooms: [
      {
        id: 401,
        name: "Room 401",
        type: "Double",
        price: 70,
        isAvailable: false,
        client: {
          name: "Alice Brown",
          phone: "321-654-9870",
          email: "alice@example.com",
          checkInDate: "2025-05-02",
          checkOutDate: "2025-05-07",
        },
      },
      {
        id: 402,
        name: "Room 402",
        type: "Single",
        price: 55,
        isAvailable: true,
        client: null,
      },
    ],
  },
  {
    id: 5,
    name: "Skyline Stay",
    location: "Urban Heights",
    image: houseImg1,
    rooms: [
      {
        id: 501,
        name: "Room 501",
        type: "Suite",
        price: 150,
        isAvailable: true,
        client: null,
      },
      {
        id: 502,
        name: "Room 502",
        type: "Double",
        price: 90,
        isAvailable: true,
        client: null,
      },
    ],
  },
];


export default lodges;

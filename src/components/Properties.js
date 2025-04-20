import houseImg from "../assets/house.jpg";
import houseImg1 from "../assets/house1.jpg";
import houseImg2 from "../assets/house2.jpg";

const properties = [
  {
    id: 1,
    image: houseImg,
    title: "Cozy 5 Stars Apartment",
    description:
      'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio"...',
    units: 29,
    location: "Barcelona, Spain",
  },
  {
    id: 2,
    image: houseImg1,
    title: "Office Studio",
    description:
      'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"...',
    units: 12,
    location: "London, UK",
  },
  {
    id: 3,
    image: houseImg2,
    title: "Beautiful Castle",
    description:
      'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"...',
    units: 32,
    location: "Milan, Italy",
  },
  // Add more if needed
];

export default properties;

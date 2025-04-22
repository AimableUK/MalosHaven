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
      { id: 1, UnitNumber: "101", UnitValue: 1200000 },
      { id: 2, UnitNumber: "102", UnitValue: 1500000 },
      { id: 3, UnitNumber: "103", UnitValue: 1300000 },
      { id: 4, UnitNumber: "104", UnitValue: 1400000 },
      { id: 5, UnitNumber: "105", UnitValue: 1250000 },
      { id: 6, UnitNumber: "106", UnitValue: 1550000 },
      { id: 7, UnitNumber: "107", UnitValue: 1450000 },
      { id: 8, UnitNumber: "108", UnitValue: 1350000 },
    ],
  },
  {
    id: 2,
    image: houseImg1,
    title: "Modern Loft in the City Center",
    description:
      'A stylish loft situated in the heart of the city with easy access to cafes, shopping, and entertainment.',
    location: "New York, USA",
    units: [
      { id: 1, UnitNumber: "201", UnitValue: 850000 },
      { id: 2, UnitNumber: "202", UnitValue: 900000 },
      { id: 3, UnitNumber: "203", UnitValue: 950000 },
      { id: 4, UnitNumber: "204", UnitValue: 970000 },
      { id: 5, UnitNumber: "205", UnitValue: 980000 },
      { id: 6, UnitNumber: "206", UnitValue: 990000 },
      { id: 7, UnitNumber: "207", UnitValue: 960000 },
      { id: 8, UnitNumber: "208", UnitValue: 940000 },
    ],
  },
  {
    id: 3,
    image: houseImg2,
    title: "Cozy Mountain Retreat",
    description:
      'Escape to this peaceful mountain cabin, offering a cozy retreat with panoramic views of the surrounding peaks.',
    location: "Aspen, USA",
    units: [
      { id: 1, UnitNumber: "301", UnitValue: 450000 },
      { id: 2, UnitNumber: "302", UnitValue: 480000 },
      { id: 3, UnitNumber: "303", UnitValue: 470000 },
      { id: 4, UnitNumber: "304", UnitValue: 490000 },
      { id: 5, UnitNumber: "305", UnitValue: 520000 },
      { id: 6, UnitNumber: "306", UnitValue: 510000 },
      { id: 7, UnitNumber: "307", UnitValue: 530000 },
      { id: 8, UnitNumber: "308", UnitValue: 540000 },
    ],
  },
  {
    id: 4,
    image: houseImg,
    title: "Elegant Country Estate",
    description:
      'Set in the countryside, this estate offers wide open spaces and classic country charm with modern amenities.',
    location: "Bordeaux, France",
    units: [
      { id: 1, UnitNumber: "401", UnitValue: 800000 },
      { id: 2, UnitNumber: "402", UnitValue: 850000 },
      { id: 3, UnitNumber: "403", UnitValue: 900000 },
      { id: 4, UnitNumber: "404", UnitValue: 950000 },
      { id: 5, UnitNumber: "405", UnitValue: 1000000 },
      { id: 6, UnitNumber: "406", UnitValue: 1050000 },
      { id: 7, UnitNumber: "407", UnitValue: 1100000 },
      { id: 8, UnitNumber: "408", UnitValue: 950000 },
    ],
  },
  {
    id: 5,
    image: houseImg1,
    title: "Charming Cottage by the Lake",
    description:
      'This quaint cottage by the lake is perfect for a peaceful getaway with direct access to the water for swimming and fishing.',
    location: "Lake Tahoe, USA",
    units: [
      { id: 1, UnitNumber: "501", UnitValue: 550000 },
      { id: 2, UnitNumber: "502", UnitValue: 600000 },
      { id: 3, UnitNumber: "503", UnitValue: 625000 },
      { id: 4, UnitNumber: "504", UnitValue: 630000 },
      { id: 5, UnitNumber: "505", UnitValue: 620000 },
      { id: 6, UnitNumber: "506", UnitValue: 640000 },
      { id: 7, UnitNumber: "507", UnitValue: 660000 },
      { id: 8, UnitNumber: "508", UnitValue: 670000 },
    ],
  },
];

export default properties;

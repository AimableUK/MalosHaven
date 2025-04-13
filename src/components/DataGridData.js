export const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
  },
];

export const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 4, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 5, lastName: "Melisandre", firstName: "Lady", age: 150 },
];

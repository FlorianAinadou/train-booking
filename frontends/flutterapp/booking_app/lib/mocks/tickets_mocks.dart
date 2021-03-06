const TICKETS_MOCKS = [
  {
    "ticketId": 1,
    "customerId": 123,
    "trainId": 12,
    "departureCity": "Toulouse",
    "departureDateTime": "2020-10-22 8:40:23",
    "arrivalCity": "Nantes",
    "arrivalDateTime": "2020-10-22 10:40:23",
    "connections": [],
  },
  {
    "ticketId": 2,
    "customerId": 124,
    "trainId": 1001,
    "departureCity": "Fréjus",
    "departureDateTime": "2020-10-23 18:40:23",
    "arrivalCity": "Nantes",
    "arrivalDateTime": "2020-10-24 5:40:23",
    "connections": [
      {
        "connectionNumber": 1,
        "trainId": 2301,
        "connectionCity": "Nice",
        "arrivalDateTime": "2020-10-23 20:20:23",
        "departureDateTime": "2020-10-23 22:30:23",
      },
    ],
  },
  {
    "ticketId": 3,
    "customerId": 124,
    "trainId": 101,
    "departureCity": "Nantes",
    "departureDateTime": "2020-10-26 5:40:23",
    "arrivalCity": "Fréjus",
    "arrivalDateTime": "2020-10-26 21:20:23",
    "connections": [
      {
        "connectionNumber": 1,
        "trainId": 331,
        "connectionCity": "Nice",
        "arrivalDateTime": "2020-10-26 20:20:23",
        "departureDateTime": "2020-10-26 21:15:23",
      },
    ],
  },
  {
    "ticketId": 4,
    "customerId": 125,
    "trainId": 45,
    "departureCity": "Paris",
    "departureDateTime": "2020-10-25 20:40:23",
    "arrivalCity": "Suisse",
    "arrivalDateTime": "2020-10-26 4:10:23",
    "connections": [
      {
        "connectionNumber": 1,
        "trainId": 231,
        "connectionCity": "Bourg en Bresse",
        "arrivalDateTime": "2020-10-25 23:20:23",
        "departureDateTime": "2020-10-25 23:45:23",
      },
      {
        "connectionNumber": 2,
        "trainId": 2231,
        "connectionCity": "Nurieux",
        "arrivalDateTime": "2020-10-26 3:12:23",
        "departureDateTime": "2020-10-26 3:25:23",
      },
      {
        "connectionNumber": 3,
        "trainId": 2221,
        "connectionCity": "Bellegarde",
        "arrivalDateTime": "2020-10-26 3:45:23",
        "departureDateTime": "2020-10-26 3:50:23",
      },
    ],
  },
  {
    "ticketId": 1,
    "customerId": 123,
    "trainId": 12,
    "departureCity": "Toulouse",
    "departureDateTime": "2020-10-22 8:40:23",
    "arrivalCity": "Nantes",
    "arrivalDateTime": "2020-10-22 10:40:23",
    "connections": [],
  },
  {
    "ticketId": 2,
    "customerId": 124,
    "trainId": 1001,
    "departureCity": "Fréjus",
    "departureDateTime": "2020-10-23 18:40:23",
    "arrivalCity": "Nantes",
    "arrivalDateTime": "2020-10-24 5:40:23",
    "connections": [
      {
        "connectionNumber": 1,
        "trainId": 2301,
        "connectionCity": "Nice",
        "arrivalDateTime": "2020-10-23 20:20:23",
        "departureDateTime": "2020-10-23 22:30:23",
      },
    ],
  },
  {
    "ticketId": 3,
    "customerId": 124,
    "trainId": 101,
    "departureCity": "Nantes",
    "departureDateTime": "2020-10-26 5:40:23",
    "arrivalCity": "Fréjus",
    "arrivalDateTime": "2020-10-26 21:20:23",
    "connections": [
      {
        "connectionNumber": 1,
        "trainId": 331,
        "connectionCity": "Nice",
        "arrivalDateTime": "2020-10-26 20:20:23",
        "departureDateTime": "2020-10-26 21:15:23",
      },
    ],
  },
  {
    "ticketId": 4,
    "customerId": 125,
    "trainId": 45,
    "departureCity": "Paris",
    "departureDateTime": "2020-10-25 20:40:23",
    "arrivalCity": "Suisse",
    "arrivalDateTime": "2020-10-26 4:10:23",
    "connections": [
      {
        "connectionNumber": 1,
        "trainId": 231,
        "connectionCity": "Bourg en Bresse",
        "arrivalDateTime": "2020-10-25 23:20:23",
        "departureDateTime": "2020-10-25 23:45:23",
      },
      {
        "connectionNumber": 2,
        "trainId": 2231,
        "connectionCity": "Nurieux",
        "arrivalDateTime": "2020-10-26 3:12:23",
        "departureDateTime": "2020-10-26 3:25:23",
      },
      {
        "connectionNumber": 3,
        "trainId": 2221,
        "connectionCity": "Bellegarde",
        "arrivalDateTime": "2020-10-26 3:45:23",
        "departureDateTime": "2020-10-26 3:50:23",
      },
    ],
  },
];

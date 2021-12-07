import gql from 'graphql-tag';

export const GET_ALL_CARS = gql`
  query GetCars {
    cars {
      id
      name
      dailyPrice
      monthlyPrice
      mileage
      gas
      gearType
      thumbnailUrl
    }
  }
`;

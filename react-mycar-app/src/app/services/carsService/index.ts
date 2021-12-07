import { GetCars_cars } from './__generated__/GetCars';
import { apolloClient } from '../../graphql';
import { GET_ALL_CARS } from './queries';

class CarService {
  public async getCars(): Promise<GetCars_cars[]> {
    const response = await apolloClient
      .query({ query: GET_ALL_CARS })
      .catch((err) => {
        throw err;
      });

    if (response && response.data && response.data.cars)
      return response.data.cars as GetCars_cars[];

    return [];
  }
}

export default new CarService();

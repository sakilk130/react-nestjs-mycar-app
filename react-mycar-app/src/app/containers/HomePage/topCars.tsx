import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ICar } from '../../../typings/car';
import Car from '../../components/car';
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../components/responsive';
import carsService from '../../services/carsService';
const TopCarsContainer = styled.div`
  ${tw`
  max-w-screen-lg
  w-full
  flex
  flex-col
  items-center
  justify-center
  pr-4
  pl-4
  md:pl-0
  md:pr-0
  mb-10
  `}
`;

const Title = styled.div`
  ${tw`
  text-3xl
  lg:text-5xl
  text-black
  font-extrabold
  `}
`;

const CarsContainer = styled.div`
  ${tw`
  w-full
  flex
  flex-wrap
  justify-center
  mt-7
  md:mt-10
  `}
`;

function TopCars() {
  const [current, setCurrent] = useState(3);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const fetchTopCars = async () => {
    const cars = await carsService.getCars().catch((err) => {
      console.log('ERROR', err);
    });
    console.log(cars);
  };

  const testCar: ICar = {
    name: 'Audi S3 Car',
    mileage: '10k',
    thumbnailSrc:
      'https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg',
    dailyPrice: 70,
    monthlyPrice: 1600,
    gearType: 'Auto',
    gas: 'Petrol',
  };

  const testCar2: ICar = {
    name: 'HONDA cITY 5 Seater Car',
    mileage: '20k',
    thumbnailSrc:
      'https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg',
    dailyPrice: 50,
    monthlyPrice: 1500,
    gearType: 'Auto',
    gas: 'Petrol',
  };

  useEffect(() => {
    fetchTopCars();
  }, []);

  const cars = [
    <Car {...testCar} />,
    <Car {...testCar2} />,
    <Car {...testCar2} />,
    <Car {...testCar2} />,
    <Car {...testCar2} />,
  ];
  const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

  return (
    <TopCarsContainer>
      <Title>Explore Our Top Deals</Title>
      <CarsContainer>
        <Carousel
          value={current}
          onChange={setCurrent}
          slides={cars}
          plugins={[
            'clickToChange',
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 3,
              },
            },
          ]}
          breakpoints={{
            640: {
              plugins: [
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 1,
                  },
                },
              ],
            },
            900: {
              plugins: [
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 2,
                  },
                },
              ],
            },
          }}
        />
        <Dots value={current} onChange={setCurrent} number={numberOfDots} />
      </CarsContainer>
    </TopCarsContainer>
  );
}

export default TopCars;

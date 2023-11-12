import React from 'react';
import { Banner } from './Banner';
import FavoriteMusic from './FavoriteMusic';
import BestSeller from './BestSeller';
import OtherBooks from './OtherBooks';
import PromoBanner from './PromoBanner';
import FooterMain from '../shared/FooterMain';

export const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSeller/>
      {/* <FavoriteMusic/> */}
      <PromoBanner/>
      <OtherBooks/>
      <FooterMain />
    </div>
  )
}

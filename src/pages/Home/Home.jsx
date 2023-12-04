import React from 'react';
import { Banner } from './Banner';
import PromoBanner from './PromoBanner';
import FooterMain from '../shared/FooterMain';

export const Home = () => {
  return (
    <div>
      <Banner/>
      <PromoBanner/>
      <FooterMain />
    </div>
  )
}

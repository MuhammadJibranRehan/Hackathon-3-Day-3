// src/app/page.tsx

import BlogSection from '@/components/BlogSection';
import Discount from '@/components/Discount';
import FeaturedProducts from '@/components/Feautreprod';
import Hero from '@/components/Hero';
import LatestProducts from '@/components/LatestProducts';
import Newslater from '@/components/Newslater';
import Offer from '@/components/Offers';
import TopCategories from '@/components/TopCategories';
import TrendingProducts from '@/components/TrendingProducts';
import Unique from '@/components/Unique';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedProducts />
      <LatestProducts />
      <Offer />
      <Unique />
      <TrendingProducts />
      <Discount />
      <TopCategories />
      <Newslater />
      <BlogSection />
    </div>
  );
}

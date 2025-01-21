'use client';

import React, { useEffect, useState } from 'react';
import { Image as IImage } from 'sanity';
import { Wrapper } from '@/components/Shared/Wrapper';
import { client } from '../../sanity/lib/client';
import ProductCard from '@/components/Shared/ProductCard';
import Heading from '@/components/Shared/Heading';

interface IProducts {
  title: string;
  price: number;
  discount: number;
  image: IImage[];
  description: string;
  care: string;
  _id: string;
  slug: { current: string };
  category: {
    name: string;
  };
}

const getFeaturedProducts = async (): Promise<IProducts[]> => {
  const res = await client.fetch(`*[_type == "products"]{
    _id,
    title,
    price,
    discount,
    image,
    description,
    category->{
      name
    },
    care,
    "slug": slug.current
  }`);
  return res;
};

const AllProducts = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getFeaturedProducts();
      setProducts(result);
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <Wrapper>
        <Heading txt={'Product'} />
        <div className="flex flex-wrap mt-8 gap-10 mx-5 lg:mx-28 justify-around items-center text-center">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              _id={item._id}
              title={item.title}
              price={item.price}
              discount={item.discount}
              image={item.image}
              slug={item.slug.current}
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default AllProducts;

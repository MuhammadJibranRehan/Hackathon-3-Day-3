'use client';
import { Wrapper } from '@/components/Shared/Wrapper';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Image as IImage } from 'sanity';
import { client } from '../../../sanity/lib/client';
import SingleProduct from './SingleProduct';

interface IProducts {
  slug: { current: string };
  title: string;
  price: number;
  discount: number;
  image: IImage[];
  description: string;
  care: string;
  category: {
    name: string;
  };
  _id: string;
}

const getFeaturedProducts = async (): Promise<IProducts[]> => {
  const res = await client.fetch(`*[_type=="products"]{
    _id,
    title,
    price,
    discount,
    image,
    description,
    care,
    category->{
      name
    },
    "slug":slug.current
  }`);
  return res;
};

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const [productDetails, setProductDetails] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const products = await getFeaturedProducts();
      const filteredProducts = products.filter(
        (product) => product.slug.current === params.slug
      );
      setProductDetails(filteredProducts);
    };
    fetchProductDetails();
  }, [params.slug]);

  return (
    <Wrapper>
      <div className="bg-[#E7E4F8] py-6 mt-14 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-[#1A0B5B] font-bold font-serif capitalize">
          Product Information
        </h1>
        <p className="text-[#FB2E86] font-sans font-semibold mt-5">
          Best Furniture For Your Castle...
        </p>
      </div>
      <div>
        {productDetails.length > 0 ? (
          productDetails.map((item) => (
            <SingleProduct
              key={item._id}
              _id={item._id}
              title={item.title}
              price={item.price}
              discount={item.discount}
              image={item.image}
              slug={item.slug.current}
              description={item.description}
              care={item.care}
              category={{ name: item.category.name }}
            />
          ))
        ) : (
          <p className="flex justify-center items-center py-12">
            No Product Found
          </p>
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={4}
        containerClassName="absolute top-0"
        containerStyle={{}}
        toastOptions={{
          className: 'slide-toast',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Wrapper>
  );
};

export default ProductDetails;

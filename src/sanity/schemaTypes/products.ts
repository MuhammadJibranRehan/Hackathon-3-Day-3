import { defineField, defineType } from 'sanity';

export const products = defineType({
  name: 'products',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Product Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'price',
      title: 'Product Price',
      type: 'number',
    },
    {
      name: 'discount',
      title: 'After Discount',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'string',
    },
    {
      name: 'care',
      title: 'Product Care',
      type: 'string',
    },
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
  ],
});

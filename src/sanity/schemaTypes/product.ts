import { defineType } from 'sanity';

const productSchema = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'The name of the product.',
      validation: (Rule) => Rule.required().error('Name is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) =>
        Rule.max(150).warning('Keep the description under 150 characters.'),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      description: 'Upload an image of the product.',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule) => Rule.required().error('Price is required'),
    },
    {
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
      validation: (Rule) =>
        Rule.min(0).max(100).warning('Discount must be between 0 and 100.'),
    },
    {
      name: 'isFeaturedProduct',
      type: 'boolean',
      title: 'Is Featured Product',
      description: 'Mark this product as featured to highlight it.',
    },
    {
      name: 'stockLevel',
      type: 'number',
      title: 'Stock Level',
      validation: (Rule) =>
        Rule.min(0).error('Stock level must be a positive number.'),
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      title: 'Category',
      validation: (Rule) => Rule.required().error('Category is required'),
    },
  ],
});

export default productSchema;

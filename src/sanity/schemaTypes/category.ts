import { Rule } from '@sanity/types';

const categorySchema = {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: Rule) =>
        Rule.max(150).warning('Keep the description under 150 characters.'),
    },
  ],
};

export default categorySchema;

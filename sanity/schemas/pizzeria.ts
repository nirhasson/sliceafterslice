import { defineType, defineField } from 'sanity'
import { PinIcon } from '@sanity/icons'

const pizzeria = defineType({
  name: 'pizzeria',
  title: 'פיצרייה',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'שם הפיצרייה',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'אזור',
      type: 'string',
      options: {
        list: [
          { title: 'צפון', value: 'north' },
          { title: 'מרכז', value: 'center' },
          { title: 'דרום', value: 'south' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'עיר',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'כתובת',
      type: 'string',
    }),
    defineField({
      name: 'lat',
      title: 'קו רוחב (Latitude)',
      description: 'מגוגל מפס — לחץ ימני על המקום ← העתק קורדינטות',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lng',
      title: 'קו אורך (Longitude)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hours',
      title: 'שעות פתיחה',
      type: 'string',
      description: 'לדוגמה: ראשון–חמישי 12:00–22:00, שישי סגור',
    }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'specialties',
      title: 'התמחויות',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'tags',
      title: 'תגיות',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'instagram',
      title: 'אינסטגרם',
      type: 'url',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'קישור גוגל מפס',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'אזור',
      name: 'regionAsc',
      by: [{ field: 'region', direction: 'asc' }],
    },
  ],
})

export default pizzeria

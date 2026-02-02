import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  type: 'document',
  title: 'כתבה',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'כותרת',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'מזהה URL',
      description: 'לחץ "Generate" ליצירה אוטומטית',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'תקציר',
      description: 'תיאור קצר שיופיע בעמוד הבלוג',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'תמונת שער',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'קטגוריה',
    }),
    defineField({
      name: 'readTime',
      type: 'number',
      title: 'זמן קריאה (דקות)',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'תגיות',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'תוכן',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'תאריך פרסום',
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        { 
          name: 'metaTitle', 
          type: 'string', 
          title: 'Meta Title',
          description: 'כותרת לקידום אתרים (50-60 תווים)',
          validation: (Rule) => Rule.max(60)
        },
        { 
          name: 'metaDescription', 
          type: 'text', 
          title: 'Meta Description',
          description: 'תיאור לקידום אתרים (150-160 תווים)',
          rows: 3,
          validation: (Rule) => Rule.max(160)
        },
        { 
          name: 'ogImage', 
          type: 'image', 
          title: 'תמונה לשיתוף ברשתות חברתיות',
          description: 'תמונה שתופיע בשיתוף בפייסבוק/טוויטר',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'mainImage',
    },
  },
})

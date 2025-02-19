import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'A catchy headline for your about page',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      description: 'A brief introduction (160 characters)',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  'Frontend',
                  'Backend',
                  'DevOps',
                  'Design',
                  'Tools',
                  'Soft Skills',
                ],
              },
            },
            {
              name: 'items',
              title: 'Skills',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
            },
            {
              name: 'current',
              title: 'Current Position',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Degree',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'fieldOfStudy',
              title: 'Field of Study',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
            },
            {
              name: 'current',
              title: 'Currently Studying',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'object',
      fields: [
        {
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              'Available for work',
              'Open to opportunities',
              'Not available',
              'Building a business',
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'details',
          title: 'Additional Details',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  'GitHub',
                  'LinkedIn',
                  'Twitter',
                  'Instagram',
                  'YouTube',
                  'Medium',
                  'Dev.to',
                  'Other',
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume/CV File',
      type: 'file',
      description: 'Upload your resume/CV (PDF format)',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing',
        },
      ],
    }),
  ],
})

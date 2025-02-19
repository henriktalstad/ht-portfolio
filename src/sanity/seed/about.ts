import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, 
  apiVersion: '2024-02-19',
  useCdn: false,
})

const aboutContent = {
  _type: 'about',
  name: 'Henrik Talstad',
  role: 'Entrepreneur & Full Stack Developer',
  headline: 'Building the next data-driven tool for commercial real estate companies with a focus on innovation and user experience',
  shortBio: 'Founder & CEO @ Scoped Solutions, specializing in data-driven applications and AI solutions. M.Sc. student at NTNU School of Entrepreneurship with a background in Cybernetics and Robotics.',
  longBio: 'As an entrepreneur and full-stack developer, I\'m passionate about creating innovative solutions that solve real-world problems. With a strong foundation in Cybernetics and Robotics from NTNU, I combine technical expertise with entrepreneurial vision. At Scoped Solutions, I\'m leading the development of data-driven tools for the commercial real estate industry, leveraging modern technologies and AI to create efficient, user-friendly solutions. My expertise spans from system architecture and AI implementation to business development and project management.',
  skills: [
    'Next.js',
    'TypeScript',
    'Node.js',
    'C++',
    'AWS',
    'Docker',
    'Python',
    'GraphQL',
    'Tailwind CSS',
    'PostgreSQL',
    'Azure',
    'Artificial Intelligence',
    'Machine Learning',
    'Git',
    'CI/CD',
    'Cloud Architecture',
    'System Design',
    'Project Management',
    'UI/UX Design',
    'Robotics',
    'Control Systems'
  ],
  experience: [
    {
      company: 'Scoped Solutions',
      role: 'CEO & Founder',
      startDate: '2024-09-01',
      description: 'Leading the development of data-driven tools for commercial real estate companies, focusing on strategic growth and product vision.',
    },
    {
      company: 'Scoped Solutions',
      role: 'CTO & Founder',
      startDate: '2024-01-01',
      endDate: '2024-09-01',
      description: 'Led technical development for the company in an early stage.',
    },
    {
      company: 'Artigboks.no',
      role: 'Market Lead & Co-Founder',
      startDate: '2023-12-01',
      description: 'Leading market strategy and development for activity equipment rentals in parks.',
    },
    {
      company: 'NTNU',
      role: 'Teaching Assistant - Entrepreneurship',
      startDate: '2024-08-01',
      endDate: '2024-12-01',
      description: 'TIØ4331 - Entrepreneurial Opportunities and Market Research. Guiding students through entrepreneurship concepts and market analysis.',
    },
    {
      company: 'NTNU',
      role: 'Teaching Assistant - Control Systems',
      startDate: '2023-06-01',
      endDate: '2023-12-01',
      description: 'TTK4215 - Adaptive Control. Assisting students with advanced control system concepts and laboratory work.',
    },
    {
      company: 'NTNU',
      role: 'Teaching Assistant - Modeling & Simulation',
      startDate: '2023-01-01',
      endDate: '2023-05-01',
      description: 'TTK4130 - Modeling and Simulation. Supporting students in mathematical modeling and simulation techniques.',
    },
    {
      company: 'TERRAVERA Foundation',
      role: 'Model Developer',
      startDate: '2022-12-01',
      endDate: '2023-12-01',
      description: 'Developed models for sustainable decision-making at a non-profit tech foundation focused on environmental impact.',
    },
    {
      company: 'Shift Hyperloop',
      role: 'Sensor Engineer - Levitation R&D',
      startDate: '2021-09-01',
      endDate: '2022-08-01',
      description: 'Developed sensor systems for Scandinavia\'s first hyperloop pod, working with a student-driven team at NTNU.',
    }
  ],
  education: [
    {
      institution: 'NTNU School of Entrepreneurship',
      degree: 'Master of Science in Entrepreneurship',
      startDate: '2023-08-01',
      endDate: '2025-06-01', 
      description: 'Focusing on technology entrepreneurship, business development, and innovation management. Working on developing Scoped Solutions as part of the program.',
    },
    {
      institution: 'Boston University',
      degree: 'Graduate Program in Applied Entrepreneurship',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: '10-week summer program in Boston through Gründerskolen. Intensive study of entrepreneurship and innovation in a global context.',
    },
    {
      institution: 'Norwegian University of Science and Technology (NTNU)',
      degree: 'Master of Science in Cybernetics and Robotics',
      startDate: '2019-08-01',
      endDate: '2025-06-01', 
      description: 'Specializing in robotics, control systems, and artificial intelligence. Strong focus on mathematical modeling and system design.',
    }
  ],
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/henriktalstad'
    },
    {
      platform: 'linkedin',
      url: 'https://no.linkedin.com/in/henrik-talstad-7b6909245'
    },
    {
      platform: 'email',
      url: 'mailto:henrik.talstad@gmail.com'
    }
  ]
}

export async function seedAbout() {
  try {
    // Delete existing about documents
    await client.delete({ query: '*[_type == "about"]' })
    
    // Upload the profile image from URL
    const imageUrl = 'https://cdn.sanity.io/images/vc0mg63q/production/4053ddce7b7db89065cf759d3db227d0cccf4389-1080x721.webp?fit=max&w=500&h=500'
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()
    const imageAsset = await client.assets.upload('image', Buffer.from(imageBuffer), {
      filename: 'henrik.webp'
    })
    
    // Update the content with the new image reference
    const contentWithImage = {
      ...aboutContent,
      profileImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      }
    }
    
    // Create new about document
    const document = await client.create(contentWithImage)
    console.log('About document created:', document._id)
  } catch (error) {
    console.error('Failed to seed about content:', error)
    throw error
  }
}

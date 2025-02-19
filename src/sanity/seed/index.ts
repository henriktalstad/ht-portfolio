import { seedAbout } from './about'

export async function seedAll() {
  console.log('🌱 Seeding data...')
  
  try {
    await seedAbout()
    console.log('✅ Seeding completed successfully')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAll()
}

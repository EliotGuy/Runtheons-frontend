import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-10',
  useCdn: process.env.NODE_ENV === 'production',
})

// Helper function to generate image URLs
export const urlFor = (source: any) => {
  return source
}

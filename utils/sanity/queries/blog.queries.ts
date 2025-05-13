import groq from 'groq';
import { client } from '../../../../client';

export const fetchBlogPosts = async () => {
  const blogs = await client.fetch(
    groq`
    *[_type == "blogPost" ]{
      _id,
      "slug": seo.slug.current,
      title,
      "featuredImage": featuredImage.asset->url,
      author[]-> { _id, firstName, lastName, "headshot": headshot.asset->url },
      excerpt,
      publishDate,
      blogCategories{
        blogCategory-> { _id, name, slug },
      },
    }`,
  );
  return blogs;
};

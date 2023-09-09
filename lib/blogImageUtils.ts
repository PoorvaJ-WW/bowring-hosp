// Fixed blogImageUtils.ts for generated sites
import { db } from './firebase';
import { doc, updateDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';

// Debug flag for blog image operations
const DEBUG = true;

// Cache for image URLs to avoid duplicate requests
const imageCache = {};

/**
 * Generate a search term based on blog post content
 */
export function getBlogSearchTerm(
  title = '', 
  tags = [], 
  excerpt = ''
) {
  // Skip common words that don't make good search terms
  const skipWords = [
    'the', 'and', 'or', 'of', 'to', 'in', 'for', 'a', 'an', 'is', 'was',
    'that', 'this', 'with', 'by', 'on', 'at', 'from', 'when', 'why', 'how'
  ];
  
  // First try to use the first tag if available (often most relevant)
  if (tags && tags.length > 0) {
    return tags[0].trim();
  }
  
  // If no tags, extract keywords from title
  if (title) {
    // Split by spaces and punctuation
    const words = title
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !skipWords.includes(word.toLowerCase()));
    
    if (words.length > 0) {
      // Return the most meaningful word (often the longest)
      return words.sort((a, b) => b.length - a.length)[0];
    }
  }
  
  // If title doesn't have good keywords, try excerpt
  if (excerpt) {
    const words = excerpt
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !skipWords.includes(word.toLowerCase()));
    
    if (words.length > 0) {
      // Return the most meaningful word
      return words.sort((a, b) => b.length - a.length)[0];
    }
  }
  
  // Use a default set of good-looking image searches for blog posts
  const fallbackTerms = [
    'minimal workspace', 'journal writing', 'blogging', 'workspace',
    'coffee notebook', 'blog inspiration', 'writing desk', 'notebook pen',
    'minimalist desktop', 'bookshelf aesthetic'
  ];
  
  return fallbackTerms[Math.floor(Math.random() * fallbackTerms.length)];
}

/**
 * Get an Unsplash image URL for a blog post using direct images.unsplash.com URLs
 * This approach avoids redirects and is more reliable in img tags
 */
export async function getUnsplashImage(
  searchTerm = '',
  width = 1200,
  height = 630
) {
  try {
    if (!searchTerm) {
      searchTerm = 'minimal blog'; // Default search if none provided
    }
    
    // Clean and encode the search term
    const cleanedTerm = encodeURIComponent(searchTerm.trim().toLowerCase());
    
    // Create a cache key for this request
    const cacheKey = `${cleanedTerm}_${width}x${height}`;
    
    // Return cached URL if available
    if (imageCache[cacheKey]) {
      if (DEBUG) console.debug(`Using cached Unsplash image for "${searchTerm}"`);
      return imageCache[cacheKey];
    }
    
    // Use a predefined set of high-quality Unsplash image URLs
    // These correspond to professional, versatile images that work well for blogs
    const reliableImageUrls = [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=${width}&h=${height}&fit=crop&crop=faces', // professional headshot
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=${width}&h=${height}&fit=crop&crop=entropy', // laptop on desk
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=${width}&h=${height}&fit=crop&crop=entropy', // notebook and coffee
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=${width}&h=${height}&fit=crop&crop=entropy', // bookshelf
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=${width}&h=${height}&fit=crop&crop=entropy', // notebook with phone
      'https://images.unsplash.com/photo-1519219788971-8d9797e0928e?w=${width}&h=${height}&fit=crop&crop=entropy', // writing desk
      'https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?w=${width}&h=${height}&fit=crop&crop=entropy', // laptop with coffee
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=${width}&h=${height}&fit=crop&crop=entropy', // desk with notebook
      'https://images.unsplash.com/photo-1550592704-6c76defa9985?w=${width}&h=${height}&fit=crop&crop=entropy', // library
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=${width}&h=${height}&fit=crop&crop=entropy', // open book
      'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=${width}&h=${height}&fit=crop&crop=entropy', // workspace
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=${width}&h=${height}&fit=crop&crop=entropy', // journals
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=${width}&h=${height}&fit=crop&crop=entropy', // laptop and coffee
      'https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=${width}&h=${height}&fit=crop&crop=entropy', // typewriter
      'https://images.unsplash.com/photo-1560415755-bd80d06eda60?w=${width}&h=${height}&fit=crop&crop=entropy', // plant with book
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=${width}&h=${height}&fit=crop&crop=entropy', // modern office
      'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=${width}&h=${height}&fit=crop&crop=entropy', // notebook
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=${width}&h=${height}&fit=crop&crop=entropy'  // desk setup
    ];
    
    // Use the search term as a seed to select an image URL
    // This ensures consistent image selection for the same search term
    const seed = cleanedTerm.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const imageTemplate = reliableImageUrls[seed % reliableImageUrls.length];
    
    // Replace the template values with actual dimensions
    const directUrl = imageTemplate.replace('${width}', width.toString()).replace('${height}', height.toString());
    
    if (DEBUG) console.log(`Using direct Unsplash image for "${searchTerm}": ${directUrl}`);
    
    // Cache the result for future use
    imageCache[cacheKey] = directUrl;
    
    return directUrl;
  } catch (error) {
    console.error(`Error in getUnsplashImage:`, error);
    
    // Return a default placeholder image if all else fails
    return `https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=${width}&h=${height}&fit=crop&crop=entropy&q=80`;
  }
}

/**
 * Generate images for an array of blog posts
 */
export async function generateBlogImages(
  posts = []
) {
  const imageUrls = {};
  
  if (DEBUG) console.log(`Generating images for ${posts.length} blog posts`);
  
  // Process posts sequentially to avoid overwhelming the Unsplash API
  for (const post of posts) {
    if (!post.id) continue;
    
    // Skip posts that already have images
    if (post.imageUrl) {
      imageUrls[post.id] = post.imageUrl;
      continue;
    }
    
    try {
      const searchTerm = getBlogSearchTerm(post.title, post.tags, post.excerpt);
      if (DEBUG) console.debug(`Using search term "${searchTerm}" for post: ${post.title}`);
      
      const imageUrl = await getUnsplashImage(searchTerm);
      imageUrls[post.id] = imageUrl;
      
      // Small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error generating image for post ${post.id}:`, error);
    }
  }
  
  if (DEBUG) console.log(`Generated ${Object.keys(imageUrls).length} blog post images`);
  return imageUrls;
}

/**
 * Save generated image URLs to the Firestore database
 * This ensures images persist between sessions and don't need to be regenerated each time
 */
export async function saveBlogImagesInDatabase(
  posts = [],
  collectionName = 'user_blogs'
) {
  try {
    const postsWithImages = posts.filter(post => post.id && post.imageUrl);
    
    if (postsWithImages.length === 0) {
      if (DEBUG) console.debug('No posts with images to save to database');
      return [];
    }
    
    if (DEBUG) console.log(`Saving ${postsWithImages.length} blog post images to database`);
    
    // Process each post update
    const updatePromises = postsWithImages.map(async (post) => {
      try {
        // Get document reference
        const docRef = doc(db, collectionName, post.id);
        
        // Update only the imageUrl field
        await updateDoc(docRef, {
          imageUrl: post.imageUrl,
          // Add a timestamp to track when the image was added
          imageAddedAt: new Date().toISOString()
        });
        
        if (DEBUG) console.log(`Successfully saved image for post ${post.id}`);
        return { id: post.id, success: true };
      } catch (error) {
        console.error(`Error updating post ${post.id}:`, error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return { id: post.id, success: false, error };
      }
    });
    
    // Wait for all updates to complete
    const results = await Promise.all(updatePromises);
    
    // Count successes and failures
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.length - successCount;
    
    if (DEBUG) console.log(`Database update complete: ${successCount} successful, ${failureCount} failed`);
    
    if (failureCount > 0) {
      const failedIds = results.filter(r => !r.success).map(r => r.id);
      console.error('Failed to update the following post IDs:', failedIds);
    }
    
    return results;
  } catch (error) {
    console.error('Error saving blog images to database:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return [];
  }
}
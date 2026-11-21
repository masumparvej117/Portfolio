// Vercel Web Analytics Integration
import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject({
  mode: 'auto', // Automatically detect environment
  debug: false, // Set to true for debugging
});

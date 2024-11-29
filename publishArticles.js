const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');

// Load API Key and Endpoint from Environment
const apiKey = process.env.API_TOKEN;
const apiEndpoint = process.env.API_ENDPOINT;

if (!apiKey || !apiEndpoint) {
  console.error("API_TOKEN or API_ENDPOINT is not set");
  process.exit(1);
}

// Define the articles directory
const articlesDir = './articles';

// Ensure the articles directory exists
if (!fs.existsSync(articlesDir)) {
  console.error(`Directory '${articlesDir}' does not exist.`);
  process.exit(1);
}

// Get all Markdown files in the articles directory
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));

if (files.length === 0) {
  console.warn("No Markdown files found in the 'articles' directory.");
  process.exit(0); // Exit gracefully if no articles are found
}

const skippedArticles = [];
const publishedArticles = [];

(async () => {
  for (const file of files) {
    try {
      const filePath = path.join(articlesDir, file);
      // Read and parse the Markdown file
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: markdownContent } = matter(content);

      // Validate required fields in metadata
      const requiredFields = ['title', 'description', 'author', 'date', 'tags'];
      for (const field of requiredFields) {
        if (!data[field]) {
          console.error(`Missing required field '${field}' in ${file}`);
          process.exit(1);
        }
      }

      // Prepare the payload
      const payload = {
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
        author: data.author,
        content: markdownContent
      };

      // Submit the article to the API
      const response = await axios.post(apiEndpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        }
      });

      console.log(`Successfully published ${file}:`, response.data);
      publishedArticles.push(file);

    } catch (error) {
      if (error.response?.status === 409) {
        console.warn(`Article already exists: ${file}`);
        skippedArticles.push(file);
      } else {
        console.error(`Failed to publish ${file}:`, error.response?.data || error.message);
        process.exit(1); // Stop the workflow on critical errors
      }
    }
  }

  console.log("Published Articles:", publishedArticles);
  console.log("Skipped Articles (Already Exist):", skippedArticles);
})();

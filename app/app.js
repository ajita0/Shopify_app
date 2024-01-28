const express = require('express');
const dotenv = require('dotenv');
const Shopify = require('shopify-api-node');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const shopify = new Shopify({
  shopName: 'your-shop-name.myshopify.com',
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_SECRET,
  apiVersion: process.env.SHOPIFY_API_VERSION,
});

app.get('/best-selling-products', async (req, res) => {
  try {
    const products = await shopify.product.list({ limit: 5, order: 'best-selling' });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/most-valuable-customers', async (req, res) => {
  try {
    const customers = await shopify.customer.list({ limit: 5, order: 'total_spent desc' });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const { 
  getTransactions, 
  getCombinedData
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/get-data', getCombinedData);

module.exports = router;

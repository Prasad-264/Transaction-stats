const axios = require('axios');
const Transaction = require('../models/Transaction');

const seedDatabase = async () => {
  try {
    const count = await Transaction.countDocuments();
    if (count > 0) {
      console.log('Database already seeded');
      return;
    }

    const response = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    );
    const transactions = response.data;

    await Transaction.insertMany(transactions);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

const getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const searchRegex = new RegExp(search, 'i');
  const searchNumber = parseFloat(search);

  const query = {
    $or: [{ title: searchRegex }, { description: searchRegex }],
  };

  if (!isNaN(searchNumber)) {
    query.$or.push({ price: searchNumber });
  }

  if (month) {
    const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
    query.$expr = {
      $eq: [{ $month: '$dateOfSale' }, monthIndex],
    };
  }

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error in transaction: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStatistics = async (monthIndex) => {
  try {
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] },
          sold: true,
        },
      },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] },
      sold: true,
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] },
      sold: false,
    });

    return {
      totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].total : 0,
      totalSoldItems,
      totalNotSoldItems,
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

const getBarChartData = async (monthIndex) => {
  try {
    // Define boundaries for price ranges
    const boundaries = [100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity];

    // Aggregate transactions based on price range buckets
    const barChartData = await Transaction.aggregate([
      {
        $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] } },
      },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: boundaries,
          default: '901-above',
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    // Create formatted data with all price ranges, including those with count 0
    const formattedData = boundaries.map((upperBound, index) => {
      const lowerBound = index > 0 ? boundaries[index - 1] + 1 : 0;
      const label =
        upperBound === Infinity ? '901-above' : `${lowerBound} - ${upperBound}`;
      const matchedEntry = barChartData.find(
        (entry) =>
          entry._id >= lowerBound &&
          (upperBound === Infinity || entry._id <= upperBound)
      );
      return {
        priceRange: label,
        count: matchedEntry ? matchedEntry.count : 0,
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    throw error;
  }
};


const getPieChartData = async (monthIndex) => {
  try {
    const pieChartData = await Transaction.aggregate([
      {
        $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] } },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedData = pieChartData.map((entry) => ({
      category: entry._id,
      count: entry.count,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    throw error;
  }
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;

  try {
    const [statistics, barChartData, pieChartData] = await Promise.all([
      getStatistics(monthIndex),
      getBarChartData(monthIndex),
      getPieChartData(monthIndex),
    ]);

    const combinedData = {
      statistics,
      barChartData,
      pieChartData,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  seedDatabase,
  getTransactions,
  getCombinedData,
};

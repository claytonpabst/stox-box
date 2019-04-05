import axios from 'axios';

export const getCurrentDay = async (search, cb) => {
  const urlEnd = `/chart/1d?chartInterval=5`;
  let stocks = await fireStockApi(search, urlEnd);
  cb(stocks);
};

export const getThreeMonth = async (search, cb) => {
  const urlEnd = `/chart/3m`;
  const stocks = await fireStockApi(search, urlEnd);
  cb(stocks);
};

export const getOneYear = async (search, cb) => {
  const urlEnd = `/chart/1y`;
  const stocks = await fireStockApi(search, urlEnd);
  cb(stocks);
};

async function fireStockApi(search, urlEnd) {
  let stocks = [];
  let apiRequests = search
    .replace(/\s/g, '')
    .split(',')
    .filter((symbol) => {
      return symbol.length;
    })
    .map((symbol) => {
      stocks.push({ symbol });
      return axios(`https://api.iextrading.com/1.0/stock/${symbol}${urlEnd}`);
    });

  const stocksRes = await Promise.all(apiRequests);
  stocksRes.forEach((stockRes, i) => {
    stocks[i].data = stockRes.data;
  });
  return stocks;
}

export function formatCurrentDayStocksForGraph(rawStocks) {
  if (rawStocks.length) {
    let formatted = [];
    rawStocks.forEach((stock, i) => {
      stock.data.forEach((interval, j) => {
        if (!formatted[j]) formatted.push({});
        formatted[j].name = interval.label;
        formatted[j][stock.symbol.toUpperCase()] = interval.marketAverage;
      });
    });
    formatted.length = formatted.length - 3;
    return formatted;
  }
  return [];
}

export function formatMultiDayStocksForGraph(rawStocks) {
  console.log(JSON.stringify(rawStocks));
  if (rawStocks.length) {
    let formatted = [];
    rawStocks.forEach((stock, i) => {
      stock.data.forEach((interval, j) => {
        if (!formatted[j]) formatted.push({});
        formatted[j].name = interval.label;
        formatted[j][stock.symbol.toUpperCase()] = interval.close;
      });
    });
    console.log(JSON.stringify(formatted));
    return formatted;
  }
  return [];
}

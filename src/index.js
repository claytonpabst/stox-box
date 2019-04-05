import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import StockChart from './Components/StockChart';
import StockSearch from './Components/StockSearch';
import './styles.css';

import {
  getCurrentDay,
  getThreeMonth,
  getOneYear,
  formatCurrentDayStocksForGraph,
  formatMultiDayStocksForGraph,
} from './apiUtil';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentDayStocks: [],
      threeMonthStocks: [],
      oneYearStocks: [],
    };
    this.search = 'FB,';
    this.activeTab = 'Current Day';
  }

  getStockData = async (search, newStocksNeeded) => {
    if (newStocksNeeded) {
      await this.setState({
        currentDayStocks: [],
        threeMonthStocks: [],
        oneYearStocks: [],
      });
    }
    this.search = search;
    if (this.activeTab === 'Current Day' && !this.state.currentDayStocks[0]) {
      getCurrentDay(search, (currentDayStocks) => {
        currentDayStocks = formatCurrentDayStocksForGraph(currentDayStocks);
        this.setState({ currentDayStocks });
      });
    }
    if (this.activeTab === '3 Months' && !this.state.threeMonthStocks[0]) {
      getThreeMonth(search, (threeMonthStocks) => {
        threeMonthStocks = formatMultiDayStocksForGraph(threeMonthStocks);
        this.setState({ threeMonthStocks });
      });
    }
    if (this.activeTab === '1 Year' && !this.state.oneYearStocks[0]) {
      getOneYear(search, (oneYearStocks) => {
        oneYearStocks = formatMultiDayStocksForGraph(oneYearStocks);
        this.setState({ oneYearStocks });
      });
    }
  };

  activeTabChanged = (activeTab) => {
    this.activeTab = activeTab;
    this.getStockData(this.search);
  };

  render() {
    return (
      <Grid fluid>
        <div className="App">
          <Row>
            <Col md={12}>
              <h1 style={{ fontSize: '40px', color: 'rgb(57, 119, 253)' }}>
                Stox Box
              </h1>
              <StockSearch getStockData={this.getStockData} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <StockChart
                activeTabChanged={this.activeTabChanged}
                currentDayStocks={this.state.currentDayStocks}
                threeMonthStocks={this.state.threeMonthStocks}
                oneYearStocks={this.state.oneYearStocks}
              />
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

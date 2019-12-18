import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    allStocks: [],
    portfolioStocks: [],
    filteredStocks: []
  };

  handleAlphabeticalSort = () => {
    let sortedByAlphabetical = [];
    if (this.state.filteredStocks.length > 0) {
      sortedByAlphabetical = [...this.state.filteredStocks];

      sortedByAlphabetical.sort((stock1, stock2) =>
        stock1.ticker.localeCompare(stock2.ticker)
      );

      this.setState({
        filteredStocks: sortedByAlphabetical
      });
    } else {
      sortedByAlphabetical = [...this.state.allStocks];

      sortedByAlphabetical.sort((stock1, stock2) =>
        stock1.ticker.localeCompare(stock2.ticker)
      );

      this.setState({
        allStocks: sortedByAlphabetical
      });
    }
  };

  handlePriceSort = () => {
    const sortedByPrice = this.state.allStocks.sort(
      (stock1, stock2) => stock1.price - stock2.price
    );
    console.log(sortedByPrice);
  };

  handleFilterSelection = event => {
    let filterSelectionType = event.target.value;
    let allStocks = [...this.state.allStocks];
    let filteredStocks = allStocks.filter(
      stock => stock.type === filterSelectionType
    );
    this.setState({ filteredStocks });
  };

  isStockInPortfolio = stock => {
    return this.state.portfolioStocks.includes(stock);
  };

  handlePortfolioStocksClick = stock => {
    if (this.isStockInPortfolio(stock)) {
      const removedFromPortfolioStocks = this.state.portfolioStocks.filter(
        portfolioStock => portfolioStock !== stock
      );
      this.setState({
        portfolioStocks: removedFromPortfolioStocks
      });
      return;
    }
  };

  handleAllStocksClick = stock => {
    if (this.isStockInPortfolio(stock)) return;

    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(allStocks => this.setState({ allStocks }));
  }

  render() {
    const { allStocks, portfolioStocks, filteredStocks } = this.state;
    const {
      handleAllStocksClick,
      handlePortfolioStocksClick,
      handleFilterSelection,
      handleAlphabeticalSort,
      handlePriceSort
    } = this;

    return (
      <div>
        <SearchBar
          handleFilterSelection={handleFilterSelection}
          handleAlphabeticalSort={handleAlphabeticalSort}
          handlePriceSort={handlePriceSort}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={filteredStocks.length > 0 ? filteredStocks : allStocks}
              handleClick={handleAllStocksClick}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={portfolioStocks}
              handleClick={handlePortfolioStocksClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;

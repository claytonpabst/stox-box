import React from 'react';

import './SymbolPredict.css';

import symbols from './../topSymbols';

const SymbolPredict = ({ inputVal, addSymbolToSearch }) => {
  inputVal = inputVal.replace(/\s/g, '').split(',');
  inputVal = inputVal[inputVal.length - 1];
  return (
    <div className="predict-wrapper">
      <div className="predict-results-wrapper">
        {symbols.map((symbol, i) => {
          return (
            symbol.toLowerCase().includes(inputVal.toLowerCase()) &&
            inputVal !== '' && (
              <p onClick={() => addSymbolToSearch(symbol)} key={i}>
                {symbol}
              </p>
            )
          );
        })}
      </div>
    </div>
  );
};

export default SymbolPredict;

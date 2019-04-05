import React, { useState, useRef, useEffect } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import SymbolPredict from './SymbolPredict';

const StockSearch = ({ getStockData }) => {
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValFn('FB,');
  }, []);

  const setInputValFn = (val) => {
    setInputVal(val.toUpperCase());
    if (val[val.length - 1] === ',') {
      getStockData(val, true); //passing true so the getStockData will make new api calls
    }
  };

  const addSymbolToSearch = (symbol) => {
    let inputValCopy = inputVal.replace(/\s/g, '').split(',');
    inputValCopy[inputValCopy.length - 1] = symbol + ',';
    setInputValFn(inputValCopy.join(','));
    inputRef.current.focus();
  };

  const checkForEnter = (e) => {
    if (inputVal[inputVal.length - 1] === ',') return;
    if (e.keyCode === 13) setInputValFn(inputVal + ',');
  };

  return (
    <>
      <FormGroup
        style={{ maxWidth: '700px', margin: '20px auto', position: 'relative' }}
        controlId="formBasicText"
      >
        <ControlLabel>Enter stock symbols separated by commas</ControlLabel>
        <FormControl
          inputRef={inputRef}
          type="text"
          value={inputVal}
          placeholder="Example: AMZN,FB,AAPL,NVDA"
          onChange={(e) => setInputValFn(e.target.value)}
          onKeyDown={checkForEnter}
          autoComplete="off"
        />
        <FormControl.Feedback />
      </FormGroup>
      <SymbolPredict
        inputVal={inputVal}
        addSymbolToSearch={addSymbolToSearch}
      />
    </>
  );
};

export default StockSearch;

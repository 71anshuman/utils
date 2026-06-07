import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

// Simple conversion data
const conversionData = {
  length: {
    name: 'Length',
    units: {
      meters: { factor: 1, symbol: 'm' },
      feet: { factor: 0.3048, symbol: 'ft' },
      inches: { factor: 0.0254, symbol: 'in' },
      centimeters: { factor: 0.01, symbol: 'cm' },
      kilometers: { factor: 1000, symbol: 'km' },
      miles: { factor: 1609.344, symbol: 'mi' }
    }
  },
  weight: {
    name: 'Weight', 
    units: {
      grams: { factor: 1, symbol: 'g' },
      kilograms: { factor: 1000, symbol: 'kg' },
      pounds: { factor: 453.592, symbol: 'lb' },
      ounces: { factor: 28.3495, symbol: 'oz' }
    }
  },
  temperature: {
    name: 'Temperature',
    units: {
      celsius: { symbol: '°C' },
      fahrenheit: { symbol: '°F' },
      kelvin: { symbol: 'K' }
    }
  }
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Unit Converter"
  }, []);

  const convertTemperature = (value, from, to) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';

    let celsius;
    switch (from) {
      case 'celsius':
        celsius = num;
        break;
      case 'fahrenheit':
        celsius = (num - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = num - 273.15;
        break;
      default:
        return '';
    }

    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return '';
    }
  };

  const convertValue = (value, category, from, to) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';

    if (category === 'temperature') {
      return convertTemperature(value, from, to);
    }

    const categoryData = conversionData[category];
    const fromFactor = categoryData.units[from].factor;
    const toFactor = categoryData.units[to].factor;

    const baseValue = num * fromFactor;
    const result = baseValue / toFactor;
    return result;
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (outputValue && outputValue !== 'Invalid input') {
      setInputValue(outputValue);
    }
  };

  const clearValues = () => {
    setInputValue('');
    setOutputValue('');
    setCopied(false);
  };

  useEffect(() => {
    if (!inputValue || inputValue === '') {
      setOutputValue('');
      return;
    }

    const result = convertValue(inputValue, category, fromUnit, toUnit);
    if (result !== '') {
      const formatted = typeof result === 'number' ? 
        (result % 1 === 0 ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '')) : 
        result.toString();
      setOutputValue(formatted);
    } else {
      setOutputValue('Invalid input');
    }
  }, [inputValue, category, fromUnit, toUnit]);

  useEffect(() => {
    const categoryData = conversionData[category];
    const unitKeys = Object.keys(categoryData.units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
    setInputValue('');
    setOutputValue('');
  }, [category]);

  const currentUnits = conversionData[category].units;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-purple text-white" style={{ backgroundColor: '#6f42c1' }}>
              <h4 className="mb-0">
                <i className="fas fa-exchange-alt mr-2"></i>
                Unit Converter
              </h4>
              <small>Convert between various units of measurement</small>
            </div>
            <div className="card-body">
              {/* Category Selection */}
              <div className="row mb-4">
                <div className="col-md-12">
                  <label>
                    <strong>Category:</strong>
                  </label>
                  <div className="row">
                    {Object.entries(conversionData).map(([key, data]) => (
                      <div key={key} className="col-md-4 col-6 mb-2">
                        <button
                          className={`btn btn-block ${category === key ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setCategory(key)}
                        >
                          {data.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conversion */}
              <div className="row mb-4">
                <div className="col-md-5">
                  <div className="form-group">
                    <label>
                      <strong>From:</strong>
                    </label>
                    <select
                      className="form-control"
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                    >
                      {Object.entries(currentUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)} ({unit.symbol})
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="form-control mt-2"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter value"
                      step="any"
                    />
                  </div>
                </div>

                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={swapUnits}
                    title="Swap units"
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </button>
                </div>

                <div className="col-md-5">
                  <div className="form-group">
                    <label>
                      <strong>To:</strong>
                    </label>
                    <select
                      className="form-control"
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                    >
                      {Object.entries(currentUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)} ({unit.symbol})
                        </option>
                      ))}
                    </select>
                    <div className="input-group mt-2">
                      <input
                        type="text"
                        className="form-control"
                        value={outputValue}
                        readOnly
                        placeholder="Result"
                        style={{ backgroundColor: '#f8f9fa' }}
                      />
                      {outputValue && outputValue !== 'Invalid input' && (
                        <div className="input-group-append">
                          <CopyToClipboard text={outputValue} onCopy={handleCopy}>
                            <button className="btn btn-outline-success" type="button">
                              {copied ? 'Copied!' : 'Copy'}
                            </button>
                          </CopyToClipboard>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row mb-4">
                <div className="col-md-12 text-center">
                  <button
                    className="btn btn-secondary"
                    onClick={clearValues}
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Clear
                  </button>
                </div>
              </div>

              {/* Conversion Result Display */}
              {outputValue && outputValue !== 'Invalid input' && inputValue && (
                <div className="alert alert-success">
                  <h6 className="mb-0">
                    <i className="fas fa-check-circle mr-2"></i>
                    <strong>{inputValue} {currentUnits[fromUnit].symbol}</strong> = 
                    <strong> {outputValue} {currentUnits[toUnit].symbol}</strong>
                  </h6>
                </div>
              )}

              {/* Info */}
              <div className="mt-4">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-1"></i>Conversion Features:</h6>
                  <ul className="mb-0 small">
                    <li>Support for length, weight, and temperature conversions</li>
                    <li>High precision calculations with automatic rounding</li>
                    <li>Instant conversion as you type</li>
                    <li>Unit swapping with the exchange button</li>
                    <li>Copy results to clipboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
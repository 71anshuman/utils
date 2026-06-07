import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ColorPicker = () => {
  const [color, setColor] = useState('#3498db');
  const [rgb, setRgb] = useState({ r: 52, g: 152, b: 219 });
  const [hsl, setHsl] = useState({ h: 204, s: 70, l: 53 });
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState({});

  useEffect(() => {
    document.title = "Color Picker & Palette Generator"
  }, []);

  // Convert HEX to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: Number.parseInt(result[1], 16),
      g: Number.parseInt(result[2], 16),
      b: Number.parseInt(result[3], 16)
    } : null;
  };

  // Convert RGB to HEX
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / (1/12)) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return { r: f(0), g: f(8), b: f(4) };
  };

  // Update all color formats when color changes
  const updateColor = (newColor) => {
    setColor(newColor);
    const rgbValues = hexToRgb(newColor);
    if (rgbValues) {
      setRgb(rgbValues);
      setHsl(rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b));
    }
  };

  // Generate color palette based on color harmony
  const generatePalette = (harmonyType) => {
    const baseHsl = hsl;
    let colors = [];

    switch (harmonyType) {
      case 'complementary':
        colors = [
          baseHsl,
          { ...baseHsl, h: (baseHsl.h + 180) % 360 }
        ];
        break;
      case 'analogous':
        colors = [
          { ...baseHsl, h: (baseHsl.h - 30 + 360) % 360 },
          baseHsl,
          { ...baseHsl, h: (baseHsl.h + 30) % 360 }
        ];
        break;
      case 'triadic':
        colors = [
          baseHsl,
          { ...baseHsl, h: (baseHsl.h + 120) % 360 },
          { ...baseHsl, h: (baseHsl.h + 240) % 360 }
        ];
        break;
      case 'monochromatic':
        colors = [
          { ...baseHsl, l: Math.max(baseHsl.l - 30, 10) },
          { ...baseHsl, l: Math.max(baseHsl.l - 15, 10) },
          baseHsl,
          { ...baseHsl, l: Math.min(baseHsl.l + 15, 90) },
          { ...baseHsl, l: Math.min(baseHsl.l + 30, 90) }
        ];
        break;
      default:
        colors = [baseHsl];
    }

    const hexColors = colors.map(hslColor => {
      const rgbColor = hslToRgb(hslColor.h, hslColor.s, hslColor.l);
      return rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
    });

    setPalette(hexColors);
  };

  // Calculate color contrast ratio
  const getContrastRatio = (color1, color2) => {
    const getLuminance = (r, g, b) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const contrastWithWhite = getContrastRatio(color, '#ffffff');
  const contrastWithBlack = getContrastRatio(color, '#000000');

  const handleCopy = (type) => {
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">Color Picker & Palette Generator</h1>
            <p className="lead">Pick colors, convert between formats, and generate harmonious palettes</p>
            <hr />
            
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Color Picker</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="color-picker">Pick a Color</label>
                      <div className="d-flex align-items-center">
                        <input
                          id="color-picker"
                          type="color"
                          value={color}
                          onChange={(e) => updateColor(e.target.value)}
                          className="form-control mr-3"
                          style={{ width: '80px', height: '50px' }}
                        />
                        <div 
                          style={{ 
                            backgroundColor: color, 
                            width: '100px', 
                            height: '50px', 
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>HEX</label>
                          <input
                            type="text"
                            className="form-control"
                            value={color}
                            onChange={(e) => updateColor(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label>R</label>
                          <input
                            type="number"
                            className="form-control"
                            value={rgb.r}
                            min="0"
                            max="255"
                            onChange={(e) => {
                              const newRgb = { ...rgb, r: Number.parseInt(e.target.value) || 0 };
                              setRgb(newRgb);
                              updateColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label>G</label>
                          <input
                            type="number"
                            className="form-control"
                            value={rgb.g}
                            min="0"
                            max="255"
                            onChange={(e) => {
                              const newRgb = { ...rgb, g: Number.parseInt(e.target.value) || 0 };
                              setRgb(newRgb);
                              updateColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label>B</label>
                          <input
                            type="number"
                            className="form-control"
                            value={rgb.b}
                            min="0"
                            max="255"
                            onChange={(e) => {
                              const newRgb = { ...rgb, b: Number.parseInt(e.target.value) || 0 };
                              setRgb(newRgb);
                              updateColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <div className="form-group">
                          <label>H</label>
                          <input
                            type="number"
                            className="form-control"
                            value={hsl.h}
                            min="0"
                            max="360"
                            onChange={(e) => {
                              const newHsl = { ...hsl, h: Number.parseInt(e.target.value) || 0 };
                              setHsl(newHsl);
                              const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
                              setRgb(newRgb);
                              updateColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label>S (%)</label>
                          <input
                            type="number"
                            className="form-control"
                            value={hsl.s}
                            min="0"
                            max="100"
                            onChange={(e) => {
                              const newHsl = { ...hsl, s: Number.parseInt(e.target.value) || 0 };
                              setHsl(newHsl);
                              const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
                              setRgb(newRgb);
                              updateColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label>L (%)</label>
                          <input
                            type="number"
                            className="form-control"
                            value={hsl.l}
                            min="0"
                            max="100"
                            onChange={(e) => {
                              const newHsl = { ...hsl, l: Number.parseInt(e.target.value) || 0 };
                              setHsl(newHsl);
                              const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
                              setRgb(newRgb);
                              updateColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Accessibility Check</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <h6>Contrast with White</h6>
                      <div className="d-flex align-items-center justify-content-between p-2 mb-2" style={{ backgroundColor: color, color: 'white' }}>
                        <span>Sample Text</span>
                        <span>{contrastWithWhite.toFixed(2)}:1</span>
                      </div>
                      <small className={`text-${contrastWithWhite >= 4.5 ? 'success' : 'danger'}`}>
                        {contrastWithWhite >= 4.5 ? '✓ WCAG AA Compliant' : '✗ Poor Contrast'}
                      </small>
                    </div>

                    <div className="mb-3">
                      <h6>Contrast with Black</h6>
                      <div className="d-flex align-items-center justify-content-between p-2 mb-2" style={{ backgroundColor: color, color: 'black' }}>
                        <span>Sample Text</span>
                        <span>{contrastWithBlack.toFixed(2)}:1</span>
                      </div>
                      <small className={`text-${contrastWithBlack >= 4.5 ? 'success' : 'danger'}`}>
                        {contrastWithBlack >= 4.5 ? '✓ WCAG AA Compliant' : '✗ Poor Contrast'}
                      </small>
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Color Values</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-12 mb-2">
                          <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                              <span className="input-group-text">HEX</span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              value={color}
                              readOnly
                              style={{ backgroundColor: '#f8f9fa' }}
                            />
                            <div className="input-group-append">
                              <CopyToClipboard text={color}>
                                <button 
                                  className={`btn btn-sm ${copied.hex ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy('hex')}
                                >
                                  {copied.hex ? '✓' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mb-2">
                          <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                              <span className="input-group-text">RGB</span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                              readOnly
                              style={{ backgroundColor: '#f8f9fa' }}
                            />
                            <div className="input-group-append">
                              <CopyToClipboard text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}>
                                <button 
                                  className={`btn btn-sm ${copied.rgb ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy('rgb')}
                                >
                                  {copied.rgb ? '✓' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mb-2">
                          <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                              <span className="input-group-text">HSL</span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                              readOnly
                              style={{ backgroundColor: '#f8f9fa' }}
                            />
                            <div className="input-group-append">
                              <CopyToClipboard text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}>
                                <button 
                                  className={`btn btn-sm ${copied.hsl ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy('hsl')}
                                >
                                  {copied.hsl ? '✓' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Color Palette Generator</h5>
                  </div>
                  <div className="card-body">
                    <div className="btn-group mb-3" role="group">
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => generatePalette('complementary')}
                      >
                        Complementary
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => generatePalette('analogous')}
                      >
                        Analogous
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => generatePalette('triadic')}
                      >
                        Triadic
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => generatePalette('monochromatic')}
                      >
                        Monochromatic
                      </button>
                    </div>

                    {palette.length > 0 && (
                      <div className="row">
                        {palette.map((paletteColor, index) => (
                          <div key={index} className="col-md-2 col-4 mb-3">
                            <div 
                              className="card"
                              style={{ cursor: 'pointer' }}
                              onClick={() => updateColor(paletteColor)}
                            >
                              <div 
                                style={{ 
                                  backgroundColor: paletteColor, 
                                  height: '80px',
                                  borderRadius: '4px 4px 0 0'
                                }}
                              />
                              <div className="card-body p-2 text-center">
                                <small>{paletteColor}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
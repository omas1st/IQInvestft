// src/components/TradingViewIframe.jsx
import React, { memo } from "react";

/**
 * Responsive TradingView iframe that fills its parent section.
 *
 * Props:
 *  - symbol: trading symbol, e.g. "NASDAQ:AAPL"
 *  - width: CSS width (default "100%")
 *  - height: CSS height (default "100%") — use "auto" or a pixel value if desired
 *  - minHeight: minimum height so the viewport doesn't collapse (default "600px")
 *  - className: extra wrapper class
 *  - loading: "lazy" or "eager" (default "lazy")
 */
function TradingViewIframe({
  symbol = "NASDAQ:AAPL",
  width = "100%",
  height = "100%",
  minHeight = "600px",
  className = "",
  loading = "lazy",
}) {
  const encodedSymbol = encodeURIComponent(symbol);
  // TradingView widget embed path — parameters can be adjusted as needed
  const src = `https://s.tradingview.com/widgetembed/?symbol=${encodedSymbol}&interval=D&hidesidetoolbar=true&theme=light&locale=en`;

  const wrapperStyle = {
    width,
    height,
    minHeight,
    display: "block",
    // allow the wrapper to be sized by flex/grid parents
    boxSizing: "border-box",
  };

  const iframeStyle = {
    width: "100%",
    height: "100%",
    border: 0,
    display: "block",
  };

  return (
    <div className={`tradingview-iframe-wrapper ${className}`} style={wrapperStyle}>
      <iframe
        title={`TradingView ${symbol}`}
        src={src}
        style={iframeStyle}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        loading={loading}
      />
    </div>
  );
}

export default memo(TradingViewIframe);

/**
 *  Utilities
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 09/25/2021
 * 
 * */ 

function debug(mesg) {
  if (DEBUG) Logger.log(mesg);
}

function getNumberOfFiis() {
  return getNumberOfTickers(fiisSheetName, 2);
}

function getNumberOfLargeCaps() {
  return getNumberOfTickers(stocksSheetName, 3);
}

function getNumberOfSmallCaps() {
  var ini = getNumberOfLargeCaps() + 2 + 3;
  return getNumberOfTickers(stocksSheetName, ini);
}

function getNumberOfIntStocks() {
  return getNumberOfTickers(intStocksSheetName, 3);
}

function getNumberOfTickers(sheetName, ini) {
  var end = ini + 50;
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var tickers = sheet.getRange("A"+ini+":A"+end).getValues();
  var rows = 0;
  var regex = /^[A-Z,a-z,0-9]+[0-9]+$/;
  var foundEnd = false;

  tickers.forEach(function (ticker) {

    var matches = ticker.toString().match(regex);
    
    if (! matches) {
      foundEnd = true;
    }

    if (!foundEnd) {
      debug("Ticker [" + ticker + "] found.");
      rows++;
    }

  });

  debug("Found [" + rows + "] tickers.");

  return rows;
}

function hideZeroBrStocks() {
  hideZeroFromFilter(stocksSheetName,"N1",14);
}

function hideZeroIntStocks() {
  hideZeroFromFilter(intStocksSheetName,"N1",14);
}

function hideZeroFiis() {
  hideZeroFromFilter(fiisSheetName,"M1",13);
}

function hideZeroFromFilter(sheetName, filterColumnName, filterColumnNumber) {
  var spreadsheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  spreadsheet.getRange(filterColumnName).activate();
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setHiddenValues(['0,0'])
  .build();
  spreadsheet.getFilter().setColumnFilterCriteria(filterColumnNumber, criteria);
}


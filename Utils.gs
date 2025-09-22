/**
 *  Utilities
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 22/09/2025
 * 
 * */

var stockRegex = /^[A-Z,a-z,0-9]+[0-9]+$/;
var fiiRegex = /^[A-Z,a-z,0-9]+[0-9]+$/;
var cryptoRegex = /^[A-Z,a-z]+$/;

// Dialog parameters
var loadingGif = "https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif";
var dialogWidth = 200;
var dialogHeight = 100;
var dialogCloseDelay = 2 * 1000;

function debug(mesg) {
  if (DEBUG) {
    Logger.log(mesg);
  }
}

function getNumberOfFiis() {
  return getNumberOfTickers(fiisSheetName, firstFiiRow, fiiRegex);
}

function getNumberOfLargeCaps() {
  return getNumberOfTickers(stocksSheetName, firstStockRow, stockRegex);
}

function getNumberOfSmallCaps() {
  var ini = getNumberOfLargeCaps() + 2 + 2;
  return getNumberOfTickers(stocksSheetName, ini, stockRegex);
}

function getNumberOfIntStocks() {
  return getNumberOfTickers(intStocksSheetName, firstNonBrStockRow, stockRegex);
}

function getNumberOfCrypto() {
  return getNumberOfTickers(cryptoSheetName, firstCryptoRow, cryptoRegex);
}

function getNumberOfTickers(sheetName, ini, regex) {
  var end = ini + 50;
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  var rows = 0;
  var foundEnd = false;

  tickers.forEach(function (ticker) {

    var matches = ticker.toString().match(regex);

    if (!matches) {
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
  hideZeroFromFilter(stocksSheetName, "N1", 14);
}

function hideZeroIntStocks() {
  hideZeroFromFilter(intStocksSheetName, "N1", 14);
}

function hideZeroFiis() {
  hideZeroFromFilter(fiisSheetName, "M1", 13);
}

function hideZeroFromFilter(sheetName, filterColumnName, filterColumnNumber) {
  var spreadsheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  spreadsheet.getRange(filterColumnName).activate();
  var criteria = SpreadsheetApp.newFilterCriteria()
    .setHiddenValues(['0,0'])
    .build();
  spreadsheet.getFilter().setColumnFilterCriteria(filterColumnNumber, criteria);
}

function showProgressDialog(mesg) {
  var html = "<center><iframe src=" + loadingGif + " width=50 height=50 frameBorder=0></iframe></center>";
  var htmlOutput = HtmlService.createHtmlOutput(html).setWidth(dialogWidth).setHeight(dialogHeight);
  
  //SpreadsheetApp.getUi().showModelessDialog(htmlOutput, title);
  SpreadsheetApp.getActive().toast(mesg, "- INFO -", 100);
}

function closeProgressDialog() {
  var html = "<script>setTimeout(google.script.host.close(), " + dialogCloseDelay + ");</script>";
  var htmlOutput = HtmlService.createHtmlOutput(html).setWidth(dialogWidth).setHeight(dialogHeight);
  
  //SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'Completo');
  SpreadsheetApp.getActive().toast("Completo", "- INFO -", 3);
}

function getActiveColumnNumber() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const activeColumnNumber = sheet.getActiveRange().getColumn();
  return activeColumnNumber;
}

// EOF

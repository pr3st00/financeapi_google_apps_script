/**
 *  General Utilities
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 23/05/2026
 * 
 * */

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
  const ini = getNumberOfLargeCaps() + 2 + 2;
  return getNumberOfTickers(stocksSheetName, ini, stockRegex);
}

function getNumberOfIntStocks() {
  return getNumberOfTickers(intStocksSheetName, firstNonBrStockRow, stockRegex);
}

function getNumberOfCrypto() {
  return getNumberOfTickers(cryptoSheetName, firstCryptoRow, cryptoRegex);
}

function getNumberOfTickers(sheetName, ini, regex) {
  const end = ini + 50;
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  
  let rows = 0;
  let foundEnd = false;

  tickers.forEach(function (ticker) {

    let matches = ticker.toString().match(regex);

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
  const spreadsheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  spreadsheet.getRange(filterColumnName).activate();
  const criteria = SpreadsheetApp.newFilterCriteria()
    .setHiddenValues(['0,0'])
    .build();
  spreadsheet.getFilter().setColumnFilterCriteria(filterColumnNumber, criteria);
}

function showProgressDialog(mesg) {
  let html = "<center><iframe src=" + loadingGif + " width=50 height=50 frameBorder=0></iframe></center>";
  let htmlOutput = HtmlService.createHtmlOutput(html).setWidth(dialogWidth).setHeight(dialogHeight);

  //SpreadsheetApp.getUi().showModelessDialog(htmlOutput, title);
  SpreadsheetApp.getActive().toast(mesg, "- INFO -", 100);
}

function closeProgressDialog() {
  let html = "<script>setTimeout(google.script.host.close(), " + dialogCloseDelay + ");</script>";
  let htmlOutput = HtmlService.createHtmlOutput(html).setWidth(dialogWidth).setHeight(dialogHeight);

  //SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'Completo');
  SpreadsheetApp.getActive().toast("Completo", "- INFO -", 3);
}

function getActiveColumnNumber() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const activeColumnNumber = sheet.getActiveRange().getColumn();
  
  return activeColumnNumber;
}

function alert(message) {
  SpreadsheetApp.getUi().alert(message);
}

function readValue(title, message) {
  const ui = SpreadsheetApp.getUi();

  let response = ui.prompt(
    title,
    message,
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() == ui.Button.OK) {
    return response.getResponseText();
  } else {
    return null;
  }
}

function confirm(title, message) {
  const ui = SpreadsheetApp.getUi();

  let response = ui.alert(
    title,
    message,
    ui.ButtonSet.OK_CANCEL
  );

  return response == ui.Button.OK;
}

function showDialog(title, text, width, height) {
  const html = HtmlService.createHtmlOutput(text)
    .setWidth(width)
    .setHeight(height);

  SpreadsheetApp.getUi().showModalDialog(html, title);
}

function shouldMask() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("VISAO GERAL");
  
  return sheet.getRange("M4").getValue();
}

function maskText(text) {
  return text.replace(/R?\$\s?\d{1,3}(\.\d{3})*,\d{2}/g, "R$ XXXX");
}

// EOF
/**
 *  Data retrieving functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 20/10/2025
 * 
 * */

const SUCCESS = 200;
const OPTIONS = { 'muteHttpExceptions': true };

function callFundamentusApi(type, ticker) {
  var url = stockfundamentusUrl + "/" + type + "/" + ticker;

  debug("Calling Fundamentus service: " + url);

  try {
    var response = UrlFetchApp.fetch(url, OPTIONS);
    var responseBody = response.getContentText();

    if (response.getResponseCode() === SUCCESS) {
      return JSON.parse(responseBody);
    } else {
      alert(ticker + "\n\n" + responseBody);
      return null;
    }
  } catch (e) {
    Logger.log(getMessage("FUNDAMENTUS_ERROR_MESSAGE") + e.message);
    alert(getMessage("FUNDAMENTUS_ERROR_MESSAGE") + e.message);
    return null;
  }
}

function updateAllIndicators() {
  showProgressDialog(getMessage("INDICATORS_UPDATE"));

  var lastFiiRow = firstFiiRow + getNumberOfFiis() - 1;
  var lastLargeCapRow = firstStockRow + getNumberOfLargeCaps() - 1;
  var firstSmallCapRow = lastLargeCapRow + 2;
  var lastSmallCapRow = firstSmallCapRow + getNumberOfSmallCaps() - 1;

  updateFiiIndicators(firstFiiRow, lastFiiRow);
  updateStockIndicators(firstStockRow, lastLargeCapRow);
  updateStockIndicators(firstSmallCapRow, lastSmallCapRow);

  closeProgressDialog();
}

function getIndicator(ticker, indicator, type) {
  var data = callFundamentusApi(type, ticker);
  return getData(data, indicator);
}

function getFiiIndicator(ticker, indicator) {
  return getIndicator(ticker, indicator, "fii");
}

function getStockIndicator(ticker, indicator) {
  return getIndicator(ticker, indicator, "stock");
}

function getData(data, indicator, defaultValue) {
  var value = data && data[indicator] ? data[indicator] : defaultValue;
  var convertToPercent = ["dy", "roe", "roic", "tax"];
  var stringElements = ["ticker", "sector", "properties"];

  debug("Indicator: [" + indicator + "], Value: [" + value + "]");

  if (convertToPercent.indexOf(indicator) > -1) {
    value = value / 100;
  }

  return stringElements.indexOf(indicator) > -1 ? value : Number(value);
}

function updateFiiIndicators(ini, end) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(fiisSheetName);
  var tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  var i = ini;

  tickers.forEach(function (ticker) {

    var pvpCell = sheet.getRange("F" + i);
    var dyCell = sheet.getRange("G" + i);
    var segCell = sheet.getRange("D" + i);
    var vacCell = sheet.getRange("J" + i);
    var propCell = sheet.getRange("K" + i);
    var taxCell = sheet.getRange("I" + i);

    debug(ticker);

    pvpCell.clearContent();
    dyCell.clearContent();
    vacCell.clearContent();
    propCell.clearContent();
    taxCell.clearContent();

    SpreadsheetApp.flush();

    var data = callFundamentusApi("fii", ticker);

    debug(data);

    pvpCell.setValue(getData(data, "pvp", 0));
    dyCell.setValue(getData(data, "dy", 0));
    segCell.setValue(getData(data, "sector", "NA").toUpperCase());
    vacCell.setValue(getData(data, "vacancy", 0));
    taxCell.setValue(getData(data, "tax", 0));
    propCell.setValue(getData(data, "properties", "NA"));

    i++;
  });

}

function updateStockIndicators(ini, end) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(stocksSheetName);
  var tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  var i = ini;

  tickers.forEach(function (ticker) {

    var plCell = sheet.getRange("E" + i);
    var pvpCell = sheet.getRange("F" + i);
    var dyCell = sheet.getRange("G" + i);
    var roicCell = sheet.getRange("H" + i);
    var eveCell = sheet.getRange("I" + i);
    var lpaCell = sheet.getRange("J" + i);

    debug(ticker);

    plCell.clearContent();
    pvpCell.clearContent();
    dyCell.clearContent();
    roicCell.clearContent();
    eveCell.clearContent();
    lpaCell.clearContent();

    SpreadsheetApp.flush();

    var data = callFundamentusApi("stock", ticker);

    plCell.setValue(getData(data, "pl", 0));
    pvpCell.setValue(getData(data, "pvp", 0));
    dyCell.setValue(getData(data, "dy", 0));
    roicCell.setValue(getData(data, "roic", 0));
    eveCell.setValue(getData(data, "eve", 0));
    lpaCell.setValue(getData(data, "lpa", 0));

    i++;
  });
}

// EOF
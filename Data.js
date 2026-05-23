/**
 *  Data retrieving functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 23/04/2026
 * 
 * */

const SUCCESS = 200;
const DELAY = 1 * 1000;

const OPTIONS = { 'muteHttpExceptions': true };

function callFundamentusApi(type, ticker) {
  let url = stockfundamentusUrl + "/" + type + "/" + ticker;

  debug("Calling Fundamentus service: " + url);

  try {
    Utilities.sleep(DELAY);
    
    let response = UrlFetchApp.fetch(url, OPTIONS);
    let responseBody = response.getContentText();

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

  const lastFiiRow = firstFiiRow + getNumberOfFiis() - 1;
  const lastLargeCapRow = firstStockRow + getNumberOfLargeCaps() - 1;
  const firstSmallCapRow = lastLargeCapRow + 2;
  const lastSmallCapRow = firstSmallCapRow + getNumberOfSmallCaps() - 1;

  updateFiiIndicators(firstFiiRow, lastFiiRow);
  updateStockIndicators(firstStockRow, lastLargeCapRow);
  updateStockIndicators(firstSmallCapRow, lastSmallCapRow);

  closeProgressDialog();
}

function getIndicator(ticker, indicator, type) {
  const data = callFundamentusApi(type, ticker);
  return getData(data, indicator);
}

function getFiiIndicator(ticker, indicator) {
  return getIndicator(ticker, indicator, "fii");
}

function getStockIndicator(ticker, indicator) {
  return getIndicator(ticker, indicator, "stock");
}

function getData(data, indicator, defaultValue) {
  const convertToPercent = ["dy", "roe", "roic", "tax"];
  const stringElements = ["ticker", "sector", "properties"];

  let value = data && data[indicator] ? data[indicator] : defaultValue;

  debug("Indicator: [" + indicator + "], Value: [" + value + "]");

  if (convertToPercent.indexOf(indicator) > -1) {
    value = value / 100;
  }

  return stringElements.indexOf(indicator) > -1 ? value : Number(value);
}

function updateFiiIndicators(ini, end) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(fiisSheetName);
  const tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  
  let i = ini;

  tickers.forEach(function (ticker) {

    let pvpCell = sheet.getRange("F" + i);
    let dyCell = sheet.getRange("G" + i);
    let segCell = sheet.getRange("D" + i);
    let vacCell = sheet.getRange("J" + i);
    let propCell = sheet.getRange("K" + i);
    let taxCell = sheet.getRange("I" + i);

    debug(ticker);

    pvpCell.clearContent();
    dyCell.clearContent();
    vacCell.clearContent();
    propCell.clearContent();
    taxCell.clearContent();

    SpreadsheetApp.flush();

    let data = callFundamentusApi("fii", ticker);

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
  const sheet = SpreadsheetApp.getActive().getSheetByName(stocksSheetName);
  const tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  let i = ini;

  tickers.forEach(function (ticker) {

    let plCell = sheet.getRange("E" + i);
    let pvpCell = sheet.getRange("F" + i);
    let dyCell = sheet.getRange("G" + i);
    let roicCell = sheet.getRange("H" + i);
    let eveCell = sheet.getRange("I" + i);
    let lpaCell = sheet.getRange("J" + i);

    debug(ticker);

    plCell.clearContent();
    pvpCell.clearContent();
    dyCell.clearContent();
    roicCell.clearContent();
    eveCell.clearContent();
    lpaCell.clearContent();

    SpreadsheetApp.flush();

    let data = callFundamentusApi("stock", ticker);

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
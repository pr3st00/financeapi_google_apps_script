/**
 *  Data retrieving functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 12/06/2022
 * 
 * */ 

function updateAllIndicators() {
  var lastFiiRow = firstFiiRow + getNumberOfFiis() - 1;
  var lastLargeCapRow = firstStockRow + getNumberOfLargeCaps() - 1;
  var firstSmallCapRow = lastLargeCapRow + 3;
  var lastSmallCapRow = firstSmallCapRow + getNumberOfSmallCaps() - 1;

  updateFiiIndicators(firstFiiRow, lastFiiRow);
  updateStockIndicators(firstStockRow, lastLargeCapRow);
  updateStockIndicators(firstSmallCapRow,lastSmallCapRow);
}

function getIndicator(ticker, indicator, type) {
  var url = stockfundamentusUrl + "/" + type + "?ticker=" + ticker;
  
  debug("Calling Fundamentus service: " + url);

  var data = JSON.parse(UrlFetchApp.fetch(url));

  return getData(data, indicator);
}

function getFiiIndicator(ticker, indicator) {
  return getIndicator(ticker, indicator, "fii");
}

function getStockIndicator(ticker, indicator) {
  return getIndicator(ticker, indicator, "stock");
}

function getData(data, indicator) {
  var value = data[indicator];
  var convertToPercent = ["dy","roe","roic"];
  var stringElements = ["ticker","sector", "properties"];
  
  debug("Indicator: [" + indicator + "], Value: [" + value + "]");

  if (convertToPercent.indexOf(indicator) > -1)
  { 
    value = value/100;
  }
  
  return stringElements.indexOf(indicator) > -1 ? value : Number(value);
}

function updateFiiIndicators(ini,end) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(fiisSheetName);
  var tickers = sheet.getRange("A"+ini+":A"+end).getValues();
  var i = ini;
  var baseUrl = stockfundamentusUrl;

  tickers.forEach(function(ticker) {
    var url = baseUrl + "/fii?ticker=" + ticker;
    var data = JSON.parse(UrlFetchApp.fetch(url));

    var pvpCell = sheet.getRange("F"+i);
    var dyCell = sheet.getRange("G"+i);
    var segCell = sheet.getRange("D"+i);
    var propCell = sheet.getRange("K"+i);

    debug(ticker);

    pvpCell.setValue(getData(data,"pvp"));
    dyCell.setValue(getData(data,"dy"));
    segCell.setValue(getData(data,"sector").toUpperCase());
    propCell.setValue(getData(data,"properties"));

    i++;
 });

}

function updateStockIndicators(ini,end) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(stocksSheetName);
  var tickers = sheet.getRange("A"+ini+":A"+end).getValues();
  var i = ini;
  var baseUrl = stockfundamentusUrl;

  tickers.forEach(function(ticker) {
    var url = baseUrl + "/stock?ticker=" + ticker;
    var data = JSON.parse(UrlFetchApp.fetch(url));

    var pvpCell = sheet.getRange("F"+i);
    var dyCell = sheet.getRange("G"+i);
    var roicCell = sheet.getRange("H"+i);
    var eveCell = sheet.getRange("I"+i);
    var lpaCell = sheet.getRange("J"+i);

    debug(ticker);    

    pvpCell.setValue(getData(data,"pvp"));
    dyCell.setValue(getData(data,"dy"));
    roicCell.setValue(getData(data,"roic"));
    eveCell.setValue(getData(data,"eve"));
    lpaCell.setValue(getData(data,"lpa"));

    i++;
 });
 
}

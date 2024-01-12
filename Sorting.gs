/**
 *  Sorting functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 10/01/2024
 * 
 * */

function sortAll() {

  showProgressDialog('Sorting data');
  
  sortFiis();
  sortBrStocks();
  sortNonBrStocks();
  sortCrypto();
  sortHistory();

  closeProgressDialog();
}

function sortBrStocks(showMessage) {
  var ini = firstStockRow;
  var end = ini + getNumberOfLargeCaps() - 1;

  sortRange(stocksSheetName, 19, "A" + ini + ":S" + end, showMessage);

  ini = ini + 3;
  end = ini + getNumberOfSmallCaps() - 1;

  sortRange(stocksSheetName, 19, "A" + ini + ":S" + end, showMessage);
}

function sortNonBrStocks(showMessage) {
  var ini = firstStockRow - 1;
  var end = ini + getNumberOfIntStocks() - 1;

  sortRange(intStocksSheetName, 19, "A" + ini + ":S" + end, showMessage);
}

function sortFiis(showMessage) {
  var ini = firstFiiRow;
  var end = ini + getNumberOfFiis() - 1;

  sortRange(fiisSheetName, 19, "A" + ini + ":S" + end, showMessage);
}

function sortCrypto(showMessage) {
  var ini = firstCryptoRow;
  var end = ini + getNumberOfCrypto() - 1;

  sortRange(cryptoSheetName, 11, "A" + ini + ":K" + end, showMessage);
}

function sortHistory() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(historicalSheetName);
  var orderByCell = sheet.getRange("M7");
  var ui = SpreadsheetApp.getUi();
  var columnToSortBy;
  var initialColumn = 4;

  if (DEBUG) ui.alert(orderByCell.getValue());

  switch (orderByCell.getValue()) {
    case 30:
      columnToSortBy = initialColumn + 4;
      break;
    case 60:
      columnToSortBy = initialColumn + 5;
      break;
    case 120:
      columnToSortBy = initialColumn + 6;
      break;
    case "UPSIDE":
      columnToSortBy = initialColumn;
      break;
    case "APORTE":
      columnToSortBy = initialColumn + 2;
      break;
    default:
      columnToSortBy = initialColumn + 7;
  }

  var numberOfRanges = 3;
  var ini = 0;
  var end = 1;

  for (i = 0; i < numberOfRanges; i++) {
    ini = end + 2;
    end = ini + getNumberOfTickers(historicalSheetName, ini, stockRegex) - 1;

    sortRange(historicalSheetName, columnToSortBy, "A" + ini + ":K" + end, false);
  }

}

function sortRange(sheetName, columnToSortBy, tableRange, showMessage) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var editedCell = sheet.getActiveCell();
  var ui = SpreadsheetApp.getUi();

  var range = sheet.getRange(tableRange);
  range.sort({ column: columnToSortBy, ascending: false });

  debug("ShetName=" + sheetName + ", columnToSortBy=" + columnToSortBy + ", tableRange=" + tableRange + ", showMessage=" + showMessage);

  if (showMessage) {
    ui.alert("DADOS ORGANIZADOS");
  }
}

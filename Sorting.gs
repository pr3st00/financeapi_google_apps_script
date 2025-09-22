/**
 *  Sorting functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 19/09/2025
 * 
 * */

/**
 * Sorts everything based on the default sorting columns
 */
function sortAll() {

  showProgressDialog('Ordenandos ativos');

  sortFiisByDefault();
  sortBrStocksByDefault();
  sortNonBrStocksByDefault();
  sortCryptoByDefault();
  sortHistory();

  closeProgressDialog();
}

/**
 * 1. Br stocks
 */

/**
 * Sort br-stocks
 * 
 * @param showMessage 
 * @param columnToSortBy
 * @param ascending
 */
function sortBrStocks(showMessage, columnToSortBy, ascending) {
  var ini = firstStockRow;
  var end = ini + getNumberOfLargeCaps() - 1;
  var sortBy = columnToSortBy ? columnToSortBy : stockDefaultSortColumn;

  sortRange(stocksSheetName, sortBy, "A" + ini + ":S" + end, showMessage, ascending);

  ini = end + 2;
  end = ini + getNumberOfSmallCaps() - 1;

  sortRange(stocksSheetName, sortBy, "A" + ini + ":S" + end, showMessage, ascending);
}

/**
 * Sorts br-stocks based on the current selected column 
 */
function sortBrStocksByCurrentColumn() {
  sortBrStocks(false, getActiveColumnNumber());
}

/**
 * Sorts br-stocks based on default column
 */
function sortBrStocksByDefault() {
  sortBrStocks(false, brStockDefaultSortColumn, false);
}

function sortBrStocksByTicker() {
  sortBrStocks(false, 1, true);
}

function sortBrStocksByPl() {
  sortBrStocks(false, 5, true);
}

function sortBrStocksByPvp() {
  sortBrStocks(false, 6, true);
}

function sortBrStocksByDy() {
  sortBrStocks(false, 7, false);
}

function sortBrStocksByLpa() {
  sortBrStocks(false, 10, false);
}

function sortBrStocksByPat() {
  sortBrStocks(false, 18, false);
}

/**
 * 2. Non-br stocks
 */

/**
 * Sorts non-BR stocks
 * 
 * @param showMessage 
 * @param columnToSortBy
 * @param ascending
 */
function sortNonBrStocks(showMessage, columnToSortBy, ascending) {
  var ini = firstStockRow - 1;
  var end = ini + getNumberOfIntStocks() - 1;
  var sortBy = columnToSortBy ? columnToSortBy : nonBrStockDefaultSortColumn;

  sortRange(intStocksSheetName, sortBy, "A" + ini + ":S" + end, showMessage, ascending);
}

/**
 * Sorts non-BR stocks based on the current selected column 
 */
function sortNonBrStocksByCurrentColumn() {
  sortNonBrStocks(false, getActiveColumnNumber());
}

/**
 * Sorts non-br-stocks based on default column
 */
function sortNonBrStocksByDefault() {
  sortNonBrStocks(false, nonBrStockDefaultSortColumn, false);
}

function sortNonBrStocksByTicker() {
  sortNonBrStocks(false, 1, true);
}

/**
 * 3. FIIs
 */

/**
 * Sorts FIIs
 * 
 * @param showMessage 
 * @param columnToSortBy
 * @param ascending
 */
function sortFiis(showMessage, columnToSortBy, ascending) {
  var ini = firstFiiRow;
  var end = ini + getNumberOfFiis() - 1;
  var sortBy = columnToSortBy ? columnToSortBy : fiiDefaultSortColumn;

  sortRange(fiisSheetName, sortBy, "A" + ini + ":S" + end, showMessage, ascending);
}

/**
 * Sorts FIIs based on the current selected column 
 */
function sortFiisByCurrentColumn() {
  sortFiis(false, getActiveColumnNumber());
}

/**
 * Sorts FIIs based on default column
 */
function sortFiisByDefault() {
  sortFiis(false, fiiDefaultSortColumn, false);
}

function sortFiisByTicker() {
  sortFiis(false, 1, true);
}

function sortFiisByPvp() {
  sortFiis(false, 6, true);
}

function sortFiisByDy() {
  sortFiis(false, 7, false);
}

function sortFiisByIncome() {
  sortFiis(false, 14, false);
}

function sortFiisByPat() {
  sortFiis(false, 18, false);
}

/**
 * 4. Cryptos
 */

/**
 * Sorts Crypto
 * 
 * @param showMessage 
 * @param columnToSortBy
 */
function sortCrypto(showMessage, columnToSortBy, ascending) {
  var ini = firstCryptoRow;
  var end = ini + getNumberOfCrypto() - 1;
  var sortBy = columnToSortBy ? columnToSortBy : cryptoDefaultSortColumn;

  sortRange(cryptoSheetName, sortBy, "A" + ini + ":L" + end, showMessage, ascending);
}

/**
 * Sorts crypto based on the current selected column
 */
function sortCryptoByCurrentColumn() {
  sortCrypto(false, getActiveColumnNumber());
}

/**
 * Sorts crypto based on default column
 */
function sortCryptoByDefault() {
  sortCrypto(false, cryptoDefaultSortColumn, false);
}

function sortCryptoByTicker() {
  sortCrypto(false, 1, true);
}

/**
 * 5. Historical data
 */

/**
 * Sorts historical data
 */
function sortHistory() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(historicalSheetName);
  var ui = SpreadsheetApp.getUi();
  var columnToSortBy;

  // The three variables below controls all the sorting data
  var orderByCell = sheet.getRange("P7");
  var initialColumn = 4; // Rent column number
  var ascending = sheet.getRange("P9").getValue();

  switch (orderByCell.getValue()) {
    case "RENT":
      columnToSortBy = initialColumn;
      break;
    case "UPSIDE":
      columnToSortBy = initialColumn + 2;
      break;
    case "APORTE":
      columnToSortBy = initialColumn + 5;
      break;
    case 30:
      columnToSortBy = initialColumn + 7;
      break;
    case 60:
      columnToSortBy = initialColumn + 8;
      break;
    case 120:
      columnToSortBy = initialColumn + 9;
      break;
    case 360:
      columnToSortBy = initialColumn + 10;
      break;
    default:
      columnToSortBy = initialColumn;
  }

  debug(orderByCell.getValue() + " - " + columnToSortBy);

  var numberOfRanges = 3;
  var ini = 0;
  var end = 1;

  for (i = 0; i < numberOfRanges; i++) {
    ini = end + 2;
    end = ini + getNumberOfTickers(historicalSheetName, ini, stockRegex) - 1;

    sortRange(historicalSheetName, columnToSortBy, "A" + ini + ":O" + end, false, ascending);
  }
}

/**
 * Generic sorting function
 * 
 * @param sheetName
 * @param columnToSortBy
 * @param tableRange
 * @param showMessage
 * @param ascending
 */
function sortRange(sheetName, columnToSortBy, tableRange, showMessage, ascending) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var editedCell = sheet.getActiveCell();
  var ui = SpreadsheetApp.getUi();

  debug("ShetName=" + sheetName + ", columnToSortBy=" + columnToSortBy + ", tableRange=" + tableRange + ", showMessage=" + showMessage);

  var range = sheet.getRange(tableRange);
  range.sort({ column: columnToSortBy, ascending: ascending });

  if (showMessage) {
    ui.alert("DADOS ORGANIZADOS");
  }
}

/**
 *  Sorting functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 09/25/2021
 * 
 * */ 

function sortAll() {
  sortFiis();
  sortBrStocks();
  sortNonBrStocks();
  sortHistory();
}

function sortBrStocks() {
  var ini = firstStockRow;
  var end = firstStockRow + getNumberOfLargeCaps() - 1;

  sortRange(stocksSheetName, 19,"A"+ini+":S"+end,false);

  ini = ini + 3;
  end = ini + getNumberOfSmallCaps() - 1;

  sortRange(stocksSheetName, 19,"A"+ini+":S"+end, true);
}

function sortNonBrStocks() {
  var ini = firstStockRow;
  var end = firstStockRow + getNumberOfIntStocks() - 1;

  sortRange(intStocksSheetName,19,"A"+ini+":S"+end,true);
}

function sortFiis() {
  var ini = firstFiiRow;
  var end = firstFiiRow + getNumberOfFiis() - 1;
  
  sortRange(fiisSheetName,19,"A"+ini+":S"+end,true);
}

function sortHistory() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(historicalSheetName);
  var orderByCell = sheet.getRange("M7");
  var ui = SpreadsheetApp.getUi();
  var columnToSortBy;
  var initialColumn = 4;

  if (DEBUG) ui.alert(orderByCell.getValue());
  
  switch (orderByCell.getValue()) 
  {
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

  for (i=0; i<numberOfRanges; i++) {
    ini = end + 2;
    end = ini + getNumberOfTickers(historicalSheetName, ini)  - 1;

    sortRange(historicalSheetName, columnToSortBy,"A"+ini+":K"+end , false);
  }
  
}

function sortRange(sheetName, columnToSortBy,tableRange,showMessage) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var editedCell = sheet.getActiveCell();
  var ui = SpreadsheetApp.getUi();
  
  var range = sheet.getRange(tableRange);
  range.sort( { column : columnToSortBy, ascending: false } );
 
  if (showMessage)
  {
    ui.alert("DADOS ORGANIZADOS");
  }
}

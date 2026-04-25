/**
 *  Ticker management routines
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 13/10/2025
 * 
 * */

function insertNewLargeCapStock() {
  insertNewStock(firstStockRow + 1, firstStockRow);
}

function insertNewSmallCapStock() {
  insertNewStock(firstStockRow + getNumberOfLargeCaps() + 2, firstStockRow + getNumberOfLargeCaps() + 1);
}

function removeLargeCapStock() {
  if (getNumberOfLargeCaps() <= 1) {
    alert("Pelo menos uma acao precisa existir");
    return;
  }

  removeTicker(firstStockRow + 1, firstStockRow + getNumberOfLargeCaps());
}

function removeSmallCapStock() {
  if (getNumberOfSmallCaps() <= 1) {
    alert("Pelo menos uma acao precisa existir");
    return;
  }

  removeTicker(firstStockRow + getNumberOfLargeCaps() + 2, firstStockRow + getNumberOfLargeCaps() + getNumberOfSmallCaps());
}

function removeFii() {
  if (getNumberOfFiis() <= 1) {
    alert("Pelo menos um fii precisa existir");
    return;
  }

  removeTicker(firstFiiRow + 1, firstFiiRow + getNumberOfFiis());
}

function insertCrypto() {
  alert("Nao implementado.");
  return;
}

function removeCrypto() {
  alert("Nao implementado.");
  return;
}

function insertNonBrStock() {
  alert("Nao implementado.");
  return;
}

function removeNonBrStock() {
  alert("Nao implementado.");
  return;
}


function insertNewStock(atPosition, fromPosition) {
  const sheet = SpreadsheetApp.getActiveSheet();

  var ticker = readValue('Adicionar novo papel', 'Codigo do papel a ser adicionado:');

  if (ticker == null) {
    return;
  }

  sheet.insertRows(atPosition, 1);

  var stockCell = sheet.getRange("A" + atPosition);
  var gradeCell = sheet.getRange("N" + atPosition);
  var currentCell = sheet.getRange("R" + atPosition);

  stockCell.setValue(ticker);
  gradeCell.setValue(0);
  currentCell.setFormula("0*C" + atPosition);

  copyColumns(["C", "M", "O", "P", "Q", "S"], atPosition, fromPosition);
  undefineColumns(["D", "K", "L"], atPosition);
}

function removeTicker(ini, end) {
  const sheet = SpreadsheetApp.getActiveSheet();

  var ticker = readValue('Remover papel', 'Codigo do papel a ser removido:');

  if (ticker == null) {
    return;
  }

  debug("Searching for ticker " + ticker + " starting on row " + ini + " until row " + end);

  var tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  var rowToDelete = ini;
  var tickerFound = false;

  tickers.forEach(function (t) {

    var matches = t.toString().match(ticker);

    debug("Matches: " + matches);

    if (matches && !tickerFound) {
      if (confirm("Confirmacao", "Confirma deletar a linha " + rowToDelete + " ?")) {
        sheet.deleteRow(rowToDelete);
      }

      tickerFound = true;
    }

    rowToDelete++;
  });

  if (!tickerFound) {
    alert("Codigo nao encontrado")
  }
}

function insertNewFii() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const rowNumber = firstFiiRow + 1;

  var ticker = readValue('Adicionar novo papel', 'Codigo do papel a ser adicionado:');

  if (ticker == null) {
    return;
  }

  sheet.insertRows(rowNumber, 1);

  var stockCell = sheet.getRange("A" + rowNumber);
  var gradeCell = sheet.getRange("M" + rowNumber);
  var currentCell = sheet.getRange("R" + rowNumber);

  gradeCell.setValue(0);
  stockCell.setValue(ticker);
  currentCell.setFormula("0*C" + rowNumber);

  copyColumns(["C", "L", "N", "O", "P", "Q", "S"], rowNumber, firstFiiRow);
  undefineColumns(["D", "E"], rowNumber);
}

function undefineColumns(columnsToUndefine, rowNumber) {
  const sheet = SpreadsheetApp.getActiveSheet();

  for (column of columnsToUndefine) {
    var destColumn = sheet.getRange(column + rowNumber);
    destColumn.setValue("NA");
  }
}

function copyColumns(columnsToCopy, toNumber, fromNumber) {
  const sheet = SpreadsheetApp.getActiveSheet();

  for (column of columnsToCopy) {
    var sourceColumn = sheet.getRange(column + fromNumber);
    var destColumn = sheet.getRange(column + toNumber);

    var origFormula = sourceColumn.getFormula();
    var newFormula = origFormula.replaceAll(fromNumber, toNumber).replaceAll("$" + fromNumber, "$" + toNumber).replaceAll("$74", "$73");

    debug("Copying formula from row [" + fromNumber + "] to row [" + toNumber + "]");
    debug("Formula transformation:  [" + origFormula + "]   ->   [" + newFormula + "]");

    destColumn.setFormula(newFormula);
  }
}

// EOF

/**
 *  Ticker management routines
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 23/05/2026
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
}

function removeCrypto() {
  alert("Nao implementado.");
}

function insertNonBrStock() {
  alert("Nao implementado.");
}

function removeNonBrStock() {
  alert("Nao implementado.");
}


function insertNewStock(atPosition, fromPosition) {
  const sheet = SpreadsheetApp.getActiveSheet();

  let ticker = readValue('Adicionar novo papel', 'Codigo do papel a ser adicionado:');

  if (ticker == null) {
    return;
  }

  sheet.insertRows(atPosition, 1);

  let stockCell = sheet.getRange("A" + atPosition);
  let gradeCell = sheet.getRange("N" + atPosition);
  let currentCell = sheet.getRange("R" + atPosition);

  stockCell.setValue(ticker);
  gradeCell.setValue(0);
  currentCell.setFormula("0*C" + atPosition);

  copyColumns(["C", "M", "O", "P", "Q", "S"], atPosition, fromPosition);
  undefineColumns(["D", "K", "L"], atPosition);
}

function removeTicker(ini, end) {
  const sheet = SpreadsheetApp.getActiveSheet();

  let ticker = readValue('Remover papel', 'Codigo do papel a ser removido:');

  if (ticker == null) {
    return;
  }

  debug("Searching for ticker " + ticker + " starting on row " + ini + " until row " + end);

  let tickers = sheet.getRange("A" + ini + ":A" + end).getValues();
  let rowToDelete = ini;
  let tickerFound = false;

  tickers.forEach(function (t) {

    let matches = t.toString().match(ticker);

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

  let ticker = readValue('Adicionar novo papel', 'Codigo do papel a ser adicionado:');

  if (ticker == null) {
    return;
  }

  sheet.insertRows(rowNumber, 1);

  let stockCell = sheet.getRange("A" + rowNumber);
  let gradeCell = sheet.getRange("M" + rowNumber);
  let currentCell = sheet.getRange("R" + rowNumber);

  gradeCell.setValue(0);
  stockCell.setValue(ticker);
  currentCell.setFormula("0*C" + rowNumber);

  copyColumns(["C", "L", "N", "O", "P", "Q", "S"], rowNumber, firstFiiRow);
  undefineColumns(["D", "E"], rowNumber);
}

function undefineColumns(columnsToUndefine, rowNumber) {
  const sheet = SpreadsheetApp.getActiveSheet();

  for (let column of columnsToUndefine) {
    let destColumn = sheet.getRange(column + rowNumber);
    destColumn.setValue("NA");
  }
}

function copyColumns(columnsToCopy, toNumber, fromNumber) {
  const sheet = SpreadsheetApp.getActiveSheet();

  for (let column of columnsToCopy) {
    let sourceColumn = sheet.getRange(column + fromNumber);
    let destColumn = sheet.getRange(column + toNumber);

    let origFormula = sourceColumn.getFormula();
    let newFormula = origFormula.replaceAll(fromNumber, toNumber).replaceAll("$" + fromNumber, "$" + toNumber).replaceAll("$74", "$73");

    debug("Copying formula from row [" + fromNumber + "] to row [" + toNumber + "]");
    debug("Formula transformation:  [" + origFormula + "]   ->   [" + newFormula + "]");

    destColumn.setFormula(newFormula);
  }
}

// EOF
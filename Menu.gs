/**
 *  Menu related functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 03/12/2023
 * 
 * */

function addMenus() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('- Investimentos -')
    .addItem('Atualizar dados', 'updateAllIndicators')
    .addItem('Ordenar Tudo', 'sortAll')
    .addSubMenu(ui.createMenu('Fundos Imobiliarios')
      .addItem('Ordenar', 'sortFiis')
      .addItem('Mostrar somente ativos', 'hideZeroFiis')
    )
    .addSubMenu(ui.createMenu('Acoes Nacionais')
      .addItem('Ordenar', 'sortBrStocks')
      .addItem('Mostrar somente ativos', 'hideZeroBrStocks')
    )
    .addSubMenu(ui.createMenu('Acoes Internacionais')
      .addItem('Ordenar', 'sortNonBrStocks')
      .addItem('Mostrar somente ativos', 'hideZeroIntStocks')
    )
    .addSubMenu(ui.createMenu('Cryptoativos')
      .addItem('Ordenar', 'sortCrypto')
    )
    .addSeparator()
    .addItem('Ajuda', 'showHelpScreen')
    .addItem('Sobre', 'showSplashScreen')
    .addToUi();
}

function showScreen(fileName, title, height, width) {
  var splashScreen = HtmlService.createHtmlOutputFromFile(fileName)
    .setHeight(height)
    .setWidth(width);

  SpreadsheetApp.getUi()
    .showModalDialog(splashScreen, title);
}

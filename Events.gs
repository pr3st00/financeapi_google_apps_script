/**
 *  Events functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 12/06/2022
 * 
 * */

function onOpen() {
  addMenus();

  if (LOAD_INDICATORS_ON_OPEN) {
    updateAllIndicators();
  }
}

function onEdit(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("CONTROLE");
  var lastModifiedCell = sheet.getRange("B2");

  lastModifiedCell.setValue(new Date());
}

function showSplashScreen() {
  showScreen("Splash", "Controle de Investimentos", 250, 500);
}

function showHelpScreen() {
  showScreen("Help", "Ajuda", 500, 800);
}

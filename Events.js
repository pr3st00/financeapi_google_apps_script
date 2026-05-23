/**
 *  Events functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 01/06/2024
 * 
 * */

function onOpen() {
  addMenus();

  if (LOAD_INDICATORS_ON_OPEN) {
    updateAllIndicators();
  }

  if (SORT_ALL_ON_OPEN) {
    sortAll();
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

// EOF
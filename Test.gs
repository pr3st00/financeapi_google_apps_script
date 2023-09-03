/**
 *  Testing functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 12/06/2022
 * 
 * */

function test() {
  Logger.log("Debug is : " + DEBUG);

  Logger.log("DY of HGLG11 is : " + getIndicator("HGLG11", "dy", "fii"));
  Logger.log("DY of HGLG11 is : " + getFiiIndicator("HGLG11", "dy"));
  Logger.log("DY of ABEV3  is : " + getStockIndicator("ABEV3", "dy"));

  Logger.log("Number of FIIs                    : " + getNumberOfFiis());
  Logger.log("Number of Large Caps              : " + getNumberOfLargeCaps());
  Logger.log("Number of Small Caps is           : " + getNumberOfSmallCaps());
  Logger.log("Number of International Stocks is : " + getNumberOfIntStocks());

  Logger.log("Now updating all indicators...");

  updateAllIndicators();
}

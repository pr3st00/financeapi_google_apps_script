/**
 *  Constants
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 02/09/2023
 * 
 * */

var DEBUG = false;
var LOAD_INDICATORS_ON_OPEN = false;

var VERSION = 1.5;

var stockfundamentusUrlIBM = "https://stockfundamentus.mybluemix.net";
var stockfundamentusUrlHeroku = "https://stockfundamentus.herokuapp.com";
var stockfundamentusUrlHome = "http://presto.sytes.net:8080/fundamentus";
var stockfundamentusUrlRender = "https://fundamentus.onrender.com";

var stockfundamentusUrl = stockfundamentusUrlHome;

var firstFiiRow = 2;
var firstStockRow = 3;
var firstCryptoRow = 2;

var fiisSheetName = "FIIs";
var stocksSheetName = "ACOES NAC";
var intStocksSheetName = "ACOES INT";
var historicalSheetName = "HISTORICO";
var cryptoSheetName = "CRYPTO";

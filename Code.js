function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function loginUser(email, password) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("Users");
  const data = ws.getRange(2, 1, ws.getLastRow() - 1, 2).getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === email && data[i][1] === password) {
      return { success: true };
    }
  }
  return { success: false };
}

function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ws = ss.getSheetByName("Items");
  let res = {};
  res.items = ws.getRange(2 , 1, ws.getLastRow()-1, 5).getValues();
  ws = ss.getSheetByName("Sales");
  res.sales = ws.getRange(2, 1, ws.getLastRow()-1, 6).getValues();
  return res;
}

function setData(data) {
  const importedData = JSON.parse(data);
  const orderLength = importedData.order.length;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ws = ss.getSheetByName("Sales");
  range = ws.getRange(ws.getLastRow()+1, 1, orderLength, 6);
  range.setValues(importedData.order);

  ws = ss.getSheetByName("Payments");
  const paymentColumns = importedData.payment[0].length;
  range = ws.getRange(ws.getLastRow()+1, 1, 1, paymentColumns);
  range.setValues(importedData.payment);
}
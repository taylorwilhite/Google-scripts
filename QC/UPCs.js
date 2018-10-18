function commaSplit(event, title) {
  const arr = event.namedValues[title][0].split(/,\s*/);
  return arr;
};

function onFormSubmit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  var UPCs = commaSplit(e, 'UPC');
  var firstrange = e.range;
  var row = firstrange.getRow();
  var range = sheet.getRange(row, 1, 1, 10);
  var UPCell = range.getCell(1, 6);
  
  var timeStamp = range.getCell(1, 1).getValue();
  var po = range.getCell(1, 2).getValue();
  var supplier = range.getCell(1, 3).getValue();
  var dateRec = range.getCell(1, 4).getValue();
  var tracking = range.getCell(1, 5).getValue();
  var qty = range.getCell(1, 7).getValue();
  var issue = range.getCell(1, 8).getValue();
  var notes = range.getCell(1, 9).getValue();
  var images = range.getCell(1, 10).getValue();
  
  
  UPCell.setValue(UPCs[0]);
  
  if(UPCs.length <= 1){
    return;
  }
  for(i = 1; i < UPCs.length; i += 1) {
    sheet.appendRow([timeStamp, po, supplier, dateRec, tracking, UPCs[i], qty, issue, notes, images]);
  }
}

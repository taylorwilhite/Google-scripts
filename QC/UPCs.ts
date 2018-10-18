function commaSplit(event, title) {
  const arr = event.namedValues[title][0].split(/,\s*/);
  return arr;
};

function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  
  const UPCs = commaSplit(e, 'UPC');
  const firstrange = e.range;
  const row = firstrange.getRow();
  const range = sheet.getRange(row, 1, 1, 10);
  const UPCell = range.getCell(1, 6);
  const qtyCell = range.getCell(1, 7);
  const issueCell = range.getCell(1, 8);
  const noteCell = range.getCell(1, 9);
  
  const timeStamp = range.getCell(1, 1).getValue();
  const po = range.getCell(1, 2).getValue();
  const supplier = range.getCell(1, 3).getValue();
  const dateRec = range.getCell(1, 4).getValue();
  const tracking = range.getCell(1, 5).getValue();
  const qtys = commaSplit(e, 'Qty');
  const issues = range.getCell(1, 8).getValue().split(/,\s*/); // Split manually because issue is not a named value
  const notes = commaSplit(e, 'Notes');
  const images = range.getCell(1, 10).getValue();
  
  
  UPCell.setValue(UPCs[0]);
  qtyCell.setValue(qtys[0]);
  issueCell.setValue(issues[0]);
  noteCell.setValue(notes[0]);
  
  if(UPCs.length <= 1){
    return;
  }
  for(let i = 1; i < UPCs.length; i += 1) {
    sheet.appendRow([timeStamp, po, supplier, dateRec, tracking, UPCs[i], qtys[i], issues[i], notes[i], images]);
  }
}

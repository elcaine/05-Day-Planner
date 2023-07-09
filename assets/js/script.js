// Variables declared and/or initialized
var hourBlocks = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var hourBlocks24 = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var currentHour = dayjs().hour();
var timeSlots;
  
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  timeSlots = $('#time-slots');
  renderHourRows();
  $('#currentDay').text(dayjs().format('dddd MMM D, YYYY'));
});

// localStorage helper: "GET"
function readStoredData(dIn){
  var data = localStorage.getItem(dIn);
  if(data){ return data;}
  else{ return null;}
}

// localStorage helper: "SET"
function saveStoredData(data){
  if(data){
    let hourContainer = $(data.target).closest('[id]');
    let id = $(hourContainer).attr('id');
    let textAreaVal = hourContainer.children('textarea').val();

    localStorage.setItem(id, textAreaVal);
  } //else{ console.log("else'd");}
}

// Primary logic driver
function renderHourRows(){
  // Loop based on hoursBlock:  each time slot built based on numbers in this array
  hourBlocks.forEach(function (num, index){
    let row = $('<div>');
    row.addClass('row time-block');
    // Past/present/future conditionally classed here
    if(currentHour > hourBlocks24[index]){ row.toggleClass("past");}
    else if(currentHour < hourBlocks24[index]){ row.toggleClass("future");}
    else{ row.toggleClass("present");}
    
    let id = 'hour-' + num;
    row.attr('id', id);

    let col = $('<div>');
    col.addClass('col-2 col-md-1 hour text-center py-3');
    let ampm = index > 2 ? num + 'PM' : num + 'AM';
    col.text(ampm);

    // Text area text always pulls from localStorage
    let textarea = $('<textarea>');
    textarea.addClass('col-8 col-md-10 description');
    textarea.attr('rows', 3);
    let x = readStoredData(id);
    textarea.text(x);

    let saveBtn = $('<button>');
    saveBtn.addClass('btn saveBtn col-2 col-md-1');
    saveBtn.attr('aria-label', 'save');
      let iElement = $('<i>');
      iElement.addClass('fas fa-save');
      iElement.attr('aria-hidden', 'true');
      saveBtn.append(iElement);

    row.append(col);
    row.append(textarea);
    row.append(saveBtn);
    timeSlots.append(row);
    // Text area of planner saved on this click listener
    row.on('click', '.saveBtn', saveStoredData);
  });
}

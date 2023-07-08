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
  

  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('dddd MMM D, YYYY  hh:mm'));
});



function readStoredData(){
  var data = localStorage.getItem('data');
  if(data){ data = JSON.parse(data)}
  else{ data = [];}
  return data;
}

function saveStoredData(data){ localStorage.setItem('data', JSON.stringify(data));}

function renderHourRows(){
  hourBlocks.forEach(function (thing, index){
    //console.log("thing: ", thing, "\tindex: ", index, "\t", hourBlocks24[index]);
    let row = $('<div>');
    row.addClass('row time-block');
    if(currentHour > hourBlocks24[index]){ row.toggleClass("past");}
    else if(currentHour < hourBlocks24[index]){ row.toggleClass("future");}
    else{ row.toggleClass("present");}
    
    let id = 'hour-' + thing;
    row.attr('id', id);

    let col = $('<div>');
    col.addClass('col-2 col-md-1 hour text-center py-3');
    let ampm = index > 2 ? thing + 'PM' : thing + 'AM';
    col.text(ampm);

    let textarea = $('<textarea>');
    textarea.addClass('col-8 col-md-10 description');
    textarea.attr('rows', 3);

    let saveBtn = $('<button>');
    saveBtn.addClass('btn saveBtn col-2 col-md-1');
    saveBtn.attr('aria-label', 'save');
      let iElement = $('<i>');
      iElement.addClass('fas fa-save');
      iElement.attr('aria-hidden', 'true');
      saveBtn.append(iElement);

    row.on('click', '.saveBtn', function(e){
      console.log("e>>> ", e.target.parent);
    });
    row.append(col);
    row.append(textarea);
    row.append(saveBtn);
    timeSlots.append(row);;
  });
}
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
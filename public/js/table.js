/*

*/

var database = firebase.database();
$(function () {

//populates alumni DataTable
  var alumniRef = database.ref('/alumni/');
  alumniRef.once('value', function(snapshot) {
    $data = Object.values(snapshot.val());
    $('#table_id').DataTable({data: $data, columns: [
        { data: 'name' },
        { data: 'gradYear' },
        { data: 'career1' },
        { data: 'city' },
        { data: 'state' }
    ]});
  });

  $("#table").on("click", function(e) {
      e.preventDefault();                    // Prevent default action of button
      e.stopPropagation();
      console.log($(this).children(".gradYear"));                                // Get the element the user clicked on
         // Select child panel
  });
});

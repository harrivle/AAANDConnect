/*

*/

var database = firebase.database();
var data;

$(function () {
  getAlumniTable();
});

//populates table for FindMentors function for students
function getAlumniTable(){
  var alumniRef = database.ref('/alumni/');
  alumniRef.once('value', function(snapshot) {
    data = Object.values(snapshot.val());
    $('#table').bootstrapTable({
      data: data
    });
  });
}

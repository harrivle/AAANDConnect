
$(function() {

  $("#update-profile-form").removeClass('hidden');
  $(".update-" + gradStatus + "-form").removeClass('hidden');

  //? TODO: check how this loads the list of majors
  // ifstatement for gradstatus
  //$("#major1").click(function() {
  //    $("#major1").load("txt/undergrad-majors.txt");
  //});


  });

  function goToMain(){
    window.location.href = "main.html";
  }

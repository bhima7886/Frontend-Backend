jQuery(document).ready(function() {
  var apiUrl = 'http://localhost:3000/student/get-record/'; 
  //var apiPostUrl=`http://localhost:3000/student/add-record`;
  var apiDeleteUrl=`http://localhost:3000/student/delete-record`;
  var apiUpdateUrl=`http://localhost:3000/student/update-record`;

 
  function getStudents() {
    $.ajax({
      url: apiUrl,
      type: 'GET',
      success: function(data) {
        updateTable(data);
        console.log(data)
      },
      error: function(error) {
        console.error('Error fetching users:', error);
      }
    });
  }


  function addStudent(formData) {
  var userData =formData

    $.ajax({
      "url": "http://localhost:3000/student/add-record",
      "type": 'POST',
       "data": userData,
      success: function() {
          alert("Data submitted successfully")
        getStudents();

      },
      error: function(error) {
        console.error('Error adding user:', error);
      }
    });
  }


  function deleteStudent(id) {
    $.ajax({
      url: apiDeleteUrl + '/' + id,
      type: 'DELETE',
      success: function() {
        getStudents();
      },
      error: function(error) {
        console.error('Error deleting user:', error);
      }
    });
  }


  function updateStudent(id, name,std,rollno,english,marathi,physics,chemistry,maths,electronics) {
    var userData = { name: name, std:std,rollno:rollno,english:english,marathi:marathi,physics:physics,chemistry:chemistry,maths:maths,electronics:electronics};

    $.ajax({
      url: apiUpdateUrl + '/' + id,
      type: 'PUT',
      data: userData,
      success: function() {
        getStudents();
      },
      error: function(error) {
        console.error('Error updating user:', error);
      }
    });
  }


  function updateTable(users) {
    var tableBody = $('#userTable tbody');
    tableBody.empty(); 
  
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      var row = $('<tr>');
      row.append($("<td>").text(user._id))
      row.append($('<td>').text(user.name));
      row.append($('<td>').text(user.std));
      row.append($("<td>").text(user.rollno));
      row.append($("<td>").text(user.english))
      row.append($("<td>").text(user.marathi));
      row.append($("<td>").text(user.physics));
      row.append($("<td>").text(user.chemistry));
      row.append($("<td>").text(user.maths));
      row.append($("<td>").text(user.electronics));
      row.append($("<td>").text(user.totalMarks));
      row.append($("<td>").text(user.percentage));
      row.append($('<td>').html('<button class="updateBtn" data-id="' + user._id + '">Update</button> <button class="deleteBtn" data-id="' + user._id + '">Delete</button>'));
      tableBody.append(row);
    }
  }

 
  $('#userForm').submit(function(e) {
    e.preventDefault(); 
var formData={
  name:$("#name").val(),
   std:$("#std").val(),
    rollno:$("#rollno").val(),
   english:$("#english").val(),
    marathi:$("#marathi").val(),
    physics:$("#physics").val(),
    chemistry:$("#chemistry").val(),
    maths:$("#maths").val(),
    electronics:$("#electronics").val(),
} 
if(formData.english<=99 && formData.marathi<=99 && formData.physics<=99 && formData.chemistry<=99 &&formData.maths<=99 && formData.electronics<=99)
{

  addStudent(formData);
}
else{
  alert("please enter valid marks")
}
   console.log(formData.name+" "+formData.std+" "+formData.english+" "+formData.marathi+" "+formData.physics+" "+formData.chemistry+" "+formData.maths+" "+formData.electronics)


    $('#name').val('');
    $('#std').val('');
    $("#rollno").val('');
    $("#english").val('');
    $("#marathi").val('');
    $("#physics").val('');
    $("#chemistry").val('');
    $("#maths").val('');
    $("#electronics").val('');
  });

 
  $(document).on('click', '.deleteBtn', function() {
    var id = $(this).data('id');
    console.log(id)
    deleteStudent(id);
  });

  $(document).on('click', '.updateBtn', function() {
    var id = $(this).data('id');
    console.log(id)
  /*  var name = prompt('Enter updated name:');
    var  Class = prompt('Enter updated Class:');
    var marks= prompt('Enter updated marks:');
    var collegeName= prompt('Enter updated collegeName:');
    var city = prompt('Enter updated city:');
*/
var name = prompt('Enter updated name:');
var  std= prompt('Enter updated std:');
var rollno= prompt('Enter updated roll no:');
var  english= prompt('Enter updated english marks:');
var  marathi= prompt('Enter updated marathi marks:');
var  physics= prompt('Enter updated physics marks:');
var  chemistry= prompt('Enter updated chemistry marks:');
var  maths= prompt('Enter updated maths marks:');
var  electronics= prompt('Enter updated electronics marks:');
    if ((id,name,std,rollno,english) && (marathi,physics,chemistry,maths,electronics)) {
      updateStudent(id,name,std,rollno,english,marathi,physics,chemistry,maths,electronics);
    }
  });

 /// getUsers();
});

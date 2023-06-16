jQuery(document).ready(function () {
  jQuery(document).ready(function () {

    let A=Cookies.get("token");
    console.log("A"+A)
 
   
// Function to retrieve the value of a specific cookie by its name
function getCookieValue(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();

    if (cookie.indexOf(name) === 0) {
      var cookieValue = cookie.substring(name.length, cookie.length);
      return JSON.parse(cookieValue); // Parse the cookie value as JSON
    }
  }

  return null;
}
console.log(getCookieValue(A))

// Example usage
var data = getCookieValue("my_cookie");

console.log(data);





  
    var apiUrl = 'http://localhost:3000/student/get-record/';
    var apiDeleteUrl = `http://localhost:3000/student/delete-record`;
    var apiUpdateUrl = `http://localhost:3000/student/update-record`;


    function getStudents() {
      $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function (data) {
          updateTable(data);
          console.log(data)
       //   $.cookie("Data",data);
         // document.cookie = "Data=" + encodeURIComponent(data);
         // var cookies = decodeURIComponent(document.cookie);
         // console.log("Cookies Data"+" "+cookies)
         // var cookieData = null;
          
         /* if (cookies && cookies.length > 0) {
            var cookieArray = cookies.split(';');
          
            for (var i = 0; i < cookieArray.length; i++) {
              var cookie = cookieArray[i].trim().name;
          
              if (cookie.indexOf("Data=") === 0) {
                cookieData = decodeURIComponent(cookie.substring(5));
                break;
              }
            }
          }*/
         


          
       
        },  
        error: function (error) {
          console.error('Error fetching users:', error);
        }
      });
    }
    function deleteStudent(id) {
      $.ajax({
        url: apiDeleteUrl + '/' + id,
        type: 'DELETE',
        success: function () {
          getStudents();
        },
        error: function (error) {
          console.error('Error deleting user:', error);
        }
      });
    }


    function updateStudent(id, name, std, rollno, english,marathi,physics,chemistry,maths,electronics) {
      var userData = { name: name, std: std, rollno:rollno, english:english, marathi:marathi,physics,chemistry,maths,electronics };

      $.ajax({
        url: apiUpdateUrl + '/' + id,
        type: 'PUT',
        data: userData,
        success: function () {
          getStudents();
        },
        error: function (error) {
          console.error('Error updating user:', error);
        }
      });
    }

    function updateTable(users) {
      var tableBody = $('#userTable tbody');
      tableBody.empty();

      for (var i = 11; i < 22; i++) {
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
        row.append($("<td>").text(user.percentage))
        row.append($('<td>').html('<button class="updateBtn" data-id="' + user._id + '">Update</button> <button class="deleteBtn" data-id="' + user._id + '">Delete</button>'));
        tableBody.append(row);
      }
    }
    $(document).on('click', '.deleteBtn', function () {
      var id = $(this).data('id');
      console.log(id)
      deleteStudent(id);
    });

    $(document).on('click', '.updateBtn', function () {
      var id = $(this).data('id');
      console.log(id)
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
        updateStudent(id, name, std, rollno, english, marathi,physics,chemistry,maths,electronics);
      }
    });

    getStudents();
  })
})
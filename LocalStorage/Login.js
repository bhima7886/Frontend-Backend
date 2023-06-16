

jQuery(document).ready(function () {
    $("#nav").click(function () {
        window.location.href = "Signup.html";
    })
    $("#login-form").submit(function (event) {
        event.preventDefault();

        var formData = {
            email: $("#email").val(),
            password: $("#password").val()

        }

        // var email= $("#email").val()
        // var password= $("#password").val()

        //console.log(email + " " + password);
        // var storedFormData=getCookie("userData");
        //var storedUserData=$.cookie('userData');
        //console.log("storedUserData",storedUserData)

        //console.log(storedUserData.email)
        //   console.log("storedFormData",storedFormData)

        //var userData=JSON.parse(storedUserData);

        //  console.log("UserData",storedUserData)
        /*if(storedUserData){
            var userData=JSON.parse(value);
            if(userData.email===email )
            {
                alert("Successful")
                window.location.href="Student.html"
                return;

            }
        }*/
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/user/login",
            contentType: "application/json",
            data: JSON.stringify(formData),
            
              success:function(response)
              {
                if (response.token == undefined) {
                    //window.location.href="Student.html";
                    //document.cookie="token="+response.token;
                    // console.log("Response Token", response.token);

                    alert("Login Failed")
                }
                else {

                    Cookies.set('token',response.token);
                    alert("Login Successful")
                   window.location.href = "Student.html";
                    
               
                }
            },
            errror: function (xhr, status, error) {
                if (xhr.status === 401) {
                    alert("Invalid password")
                }
                else {
                    alert("An error occured")
                }
                console.log(err);
            }
        });


    });
})
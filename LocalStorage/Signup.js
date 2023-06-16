jQuery(document).ready(function()
{
    $("#login").click(function()
    {
        window.location.href="Login.html"
    })
    $("#signUp-form").submit(function (event) { 
    event.preventDefault();
    const name=$("#name").val();
    const email=$("#email").val();
    const password=$("#password").val();
    const confirmPassword=$("#confirm-password").val();
    if(password!==confirmPassword)
    {
        alert("Password do not match");
        return ;
    }
    const userData={
        name:name,
        email:email,
        password:password
    };
    console.log(userData.name+" "+userData.email+" "+userData.password)
     $.ajax({
        type: "POST",
        url: "http://localhost:3000/user/signUp",
        data: JSON.stringify(userData),
        contentType:"application/json",
        success: function (response) {
            console.log(response);
            console.log(response.token);
            if(response.token==undefined)
            {
                alert("User is alerady registered");
            }
            else{
                  alert("User registered successfully");
            }
       //$.cookie('formData',JSON.stringify(response))
        //$.cookie("userData",JSON.stringify(response));
         //alert("Signup Successful");
        },
        error:function(err){
            console.log(err)
        }
     });
    });
})
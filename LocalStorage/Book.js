jQuery(document).ready(function()
{
    var apiUrl="http://localhost:3000/book/get-book";
    var apiUrl1 = 'http://localhost:3000/student/get-record/'; 
    $.ajax({
        type: "GET",
        url: apiUrl1,
        success: function (response) {
            console.log(response)
           updateTable(response)
          
        }
    });


    function updateTable(response)
    {
        var tableBody=$("#table");
    
     
        for(var i=0;i<response.length;i++)
        {
            var response=response[i];
            var row=$("<tr>");
           // row.append($("<td>").text(user._id))
            row.append($("<td>").text(response._id));
            row.append($("<td>").text(response.name));
            row.append($("<td>").text(response.std));
            
            tableBody.append(row);
        }

    }
})
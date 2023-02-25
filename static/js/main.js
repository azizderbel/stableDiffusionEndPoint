$(document).ready(function() {
    $(".progress").hide();
    $("#submit").click(function() {
        userPrompt = $("#user-prompt").val()
        if (userPrompt) {
            $(".progress").show();
            $.ajax({
                type : "POST",
                url : '/submit-prompt',
                dataType: "json",
                data: {
                    "prompt-input" : userPrompt
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (data) {
                    console.log(data)
                    }
                });  
        $(".progress").hide();
        }
      });
});
$(document).ready(function() {
    $(".progress").hide();

    const getImage = function(userPrompt) {
        $(".progress").show();
        $.ajax({
            type : "POST",
            url : '/submit-prompt',
            data: {
                "prompt-input" : userPrompt
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (data,status,obj) {
                $('.mainImg').attr('src',data)
            },
        });  
        $(".progress").hide();
    }

    
    $("#submit").click(function() {
        userPrompt = $("#user-prompt").val()
        if (userPrompt) {
            getImage(userPrompt)
        }
      });
});
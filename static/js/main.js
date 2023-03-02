$(document).ready(function() {

    const getSeed = function() {
        return $("#seed").val()
    }

    const getSchedulerName = function() {
        return $("#scheduler").val()
    }

    const setSchedulers = function() {
        return {
            "LMSDiscrete" : null,
            "DDIM" : null,
            "DPMSolverMultistep" : null,
            "EulerDiscrete" : null,
            "PNDM" : null,
            "DDPM" : null,
            "EulerAncestralDiscrete" : null
        }
    }

    const getImage = function(userPrompt) {
        let seed = getSeed()
        let scheduler = getSchedulerName()
        let gpu = $("#gpu").prop("checked")
        $.ajax({
            type : "POST",
            url : '/submit-prompt',
            data: {
                "prompt-input" : userPrompt,
                "seed" : seed,
                "scheduler" : scheduler,
                "gpu" : gpu
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (data,status,obj) {
                $('.mainImg').attr('src',data)
            },
            complete: function() {
                $(".progress").hide()
            }
        });  
    }

    const init = function() {
        $(".progress").hide()
        $('input.autocomplete').autocomplete({
            data: setSchedulers()
          });
    }

    M.AutoInit()
    init()

    $("#submit").click(function() {
        userPrompt = $("#user-prompt").val()
        if (userPrompt) {
            $(".progress").show()
            getImage(userPrompt)    
        }
      });
});
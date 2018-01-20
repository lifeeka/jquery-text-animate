;(function ($) {

    $.fn.TextAnimate = function (options) {
        var opts = $.extend({}, $.fn.TextAnimate.defaults, options);

        return this.each(function () {

            if (!$("#jquery-text-animate-style").length) {

                $("head").append("<style id='jquery-text-animate-style'>"
                    + ".ficTextAni"
                    + "{"
                    + "	padding-bottom: 5px; padding-top: 5px;position: relative;"
                    + "	display: inline;"
                    + "	background: -webkit-gradient( linear, left top, left bottom, color-stop(0.05, #9DCE2C), color-stop(1, rgba(140, 184, 43, 0.9)) );"
                    + "	background: -moz-linear-gradient( center top, rgb(157, 206, 44) 5%, rgba(140, 184, 43, 0.9) 100% );"
                    + "	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#9dce2c', endColorstr='#8cb82b');"
                    + "	border: 1px solid #69A00F !important;"
                    + "	color: #FFF !important;}"
                    + "</style>");

            }

            if (!$("#jquery-text-animate").length) {
                $("body").append("<div style='display:none' id='jquery-text-animate'></div>");
            }

            if (opts.type === "Start") {
                var text = $(opts.El).text();
                var ClearTime = startTextAnimate(text);
                opts.callback(ClearTime);

            }
            if (opts.type === "Stop") {
                stopTextAnimate($(opts.El).text());
            }

            function stopTextAnimate(text) {
                var elmnt = getTimeClearELIDByEl(opts.El);

                $("." + elmnt).each(function (index, element) {

                    var clTmID = parseInt($(this).val());
                    clearInterval(clTmID);

                    $("." + elmnt).remove();

                });


                $(opts.El).html(text);
            }

            function getTimeClearELIDByEl(elID) {
                var elID = elID.replace(/'/g, "");
                elID = elID.replace(/"/g, "");
                elID = elID.replace(/#/g, "");
                elID = elID.replace(/\./g, "");
                elID = elID.replace(/\[/g, "");
                elID = elID.replace(/\]/g, "");
                elID = elID.replace(/\=/g, "");
                elID = elID.replace(/\ /g, "_") + "_jquery-text-animate";


                return elID;

            }

            function startTextAnimate(text) {

                var cuntCha = 0;

                var rvs = false;

                var timeoutId = setInterval(function () {

                    var aniText = "<span class='ficTextAni'>" + text[cuntCha] + "</span>";

                    var fstCh = text.substring(0, cuntCha);
                    var lstCh = text.substring(cuntCha + 1, text.length);

                    aniText = fstCh + aniText + lstCh;


                    $(opts.El).html(aniText);

                    if (rvs) {
                        cuntCha--;
                    }
                    else {
                        cuntCha++;
                    }


                    if (text.length < cuntCha + 2) {
                        rvs = true;
                    }
                    else if (cuntCha < 1) {
                        rvs = false;
                    }


                }, 100);


                var elID = getTimeClearELIDByEl(opts.El);

                $("#jquery-text-animate").append("<input type='hidden' value='" + timeoutId + "' class='" + elID + "' />");

                return timeoutId;
            }


        });


    };
    $.TextAnimate = {};

    $.fn.TextAnimate.defaults = {
        type: "Start",
        timeID: "",
        El: "",
        callback: function () {
        }
    };


})(jQuery);







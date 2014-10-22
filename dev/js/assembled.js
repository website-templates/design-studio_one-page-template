/* 
 * navigation script: sticky nav, anchor smooth scrolling, selecting current nav item 
*/
$(function () {
	"use strict";
    //Sticky navbar. We take offset top of navbar and compare with top scroll, in result - add or remove .is-fixed class
    var navTopOffset = $('.js-header').offset().top,
		contentTopOffset = $('.js-header').height(),
		anchor = $(".js-scroll, .js-active"),
		navLinks = $(".js-active"),
		aArray = [],
		i;

	//Highlight nav list item when current section visible
	//Originally this way is belong to http://www.callmenick.com    
    for (i = 0; i < navLinks.length; i += 1) {
        var link = navLinks[i],
			ahref = $(link).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

	//Note that anchor can`t be empty(like #) because in code below id offset will be undefined and script won't work
    $(window).scroll(function () {
        var windowPos = $(window).scrollTop() + contentTopOffset, // get the offset of the window from the top of page
			windowHeight = $(window).height(), // get the height of the window
			docHeight = $(document).height(),
            navActiveCurrent = $(".is-active").attr("href");

        for (i = 0; i < aArray.length; i += 1) {
            var theID = aArray[i],
				sectPos = $(theID).offset().top - contentTopOffset, // get the offset of the div from the top of page
				sectHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= sectPos && windowPos < (sectPos + sectHeight)) {
                $(".js-active[href='" + theID + "']").addClass("is-active");
            } else {
                $(".js-active[href='" + theID + "']").removeClass("is-active");
            }
        }
		//highlight last nav list item on last section
        if (windowPos + windowHeight === docHeight) {
            if (!$(".js-nav").find("li:last-child").find(".js-active").hasClass("is-active")) {
                $(".js-active[href='" + navActiveCurrent + "']").removeClass("is-active");
                $(".js-nav").find("li:last-child").find(".js-active").addClass("is-active");
            }
        }

		//highlight first nav item when first section has some top offset
		if (windowPos < contentTopOffset) {
            if (!$(".js-nav").find("li:first-child").find(".js-active").hasClass("is-active")) {
                $(".js-active[href='" + navActiveCurrent + "']").removeClass("is-active");
                $(".js-nav").find("li:first-child").find(".js-active").addClass("is-active");
            }
        }
    });

    $(window).scroll(function () {
		var topScroll = $(window).scrollTop();
		if (topScroll > navTopOffset) {
			$('.js-header')
							.addClass('is-fixed')
							.next()
							.css("margin-top", contentTopOffset);
		} else {
			$('.js-header')
							.removeClass('is-fixed')
							.next()
							.removeAttr("style");
		}
    });

    //Smooth anchor scroll, targeted to our nav links with .js-link class... Actually this thing was modified on csstricks 
	anchor.click(function () {
		if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				$("html,body").animate({
					scrollTop: target.offset().top - contentTopOffset
				}, 1000);
				return false;
			}
		}
	});

});

//portfolio filter script to 'mix' items
$(function () {
	'use strict';
	var filterLink = $('.js-filter');
    filterLink.on("click", function (e) {
		if (!$(this).hasClass("is-selected")) {
			filterLink.removeClass('is-selected');
			$(this).addClass('is-selected');

			var filterVal = $(this).data("filter").toLowerCase();

			$('.js-item').each(function () {
				var itemVal = $(this).data("cat").toLowerCase();
				if (!$(this).is("[data-cat*=" + filterVal + "]")) {
					$(this).addClass('is-hidden', 500);
				} else {
					$(this).removeClass('is-hidden', 500);
				}
			});
		}
		return false;
    });
});

// JavaScript Document



	/** sign up form **/
	$(document).ready(function() {
        Parse.initialize("4qBl1DjcQ9oL4dsfn5H0ivnsjdjS8lafrivK8xl3", "G9w6N59XLGZuPrvJWqQmSzwr6oulrMGflrpeOjd6");
        var SignUpUser = Parse.Object.extend("SignupUser");
        $("#signup-msg").hide();
        $("#signup-warning").hide();
		$("#try-now").click(function() {
			$("#mc_embed_signup").slideDown(600, function() {
				// $("#mc-embedded-subscribe").show();
				// $("#try-now").hide();
				
		  	});
		  	$("#try-now").slideUp(600, function() {
		  		
		  	});
		});

		$("#mc-embedded-subscribe").click(function() {
            signUpUser();
		});

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function signUpUser() {
            var successMsg = "Success! You'll be among the first to receive early access to Shiftmates.";
            var errorMsg = "Uh oh, our system glitched. Try again.";
            var email = $("#email").val();
            if ( typeof email == 'undefined' || email == "" || !validateEmail(email) ) {
                $("#signup-warning").text("Please provide a valid email address.");
                $("#signup-warning").show();
                console.log("Missing email");
            } else {
                $("#signup-warning").hide();
                var address = getAddress();
                var newUser = new SignUpUser();
                newUser.set("email", $("#email").val());
                newUser.set("first_name", $("#first_name").val());
                newUser.set("last_name", $("#last_name").val());
                newUser.set("company", $("#company").val());
                newUser.set("address", address);

                newUser.save(null, {
                    success: function(newUser) {
                        $("#mc_embed_signup").hide();
                        $("#signup-msg").text(successMsg);
                        $("#signup-msg").show();

//                        alert("Signed up!");
                        console.log("You are signed up!");
                    },
                    error: function(newUser, error) {
                        alert("Error signing up!");
                        $("#signup-msg").text(errorMsg);
                        $("#signup-msg").show();
                        console.log("Error signing up: " + JSON.stringify(error));
                    }
                });
            }

        }

	});



    function getAddress() {

        $.getJSON("http://beta.shiftmates.net/ping?callback=?", function(data){
            console.log("Address is " + data.ping);
            return data.ping;
        });
    }

    function getAddress2() {
        $.ajax({
            type: 'GET',
            url: 'http://beta.shiftmates.net/ping?callback=photos',
            dataType: 'jsonp',
            jsonpCallback: 'photos',
            jsonp: 'callback',
            success: function(json) {
                console.log("2 Address is " + json.ping);
                return json.ping;
            },
            error: function(e) {
                console.log("2 Error is " + e.message);
                return null;
            }
        });
    }

    function photos (data) {
        console.log("photos " + data);
    }



	/*----------------------------------------------------*/
	/*	preLoader
	/*----------------------------------------------------*/
	// $(document).ready(function(){
	
	// 	"use strict";
	
	// 	$('body').jpreLoader({
	// 		loaderVPos: '50%',
	// 		autoClose: true,
	// 	}, 
	// 	function() {	
	// 		$('body').animate({"opacity":'1'},{queue:false,duration:1200,easing:"easeInOutQuad"});
	// 	});
		
	// });
	
	
	
	/*----------------------------------------------------*/
	/*	Mobile Menu Toggle
	/*----------------------------------------------------*/
	$(document).ready(function() {
		
		"use strict";	

		$('.navbar-nav li a').click(function() {				
			$('#navigation-menu').css("height", "1px").removeClass("in").addClass("collapse");
			$('#navigation-menu').removeClass("open");				
		});			
	});
	
	
	
	/*----------------------------------------------------*/
	/*	Template Animations
	/*----------------------------------------------------*/
	$(document).ready(function(){
	
		"use strict";
	
		$('#cover').waypoint(function() {
			setTimeout(function(){$('#cover_description').addClass('animated fadeInLeft')},600);			
            setTimeout(function(){$('#cover_image').addClass('animated fadeInRight')},600);			
        }, { offset: '90%' });
		
	});
	
	
	/*----------------------------------------------------*/
	/*	ScrollUp
	/*----------------------------------------------------*/
	/**
	* scrollUp v1.1.0
	* Author: Mark Goodyear - http://www.markgoodyear.com
	* Git: https://github.com/markgoodyear/scrollup
	*
	* Copyright 2013 Mark Goodyear
	* Licensed under the MIT license
	* http://www.opensource.org/licenses/mit-license.php
	*/

	$(document).ready(function(){

		'use strict';

		$.scrollUp = function (options) {

			// Defaults
			var defaults = {
				scrollName: 'scrollUp', // Element ID
				topDistance: 300, // Distance from top before showing element (px)
				topSpeed: 1200, // Speed back to top (ms)
				animation: 'slide', // Fade, slide, none
				animationInSpeed: 200, // Animation in speed (ms)
				animationOutSpeed: 200, // Animation out speed (ms)
				scrollText: '', // Text for element
				scrollImg: false, // Set true to use image
				activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
			};

			var o = $.extend({}, defaults, options),
				scrollId = '#' + o.scrollName;

			// Create element
			$('<a/>', {
				id: o.scrollName,
				href: '#top',
				title: o.scrollText
			}).appendTo('body');
			
			// If not using an image display text
			if (!o.scrollImg) {
				$(scrollId).text(o.scrollText);
			}

			// Minium CSS to make the magic happen
			$(scrollId).css({'display':'none','position': 'fixed','z-index': '2147483647'});

			// Active point overlay
			if (o.activeOverlay) {
				$("body").append("<div id='"+ o.scrollName +"-active'></div>");
				$(scrollId+"-active").css({ 'position': 'absolute', 'top': o.topDistance+'px', 'width': '100%', 'border-top': '1px dotted '+o.activeOverlay, 'z-index': '2147483647' });
			}

			// Scroll function
			$(window).scroll(function(){	
				switch (o.animation) {
					case "fade":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed) );
						break;
					case "slide":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed) );
						break;
					default:
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0) );
				}
			});

			// To the top
			$(scrollId).click( function(event) {
				$('html, body').animate({scrollTop:0}, o.topSpeed);
				event.preventDefault();
			});

		};
		
		$.scrollUp();

	});
	
	
	
	/*----------------------------------------------------*/
	/*	Animated Scroll To Anchor
	/*----------------------------------------------------*/
	/**
	 * Animated Scroll To Anchor v0.3
	 * Author: David Vogeleer
	 * http://www.individual11.com/
	 *
	 * THANKS:
	 *
	 * -> solution for setting the hash without jumping the page -> Lea Verou : http://leaverou.me/2011/05/change-url-hash-without-page-jump/
	 * -> Add stop  - Joe Mafia
	 * -> add some easing - Daniel Garcia
	 * -> added use strict, cleaned up some white space adn added conditional for anchors without hashtag -> Bret Morris, https://github.com/bretmorris
	 *
	 * TODO:
	 * -> Add hashchange support, but make it optional http://leaverou.me/2011/05/get-your-hash-the-bulletproof-way/
	 *
	 * Licensed under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 * 
	 */
	 
	$(document).ready(function(){


		"use strict";
		$.fn.scrollTo = function( options ) {

			var settings = {
				offset : -60,       //an integer allowing you to offset the position by a certain number of pixels. Can be negative or positive
				speed : 'slow',   //speed at which the scroll animates
				override : null,  //if you want to override the default way this plugin works, pass in the ID of the element you want to scroll through here
				easing : null //easing equation for the animation. Supports easing plugin as well (http://gsgd.co.uk/sandbox/jquery/easing/)
			};

			if (options) {
				if(options.override){
					//if they choose to override, make sure the hash is there
					options.override = (override('#') != -1)? options.override:'#' + options.override;
				}
				$.extend( settings, options );
			}

			return this.each(function(i, el){
				$(el).click(function(e){
					var idToLookAt;
					if ($(el).attr('href').match(/#/) !== null) {
						e.preventDefault();
						idToLookAt = (settings.override)? settings.override:$(el).attr('href');//see if the user is forcing an ID they want to use
						//if the browser supports it, we push the hash into the pushState for better linking later
						if(history.pushState){
							history.pushState(null, null, idToLookAt);
							$('html,body').stop().animate({scrollTop: $(idToLookAt).offset().top + settings.offset}, settings.speed, settings.easing);
						}else{
							//if the browser doesn't support pushState, we set the hash after the animation, which may cause issues if you use offset
							$('html,body').stop().animate({scrollTop: $(idToLookAt).offset().top + settings.offset}, settings.speed, settings.easing,function(e){
								//set the hash of the window for better linking
								window.location.hash = idToLookAt;
							});
						}
					}
				});
			});
		};
		  
		$('#GoToHome, #GoToMainContent, #GoToFeatures, #GoToTeam, #GoToPricing, #GoToFaq, #GoToContact, #GoToSubscribe' ).scrollTo({ speed: 1400 });

	});
	
	
	
	/*----------------------------------------------------*/
	/*	Current Menu Item
	/*----------------------------------------------------*/
	
	$(document).ready(function() {
		
		//Bootstraping variable
		headerWrapper		= parseInt($('#navigation-menu').height());
		offsetTolerance	= 300;
		
		//Detecting user's scroll
		$(window).scroll(function() {
		
			//Check scroll position
			scrollPosition	= parseInt($(this).scrollTop());
			
			//Move trough each menu and check its position with scroll position then add selected-nav class
			$('.navbar-nav > li > a').each(function() {

				thisHref				= $(this).attr('href');
				thisTruePosition	= parseInt($(thisHref).offset().top);
				thisPosition 		= thisTruePosition - headerWrapper - offsetTolerance;
				
				if(scrollPosition >= thisPosition) {
					
					$('.selected-nav').removeClass('selected-nav');
					$('.navbar-nav > li > a[href='+ thisHref +']').addClass('selected-nav');
					
				}
			});
			
			
			//If we're at the bottom of the page, move pointer to the last section
			bottomPage	= parseInt($(document).height()) - parseInt($(window).height());
			
			if(scrollPosition == bottomPage || scrollPosition >= bottomPage) {
			
				$('.selected-nav').removeClass('selected-nav');
				$('navbar-nav > li > a:last').addClass('selected-nav');
			}
		});
		
	});

	
	
	/*----------------------------------------------------*/
	/*	Flexslider
	/*----------------------------------------------------*/
	
	$(document).ready(function(){
	
		"use strict";

		$('.flexslider').flexslider({
			animation: "fade",
			controlNav: true,
			directionNav: false,  
			slideshowSpeed: 4000,   
			animationSpeed: 800,  
			start: function(slider){
				$('body').removeClass('loading');
			}
		});

	});

	
	
	/*----------------------------------------------------*/
	/*	Accordion
	/*----------------------------------------------------*/
	
	$(document).ready(function(){
	
		"use strict";

		$('ul.accordion').accordion();
		
	});
	
	
	
	/*----------------------------------------------------*/
	/*	Tooltip
	/*----------------------------------------------------*/
	
	$(document).ready(function(){
	
		"use strict";

		jQuery("[rel='tooltip']").tooltip();
		
	});

	
	
	/*----------------------------------------------------*/
	/*	Contact Form Validation
	/*----------------------------------------------------*/
	
	$(document).ready(function(){
	
		"use strict";

		$("#contact-form").validate({
			rules:{ 
				first_name:{
					required: true,
					minlength: 4,
					maxlength: 16
					},
					email:{
						required: true,
						email: true
					},					
					message:{
						required: true,
						minlength: 2
						}
					},
					messages:{
							email:{
								required: "We need your email address to contact you",
								email: "Your email address must be in the format of name@domain.com"
							}, 
							message:{
								required: "Please enter no more than (2) characters"
							}
						}
		});			
		
	});
	
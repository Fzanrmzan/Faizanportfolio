 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	disable: 'mobile',
 	once: true
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: true,
    scrollProperty: 'scroll',
    mobile: {
        breakpoint: 768,
        hideElement: true
    }
  });


	var fullHeight = function() {
		let resizeTimer;
		const setHeight = () => {
			$('.js-fullheight').css('height', $(window).height());
		};
		
		setHeight();
		$(window).on('resize', function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(setHeight, 250);
		});
	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {
		$('body').on('click', '.js-fh5co-nav-toggle', function(event) {
			event.preventDefault();
			
			const nav = $('#ftco-nav');
			const $this = $(this);
			
			if (nav.hasClass('show')) {
				$this.removeClass('active');
				nav.removeClass('show');
				nav.slideUp(400);
			} else {
				$this.addClass('active');
				nav.addClass('show');
				nav.slideDown(400);
			}
		});
		
		// Only close menu when clicking outside on mobile
		$(document).on('click', function(event) {
			if (window.innerWidth <= 768) {
				if (!$(event.target).closest('#ftco-nav, .js-fh5co-nav-toggle').length) {
					$('#ftco-nav').removeClass('show').slideUp(400);
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});

		// Add this to handle nav links clicks on mobile
		$('#ftco-nav .nav-link').on('click', function() {
			if (window.innerWidth <= 768) {
				$('#ftco-nav').removeClass('show').slideUp(400);
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});
	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    smartSpeed: 600,
	    autoplayTimeout: 5000,
	    responsive:{
	      0:{
	        items:1,
	        nav: false
	      },
	      600:{
	        items:1,
	        nav: false
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		let scrollTimer;
		$(window).on('scroll', function() {
			if (!scrollTimer) {
				scrollTimer = setTimeout(function() {
					const st = $(this).scrollTop();
					const navbar = $('.ftco_navbar');
					const sd = $('.js-scroll-wrap');

					navbar.toggleClass('scrolled', st > 150);
					navbar.toggleClass('awake', st > 350);
					navbar.toggleClass('sleep', st < 350);
					
					if(sd.length > 0) {
						sd.toggleClass('sleep', st > 350);
					}
					
					scrollTimer = null;
				}, 50);
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		const isMobile = window.innerWidth <= 768;
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint(function(direction) {
			if(direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
				const duration = isMobile ? 3000 : 7000;
				
				$('.number').each(function(){
					const $this = $(this),
						num = $this.data('number');
					$this.animateNumber({
						number: num,
						numberStep: $.animateNumber.numberStepFactories.separator(',')
					}, duration);
				});
			}
		}, { offset: '95%' });

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1]
    },
    image: {
        verticalFit: true,
        tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    zoom: {
        enabled: window.innerWidth > 768,
        duration: 300
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });





})(jQuery);


///////////////////////////////
// Smart Resize
///////////////////////////////
(function($, sr) {
    var debounce = function(func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this,
                args = arguments;
            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }
            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    // smartresize
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');

$(function() {
    ///////////////////////////////
    // Fix the Home Height
    ///////////////////////////////
    var setHomeBannerHeight = function() {
        var homeHeight = $(window).height();
        $('#overlay-1').height(homeHeight);
    };
    setHomeBannerHeight();

    ///////////////////////////////
    // One Page Smooth Scrolling
    ///////////////////////////////
    $('a[href*=#]:not([href=#])').click(function() {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({ scrollTop: target.offset().top }, 1000);
                return false;
            }
        }
    });

    ///////////////////////////////
    // Center Home Slideshow Text
    ///////////////////////////////
    function centerHomeBannerText() {
        var bannerText = jQuery('#wrapper .starting-text');
        var bannerTextTop =
            jQuery('#wrapper').actual('height') / 2 -
            jQuery('#wrapper .starting-text').actual('height') / 2 -
            20;
        bannerText.css('padding-top', bannerTextTop + 'px');
        bannerText.show();
    }
    centerHomeBannerText();

    jQuery(window).smartresize(function() {
        setHomeBannerHeight();
        centerHomeBannerText();
    });
});

$(document).ready(function() {
    ///////////////////////////////
    // Initialize WOW.js
    ///////////////////////////////
    new WOW().init();

    ///////////////////////////////
    // Initialize Owl Carousel for Testimonials
    ///////////////////////////////
    $('#client-speech').owlCarousel({
        autoPlay: 3000,
        navigation: false, // Show next and prev buttons
        slideSpeed: 700,
        paginationSpeed: 1000,
        singleItem: true
    });

    ///////////////////////////////
    // Initialize Owl Carousel for Blog
    ///////////////////////////////
    $('#blog-carousel').owlCarousel({
        items: 3, // Number of items to show
        margin: 30,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        nav: true,
        navText: ["<i class='ion-ios7-arrow-left'></i>","<i class='ion-ios7-arrow-right'></i>"],
        responsive: {
            0: { items:1 },    // On small screens show 1 item
            600:{ items:2 },  // On tablets show 2 items
            1000:{ items:3 }  // On desktops show 3 items
        }
    });

    ///////////////////////////////
    // Fix Home Banner Height on Resize
    ///////////////////////////////
    var setHomeBannerHeight = function() {
        var homeHeight = $(window).height();
        $('#overlay-1').height(homeHeight);
    };
    setHomeBannerHeight();
});

///////////////////////////////
// Navbar Scroll Behavior
///////////////////////////////
$(document).ready(function() {
    var navbar = $('#navigation > .navbar'); 
    var scrollOffset = 850; // Change offset as desired

    function handleScroll() {
        if ($(window).scrollTop() > scrollOffset) {
            navbar.removeClass('navbar-white');
            navbar.addClass('navbar-scrolled');
        } else {
            navbar.removeClass('navbar-scrolled');
            navbar.addClass('navbar-white');
        }
    }

    $(window).on('scroll', handleScroll);
    handleScroll();
});

(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 60)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    //footer reveal
    $('footer').footerReveal();

    //waypoints
    $('#profile-foto').css('opacity', 0);
 
    $('#profile-foto').waypoint(function(direction) {
    if (direction === 'down') {
      // reveal our content
      $('#profile-foto').addClass('fade-in-up');
      $('#profile-foto').removeClass('fadeOutDown');
    } else if (direction === 'up') {
      // hide our content
      $('#profile-foto').addClass('fadeOutDown');
      $('#profile-foto').removeClass('fade-in-up');
    }
 
  }, { offset: '70%' });


})(jQuery);

/*-------------------------------------
  KNI WAYPOINT FUNCTIONS
-------------------------------------*/
// Creates a standerd waypoint with the option of custom logic. To pass in
// the custom logic, just create a function with all the logic you would
// like to call when the waypoint is activated, then pass just the name of the
// function into this function without qoutes. Note that these waypoint functions are
// available to any js file in this project
// Example Single Waypoint: createWaypoint('.that', 'is-active', '35%', animateThat)
function createWaypoint(element, classToToggle, offset, cb) {
  return jQuery(element).waypoint(function(direction) {
    jQuery(element).toggleClass(classToToggle);
    if (typeof cb !== "undefined") {
      cb(element, classToToggle, offset, direction);
    }
  }, { offset: offset });
}

// A loop for standerd waypoint creation. Also has the ability to pass in custom
// logic, and classToToggle. Both are optional.
// Example Multiple Waypoints: waypointer(['.that', '#that', '#this'], 'resolved', '10%', animate);
function waypointer(elementArray, classToToggle, offset, cb) {
  for (var i=0; i < elementArray.length; i++) {
    createWaypoint(elementArray[i], classToToggle, offset, cb);
  }
  return true;
}


function createProjectGrid() {
  var viewport = window.innerHeight;
  var resizeTimer;
  var projects = $('.box').slice(1, -1);
  var numFitInViewport = Math.round(viewport / $(projects[0]).height());
  var currItemCount = 1;

  function updateCounter() {
    if (currItemCount >= 3) {
      currItemCount = 1;
    } else {
      currItemCount++;
    }
  }

  function gridInit() {
    var numVisible = 0;
    var rowCount = 0;
    var itemCount = 0;

    if(isFinite(numFitInViewport)) {
      if (numFitInViewport == 1) {
        rowCount++;
        itemCount++;
      }else if (numFitInViewport == 2) {
        rowCount++;
        itemCount++;
      }else if (numFitInViewport > 2) {
        rowCount += 2;
        itemCount += 2;
        numVisible = ((numFitInViewport - rowCount) * 3) + itemCount;
        for (x = 0; x < numVisible; x++) {
          $(projects[x]).addClass('visible-grid-item');
        }
        oneFlag = false;
        for (i = numVisible; i < projects.length; i++) {
          $(projects[i]).addClass('empty');
          if (currItemCount == 1) {
            createWaypoint(projects[i], null, '75%', displayProjects);
          }
          updateCounter();
        }
      }
    }
  }

  function displayProjects(element, classToToggle, offset, cb, direction) {
    element = $(element);
    $(element).removeClass('empty');
    setTimeout(function() {
      $(element).next().removeClass('empty');
    }, 0250);
    setTimeout(function() {
      $(element).next().next().removeClass('empty');
    }, 0400);
    updateCounter();
  }

  gridInit();
}

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
    $('footer').footerReveal({ shadow: false, zIndex: -101 });

    //nav animation
    //$('#main-headline').addClass('animated bounceInUp');

    //waypoints
    //$('#profile-foto').css('opacity', 0);
 
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
 
  }, { offset: '85%' });

    createProjectGrid();

})(jQuery);

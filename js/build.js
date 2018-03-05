// /*
// function createWaypoint(element, classToToggle, offset, cb) {
//     return jQuery(element).waypoint(function(direction) {
//         jQuery(element).toggleClass(classToToggle);
//         if (typeof cb !== "undefined") {
//             cb(element, classToToggle, offset, direction);
//         }
//     }, {
//         offset: offset
//     });
// }

// function waypointer(elementArray, classToToggle, offset, cb) {
//     for (var i = 0; i < elementArray.length; i++) {
//         createWaypoint(elementArray[i], classToToggle, offset, cb);
//     }
//     return true;
// }

// function createProjectGrid() {
//     var viewport = window.innerHeight;
//     var resizeTimer;
//     var projects = $('.box').slice(1, -1);
//     var numFitInViewport = Math.round(viewport / $(projects[0]).height());
//     var currItemCount = 1;

//     function updateCounter() {
//         if (currItemCount >= 3) {
//             currItemCount = 1;
//         } else {
//             currItemCount++;
//         }
//     }

//     function gridInit() {
//         var numVisible = 0;
//         var rowCount = 0;
//         var itemCount = 0;
//         if (isFinite(numFitInViewport)) {
//             if (numFitInViewport == 1) {
//                 rowCount++;
//                 itemCount++;
//             } else if (numFitInViewport == 2) {
//                 rowCount++;
//                 itemCount++;
//             } else if (numFitInViewport > 2) {
//                 rowCount += 2;
//                 itemCount += 2;
//                 numVisible = ((numFitInViewport - rowCount) * 3) + itemCount;
//                 for (x = 0; x < numVisible; x++) {
//                     $(projects[x]).addClass('visible-grid-item');
//                 }
//                 oneFlag = false;
//                 for (i = numVisible; i < projects.length; i++) {
//                     $(projects[i]).addClass('empty');
//                     if (currItemCount == 1) {
//                         createWaypoint(projects[i], null, '75%', displayProjects);
//                     }
//                     updateCounter();
//                 }
//             }
//         }
//     }

//     function displayProjects(element, classToToggle, offset, cb, direction) {
//         element = $(element);
//         $(element).removeClass('empty');
//         setTimeout(function() {
//             $(element).next().removeClass('empty');
//         }, 0250);
//         setTimeout(function() {
//             $(element).next().next().removeClass('empty');
//         }, 0400);
//         updateCounter();
//     }
//     gridInit();
// }
// */

// //import Barba from 'barba';
// var Barba = require('./js/barba');

//   "use strict";
//   // cache DOM
//   var navigation = document.querySelector(".container.navigation");
//   var navCheckbox = navigation.querySelector(".navigation__checkbox");
//   var navItems = navigation.querySelectorAll(".navigation__item");
//   // navItems.forEach(item =>
//   //   item.addEventListener("click", _ => (navCheckbox.checked = false))
//   // );
//   navItems.forEach(function (item) {
//     return item.addEventListener("click", function (_) {
//       return navCheckbox.checked = false;
//     });
//   });

//   var parallaxBox = document.querySelector(".container.composition");
//   var c1left = document.getElementById("i1").offsetLeft,
//     c1top = document.getElementById("i1").offsetTop,
//     c2left = document.getElementById("i2").offsetLeft,
//     c2top = document.getElementById("i2").offsetTop,
//     c3left = document.getElementById("i3").offsetLeft,
//     c3top = document.getElementById("i3").offsetTop;
//   //c4left = document.getElementById ( 'i4' ).offsetLeft,
//   //c4top = document.getElementById ( 'i4' ).offsetTop;

//   parallaxBox.onmousemove = function(event) {
//     event = event || window.event;
//     var x = event.clientX - parallaxBox.offsetLeft,
//       y = event.clientY - parallaxBox.offsetTop;

//     mouseParallax("i1", c1left, c1top, x, y, 5);
//     mouseParallax("i2", c2left, c2top, x, y, 15);
//     mouseParallax("i3", c3left, c3top, x, y, 30);
//     //mouseParallax ( 'l4', c4left, c4top, x, y, 65 );
//   };

//   function mouseParallax(id, left, top, mouseX, mouseY, speed) {
//     var obj = document.getElementById(id);
//     var parentObj = obj.parentNode,
//       containerWidth = parseInt(parentObj.offsetWidth),
//       containerHeight = parseInt(parentObj.offsetHeight);
//     obj.style.left =
//       left -
//       (mouseX - (parseInt(obj.offsetWidth) / 2 + left)) /
//         containerWidth *
//         speed +
//       "px";
//     obj.style.top =
//       top -
//       (mouseY - (parseInt(obj.offsetHeight) / 2 + top)) /
//         containerHeight *
//         speed +
//       "px";
//   }

//   Barba.Pjax.start();

//   var transEffect = Barba.BaseTransition.extend({
//     start: function() {
//       this.newContainerLoading.then(val =>
//         this.fadeInNewcontent($(this.newContainer))
//       );
//     },
//     fadeInNewcontent: function(nc) {
//       nc.hide();
//       var _this = this;
//       $(this.oldContainer)
//         .fadeOut(1000)
//         .promise()
//         .done(() => {
//           nc.css("visibility", "visible");
//           nc.fadeIn(1000, function() {
//             _this.done();
//           });
//         });
//     }
//   });
//   Barba.Pjax.cacheEnabled = true;
//   Barba.Dispatcher.on("newPageReady", function() {

//     $(document).ready(function() {

//       $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
//         if (
//           location.pathname.replace(/^\//, "") ==
//             this.pathname.replace(/^\//, "") &&
//           location.hostname == this.hostname
//         ) {
//           var target = $(this.hash);
//           target = target.length
//             ? target
//             : $("[name=" + this.hash.slice(1) + "]");
//           if (target.length) {
//             $("html, body").animate(
//               {
//                 scrollTop: target.offset().top - 60
//               },
//               1000,
//               "easeInOutExpo"
//             );
//             return false;
//           }
//         }
//       });

//       mixitup("#mix-wrapper", {
//         load: {
//           sort: "default:asc" /* default:asc */
//         },
//         // animation: {
//         //     duration: 700,
//         //     effects: 'fade translateY(600%) stagger(35ms)',
//         //     easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
//         //     reverseOut: true
//         //   },
//         classNames: {
//           block: "box" /* mixitup */,
//           elementFilter: "filter-btn" /* control */,
//           elementSort: "sort-btn" /* control */
//         },
//         selectors: {
//           target: ".mix-target" /* .mix */
//         }
//       });
//     });
//   });

//   // Barba.Dispatcher.on('newPageReady', () => {
//   //     const routes = new Router(pages);
//   //     routes.loadEvents();
//   //   });
//   Barba.Pjax.getTransition = function() {
//     return transEffect;
//   };

;(function($) { 
  Barba.Pjax.start();  
  var transEffect = Barba.BaseTransition.extend({
      start: function(){
        this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
      },
      fadeInNewcontent: function(nc) {
        nc.hide();
        var _this = this;
        $(this.oldContainer).fadeOut(1000).promise().done(() => {
          nc.css('visibility','visible');
          nc.fadeIn(1000, function(){
            _this.done();
          })
        });
      }
  });
  Barba.Pjax.getTransition = function() {
    return transEffect;
  }
  
})(jQuery);




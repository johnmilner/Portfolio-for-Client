(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
/*
function createWaypoint(element, classToToggle, offset, cb) {
    return jQuery(element).waypoint(function(direction) {
        jQuery(element).toggleClass(classToToggle);
        if (typeof cb !== "undefined") {
            cb(element, classToToggle, offset, direction);
        }
    }, {
        offset: offset
    });
}

function waypointer(elementArray, classToToggle, offset, cb) {
    for (var i = 0; i < elementArray.length; i++) {
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
        if (isFinite(numFitInViewport)) {
            if (numFitInViewport == 1) {
                rowCount++;
                itemCount++;
            } else if (numFitInViewport == 2) {
                rowCount++;
                itemCount++;
            } else if (numFitInViewport > 2) {
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
*/

"use strict";
// cache DOM

var navigation = document.querySelector(".container.navigation");
var navCheckbox = navigation.querySelector(".navigation__checkbox");
var navItems = navigation.querySelectorAll(".navigation__item");
// navItems.forEach(item =>
//   item.addEventListener("click", _ => (navCheckbox.checked = false))
// );
navItems.forEach(function (item) {
  return item.addEventListener("click", function (_) {
    return navCheckbox.checked = false;
  });
});

var parallaxBox = document.querySelector(".containersss.composition");
var c1left = document.getElementById("i1").offsetLeft,
    c1top = document.getElementById("i1").offsetTop,
    c2left = document.getElementById("i2").offsetLeft,
    c2top = document.getElementById("i2").offsetTop,
    c3left = document.getElementById("i3").offsetLeft,
    c3top = document.getElementById("i3").offsetTop;
//c4left = document.getElementById ( 'i4' ).offsetLeft,
//c4top = document.getElementById ( 'i4' ).offsetTop;

parallaxBox.onmousemove = function (event) {
  event = event || window.event;
  var x = event.clientX - parallaxBox.offsetLeft,
      y = event.clientY - parallaxBox.offsetTop;

  mouseParallax("i1", c1left, c1top, x, y, 5);
  mouseParallax("i2", c2left, c2top, x, y, 15);
  mouseParallax("i3", c3left, c3top, x, y, 30);
  //mouseParallax ( 'l4', c4left, c4top, x, y, 65 );
};

function mouseParallax(id, left, top, mouseX, mouseY, speed) {
  var obj = document.getElementById(id);
  var parentObj = obj.parentNode,
      containerWidth = parseInt(parentObj.offsetWidth),
      containerHeight = parseInt(parentObj.offsetHeight);
  obj.style.left = left - (mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth * speed + "px";
  obj.style.top = top - (mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight * speed + "px";
}

var transEffect = Barba.BaseTransition.extend({
  start: function start() {
    var _this2 = this;

    this.newContainerLoading.then(function (val) {
      return _this2.fadeInNewcontent($(_this2.newContainer));
    });
  },
  fadeInNewcontent: function fadeInNewcontent(nc) {
    nc.hide();
    var _this = this;
    $(this.oldContainer).fadeOut(1000).promise().done(function () {
      nc.css("visibility", "visible");
      nc.fadeIn(1000, function () {
        _this.done();
      });
    });
  }
});
Barba.Pjax.cacheEnabled = true;
Barba.Dispatcher.on("newPageReady", function () {
  $(document).ready(function () {
    // cache DOM

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate({
            scrollTop: target.offset().top - 60
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    mixitup("#mix-wrapper", {
      load: {
        sort: "default:asc" /* default:asc */
      },
      // animation: {
      //     duration: 700,
      //     effects: 'fade translateY(600%) stagger(35ms)',
      //     easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
      //     reverseOut: true
      //   },
      classNames: {
        block: "box" /* mixitup */
        , elementFilter: "filter-btn" /* control */
        , elementSort: "sort-btn" /* control */
      },
      selectors: {
        target: ".mix-target" /* .mix */
      }
    });
  });
});

// Barba.Dispatcher.on('newPageReady', () => {
//     const routes = new Router(pages);
//     routes.loadEvents();
//   });
Barba.Pjax.getTransition = function () {
  return transEffect;
};
Barba.Pjax.start();

},{}]},{},[1])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9idWlsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0ZFO0FBQ0E7O0FBQ0EsSUFBSSxhQUFhLFNBQVMsYUFBVCxDQUF1Qix1QkFBdkIsQ0FBakI7QUFDQSxJQUFJLGNBQWMsV0FBVyxhQUFYLENBQXlCLHVCQUF6QixDQUFsQjtBQUNBLElBQUksV0FBVyxXQUFXLGdCQUFYLENBQTRCLG1CQUE1QixDQUFmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFULENBQWlCLFVBQVUsSUFBVixFQUFnQjtBQUMvQixTQUFPLEtBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBVSxDQUFWLEVBQWE7QUFDakQsV0FBTyxZQUFZLE9BQVosR0FBc0IsS0FBN0I7QUFDRCxHQUZNLENBQVA7QUFHRCxDQUpEOztBQU1BLElBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsMkJBQXZCLENBQWxCO0FBQ0EsSUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QixVQUEzQztBQUFBLElBQ0UsUUFBUSxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEIsU0FEeEM7QUFBQSxJQUVFLFNBQVMsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQThCLFVBRnpDO0FBQUEsSUFHRSxRQUFRLFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QixTQUh4QztBQUFBLElBSUUsU0FBUyxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEIsVUFKekM7QUFBQSxJQUtFLFFBQVEsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQThCLFNBTHhDO0FBTUE7QUFDQTs7QUFFQSxZQUFZLFdBQVosR0FBMEIsVUFBUyxLQUFULEVBQWdCO0FBQ3hDLFVBQVEsU0FB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LE1BQVAsR0FBZ0IsR0FBaEIsR0FBc0I7QUFEbkMsV0FERixFQUlFLElBSkYsRUFLRSxlQUxGO0FBT0EsaUJBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRixLQXJCRDs7QUF1QkEsWUFBUSxjQUFSLEVBQXdCO0FBQ3RCLFlBQU07QUFDSixjQUFNLGFBREYsQ0FDZ0I7QUFEaEIsT0FEZ0I7QUFJdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQVk7QUFDVixlQUFPLEtBREcsQ0FDRztBQURILFVBRVYsZUFBZSxZQUZMLENBRWtCO0FBRmxCLFVBR1YsYUFBYSxVQUhILENBR2M7QUFIZCxPQVZVO0FBZXRCLGlCQUFXO0FBQ1QsZ0JBQVEsYUFEQyxDQUNhO0FBRGI7QUFmVyxLQUF4QjtBQW1CRCxHQTdDRDtBQThDRCxDQS9DRDs7QUFpREE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQU4sQ0FBVyxhQUFYLEdBQTJCLFlBQVc7QUFDcEMsU0FBTyxXQUFQO0FBQ0QsQ0FGRDtBQUdBLE1BQU0sSUFBTixDQUFXLEtBQVgiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiLypcbmZ1bmN0aW9uIGNyZWF0ZVdheXBvaW50KGVsZW1lbnQsIGNsYXNzVG9Ub2dnbGUsIG9mZnNldCwgY2IpIHtcbiAgICByZXR1cm4galF1ZXJ5KGVsZW1lbnQpLndheXBvaW50KGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICBqUXVlcnkoZWxlbWVudCkudG9nZ2xlQ2xhc3MoY2xhc3NUb1RvZ2dsZSk7XG4gICAgICAgIGlmICh0eXBlb2YgY2IgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNiKGVsZW1lbnQsIGNsYXNzVG9Ub2dnbGUsIG9mZnNldCwgZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gd2F5cG9pbnRlcihlbGVtZW50QXJyYXksIGNsYXNzVG9Ub2dnbGUsIG9mZnNldCwgY2IpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVXYXlwb2ludChlbGVtZW50QXJyYXlbaV0sIGNsYXNzVG9Ub2dnbGUsIG9mZnNldCwgY2IpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdEdyaWQoKSB7XG4gICAgdmFyIHZpZXdwb3J0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciByZXNpemVUaW1lcjtcbiAgICB2YXIgcHJvamVjdHMgPSAkKCcuYm94Jykuc2xpY2UoMSwgLTEpO1xuICAgIHZhciBudW1GaXRJblZpZXdwb3J0ID0gTWF0aC5yb3VuZCh2aWV3cG9ydCAvICQocHJvamVjdHNbMF0pLmhlaWdodCgpKTtcbiAgICB2YXIgY3Vyckl0ZW1Db3VudCA9IDE7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCkge1xuICAgICAgICBpZiAoY3Vyckl0ZW1Db3VudCA+PSAzKSB7XG4gICAgICAgICAgICBjdXJySXRlbUNvdW50ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJJdGVtQ291bnQrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdyaWRJbml0KCkge1xuICAgICAgICB2YXIgbnVtVmlzaWJsZSA9IDA7XG4gICAgICAgIHZhciByb3dDb3VudCA9IDA7XG4gICAgICAgIHZhciBpdGVtQ291bnQgPSAwO1xuICAgICAgICBpZiAoaXNGaW5pdGUobnVtRml0SW5WaWV3cG9ydCkpIHtcbiAgICAgICAgICAgIGlmIChudW1GaXRJblZpZXdwb3J0ID09IDEpIHtcbiAgICAgICAgICAgICAgICByb3dDb3VudCsrO1xuICAgICAgICAgICAgICAgIGl0ZW1Db3VudCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChudW1GaXRJblZpZXdwb3J0ID09IDIpIHtcbiAgICAgICAgICAgICAgICByb3dDb3VudCsrO1xuICAgICAgICAgICAgICAgIGl0ZW1Db3VudCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChudW1GaXRJblZpZXdwb3J0ID4gMikge1xuICAgICAgICAgICAgICAgIHJvd0NvdW50ICs9IDI7XG4gICAgICAgICAgICAgICAgaXRlbUNvdW50ICs9IDI7XG4gICAgICAgICAgICAgICAgbnVtVmlzaWJsZSA9ICgobnVtRml0SW5WaWV3cG9ydCAtIHJvd0NvdW50KSAqIDMpICsgaXRlbUNvdW50O1xuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCBudW1WaXNpYmxlOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgJChwcm9qZWN0c1t4XSkuYWRkQ2xhc3MoJ3Zpc2libGUtZ3JpZC1pdGVtJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uZUZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBudW1WaXNpYmxlOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgJChwcm9qZWN0c1tpXSkuYWRkQ2xhc3MoJ2VtcHR5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJySXRlbUNvdW50ID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVdheXBvaW50KHByb2plY3RzW2ldLCBudWxsLCAnNzUlJywgZGlzcGxheVByb2plY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb3VudGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGxheVByb2plY3RzKGVsZW1lbnQsIGNsYXNzVG9Ub2dnbGUsIG9mZnNldCwgY2IsIGRpcmVjdGlvbikge1xuICAgICAgICBlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcygnZW1wdHknKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkubmV4dCgpLnJlbW92ZUNsYXNzKCdlbXB0eScpO1xuICAgICAgICB9LCAwMjUwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkubmV4dCgpLm5leHQoKS5yZW1vdmVDbGFzcygnZW1wdHknKTtcbiAgICAgICAgfSwgMDQwMCk7XG4gICAgICAgIHVwZGF0ZUNvdW50ZXIoKTtcbiAgICB9XG4gICAgZ3JpZEluaXQoKTtcbn1cbiovXG5cblxuICBcInVzZSBzdHJpY3RcIjtcbiAgLy8gY2FjaGUgRE9NXG4gIHZhciBuYXZpZ2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXIubmF2aWdhdGlvblwiKTtcbiAgdmFyIG5hdkNoZWNrYm94ID0gbmF2aWdhdGlvbi5xdWVyeVNlbGVjdG9yKFwiLm5hdmlnYXRpb25fX2NoZWNrYm94XCIpO1xuICB2YXIgbmF2SXRlbXMgPSBuYXZpZ2F0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2aWdhdGlvbl9faXRlbVwiKTtcbiAgLy8gbmF2SXRlbXMuZm9yRWFjaChpdGVtID0+XG4gIC8vICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgXyA9PiAobmF2Q2hlY2tib3guY2hlY2tlZCA9IGZhbHNlKSlcbiAgLy8gKTtcbiAgbmF2SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoXykge1xuICAgICAgcmV0dXJuIG5hdkNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdmFyIHBhcmFsbGF4Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJzc3MuY29tcG9zaXRpb25cIik7XG4gIHZhciBjMWxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImkxXCIpLm9mZnNldExlZnQsXG4gICAgYzF0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImkxXCIpLm9mZnNldFRvcCxcbiAgICBjMmxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImkyXCIpLm9mZnNldExlZnQsXG4gICAgYzJ0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImkyXCIpLm9mZnNldFRvcCxcbiAgICBjM2xlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImkzXCIpLm9mZnNldExlZnQsXG4gICAgYzN0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImkzXCIpLm9mZnNldFRvcDtcbiAgLy9jNGxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAoICdpNCcgKS5vZmZzZXRMZWZ0LFxuICAvL2M0dG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgKCAnaTQnICkub2Zmc2V0VG9wO1xuXG4gIHBhcmFsbGF4Qm94Lm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgICB2YXIgeCA9IGV2ZW50LmNsaWVudFggLSBwYXJhbGxheEJveC5vZmZzZXRMZWZ0LFxuICAgICAgeSA9IGV2ZW50LmNsaWVudFkgLSBwYXJhbGxheEJveC5vZmZzZXRUb3A7XG5cbiAgICBtb3VzZVBhcmFsbGF4KFwiaTFcIiwgYzFsZWZ0LCBjMXRvcCwgeCwgeSwgNSk7XG4gICAgbW91c2VQYXJhbGxheChcImkyXCIsIGMybGVmdCwgYzJ0b3AsIHgsIHksIDE1KTtcbiAgICBtb3VzZVBhcmFsbGF4KFwiaTNcIiwgYzNsZWZ0LCBjM3RvcCwgeCwgeSwgMzApO1xuICAgIC8vbW91c2VQYXJhbGxheCAoICdsNCcsIGM0bGVmdCwgYzR0b3AsIHgsIHksIDY1ICk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbW91c2VQYXJhbGxheChpZCwgbGVmdCwgdG9wLCBtb3VzZVgsIG1vdXNlWSwgc3BlZWQpIHtcbiAgICB2YXIgb2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIHZhciBwYXJlbnRPYmogPSBvYmoucGFyZW50Tm9kZSxcbiAgICAgIGNvbnRhaW5lcldpZHRoID0gcGFyc2VJbnQocGFyZW50T2JqLm9mZnNldFdpZHRoKSxcbiAgICAgIGNvbnRhaW5lckhlaWdodCA9IHBhcnNlSW50KHBhcmVudE9iai5vZmZzZXRIZWlnaHQpO1xuICAgIG9iai5zdHlsZS5sZWZ0ID1cbiAgICAgIGxlZnQgLVxuICAgICAgKG1vdXNlWCAtIChwYXJzZUludChvYmoub2Zmc2V0V2lkdGgpIC8gMiArIGxlZnQpKSAvXG4gICAgICAgIGNvbnRhaW5lcldpZHRoICpcbiAgICAgICAgc3BlZWQgK1xuICAgICAgXCJweFwiO1xuICAgIG9iai5zdHlsZS50b3AgPVxuICAgICAgdG9wIC1cbiAgICAgIChtb3VzZVkgLSAocGFyc2VJbnQob2JqLm9mZnNldEhlaWdodCkgLyAyICsgdG9wKSkgL1xuICAgICAgICBjb250YWluZXJIZWlnaHQgKlxuICAgICAgICBzcGVlZCArXG4gICAgICBcInB4XCI7XG4gIH1cblxuICB2YXIgdHJhbnNFZmZlY3QgPSBCYXJiYS5CYXNlVHJhbnNpdGlvbi5leHRlbmQoe1xuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubmV3Q29udGFpbmVyTG9hZGluZy50aGVuKHZhbCA9PlxuICAgICAgICB0aGlzLmZhZGVJbk5ld2NvbnRlbnQoJCh0aGlzLm5ld0NvbnRhaW5lcikpXG4gICAgICApO1xuICAgIH0sXG4gICAgZmFkZUluTmV3Y29udGVudDogZnVuY3Rpb24obmMpIHtcbiAgICAgIG5jLmhpZGUoKTtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAkKHRoaXMub2xkQ29udGFpbmVyKVxuICAgICAgICAuZmFkZU91dCgxMDAwKVxuICAgICAgICAucHJvbWlzZSgpXG4gICAgICAgIC5kb25lKCgpID0+IHtcbiAgICAgICAgICBuYy5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKTtcbiAgICAgICAgICBuYy5mYWRlSW4oMTAwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5kb25lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIEJhcmJhLlBqYXguY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgQmFyYmEuRGlzcGF0Y2hlci5vbihcIm5ld1BhZ2VSZWFkeVwiLCBmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNhY2hlIERPTVxuXG4gICAgICAkKCdhLmpzLXNjcm9sbC10cmlnZ2VyW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sIFwiXCIpID09XG4gICAgICAgICAgICB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCBcIlwiKSAmJlxuICAgICAgICAgIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoXG4gICAgICAgICAgICA/IHRhcmdldFxuICAgICAgICAgICAgOiAkKFwiW25hbWU9XCIgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyBcIl1cIik7XG4gICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3AgLSA2MFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAxMDAwLFxuICAgICAgICAgICAgICBcImVhc2VJbk91dEV4cG9cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBtaXhpdHVwKFwiI21peC13cmFwcGVyXCIsIHtcbiAgICAgICAgbG9hZDoge1xuICAgICAgICAgIHNvcnQ6IFwiZGVmYXVsdDphc2NcIiAvKiBkZWZhdWx0OmFzYyAqL1xuICAgICAgICB9LFxuICAgICAgICAvLyBhbmltYXRpb246IHtcbiAgICAgICAgLy8gICAgIGR1cmF0aW9uOiA3MDAsXG4gICAgICAgIC8vICAgICBlZmZlY3RzOiAnZmFkZSB0cmFuc2xhdGVZKDYwMCUpIHN0YWdnZXIoMzVtcyknLFxuICAgICAgICAvLyAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJyxcbiAgICAgICAgLy8gICAgIHJldmVyc2VPdXQ6IHRydWVcbiAgICAgICAgLy8gICB9LFxuICAgICAgICBjbGFzc05hbWVzOiB7XG4gICAgICAgICAgYmxvY2s6IFwiYm94XCIgLyogbWl4aXR1cCAqLyxcbiAgICAgICAgICBlbGVtZW50RmlsdGVyOiBcImZpbHRlci1idG5cIiAvKiBjb250cm9sICovLFxuICAgICAgICAgIGVsZW1lbnRTb3J0OiBcInNvcnQtYnRuXCIgLyogY29udHJvbCAqL1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RvcnM6IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiLm1peC10YXJnZXRcIiAvKiAubWl4ICovXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBCYXJiYS5EaXNwYXRjaGVyLm9uKCduZXdQYWdlUmVhZHknLCAoKSA9PiB7XG4gIC8vICAgICBjb25zdCByb3V0ZXMgPSBuZXcgUm91dGVyKHBhZ2VzKTtcbiAgLy8gICAgIHJvdXRlcy5sb2FkRXZlbnRzKCk7XG4gIC8vICAgfSk7XG4gIEJhcmJhLlBqYXguZ2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0cmFuc0VmZmVjdDtcbiAgfTtcbiAgQmFyYmEuUGpheC5zdGFydCgpO1xuXG5cbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKcWN5OWlkV2xzWkM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHRCUTBGQk96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBGQlowWkZPMEZCUTBFN08wRkJRMEVzU1VGQlNTeGhRVUZoTEZOQlFWTXNZVUZCVkN4RFFVRjFRaXgxUWtGQmRrSXNRMEZCYWtJN1FVRkRRU3hKUVVGSkxHTkJRV01zVjBGQlZ5eGhRVUZZTEVOQlFYbENMSFZDUVVGNlFpeERRVUZzUWp0QlFVTkJMRWxCUVVrc1YwRkJWeXhYUVVGWExHZENRVUZZTEVOQlFUUkNMRzFDUVVFMVFpeERRVUZtTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1UwRkJVeXhQUVVGVUxFTkJRV2xDTEZWQlFWVXNTVUZCVml4RlFVRm5RanRCUVVNdlFpeFRRVUZQTEV0QlFVc3NaMEpCUVV3c1EwRkJjMElzVDBGQmRFSXNSVUZCSzBJc1ZVRkJWU3hEUVVGV0xFVkJRV0U3UVVGRGFrUXNWMEZCVHl4WlFVRlpMRTlCUVZvc1IwRkJjMElzUzBGQk4wSTdRVUZEUkN4SFFVWk5MRU5CUVZBN1FVRkhSQ3hEUVVwRU96dEJRVTFCTEVsQlFVa3NZMEZCWXl4VFFVRlRMR0ZCUVZRc1EwRkJkVUlzTWtKQlFYWkNMRU5CUVd4Q08wRkJRMEVzU1VGQlNTeFRRVUZUTEZOQlFWTXNZMEZCVkN4RFFVRjNRaXhKUVVGNFFpeEZRVUU0UWl4VlFVRXpRenRCUVVGQkxFbEJRMFVzVVVGQlVTeFRRVUZUTEdOQlFWUXNRMEZCZDBJc1NVRkJlRUlzUlVGQk9FSXNVMEZFZUVNN1FVRkJRU3hKUVVWRkxGTkJRVk1zVTBGQlV5eGpRVUZVTEVOQlFYZENMRWxCUVhoQ0xFVkJRVGhDTEZWQlJucERPMEZCUVVFc1NVRkhSU3hSUVVGUkxGTkJRVk1zWTBGQlZDeERRVUYzUWl4SlFVRjRRaXhGUVVFNFFpeFRRVWg0UXp0QlFVRkJMRWxCU1VVc1UwRkJVeXhUUVVGVExHTkJRVlFzUTBGQmQwSXNTVUZCZUVJc1JVRkJPRUlzVlVGS2VrTTdRVUZCUVN4SlFVdEZMRkZCUVZFc1UwRkJVeXhqUVVGVUxFTkJRWGRDTEVsQlFYaENMRVZCUVRoQ0xGTkJUSGhETzBGQlRVRTdRVUZEUVRzN1FVRkZRU3haUVVGWkxGZEJRVm9zUjBGQk1FSXNWVUZCVXl4TFFVRlVMRVZCUVdkQ08wRkJRM2hETEZWQlFWRXNVMEZCVXl4UFFVRlBMRXRCUVhoQ08wRkJRMEVzVFVGQlNTeEpRVUZKTEUxQlFVMHNUMEZCVGl4SFFVRm5RaXhaUVVGWkxGVkJRWEJETzBGQlFVRXNUVUZEUlN4SlFVRkpMRTFCUVUwc1QwRkJUaXhIUVVGblFpeFpRVUZaTEZOQlJHeERPenRCUVVkQkxHZENRVUZqTEVsQlFXUXNSVUZCYjBJc1RVRkJjRUlzUlVGQk5FSXNTMEZCTlVJc1JVRkJiVU1zUTBGQmJrTXNSVUZCYzBNc1EwRkJkRU1zUlVGQmVVTXNRMEZCZWtNN1FVRkRRU3huUWtGQll5eEpRVUZrTEVWQlFXOUNMRTFCUVhCQ0xFVkJRVFJDTEV0QlFUVkNMRVZCUVcxRExFTkJRVzVETEVWQlFYTkRMRU5CUVhSRExFVkJRWGxETEVWQlFYcERPMEZCUTBFc1owSkJRV01zU1VGQlpDeEZRVUZ2UWl4TlFVRndRaXhGUVVFMFFpeExRVUUxUWl4RlFVRnRReXhEUVVGdVF5eEZRVUZ6UXl4RFFVRjBReXhGUVVGNVF5eEZRVUY2UXp0QlFVTkJPMEZCUTBRc1EwRlVSRHM3UVVGWFFTeFRRVUZUTEdGQlFWUXNRMEZCZFVJc1JVRkJka0lzUlVGQk1rSXNTVUZCTTBJc1JVRkJhVU1zUjBGQmFrTXNSVUZCYzBNc1RVRkJkRU1zUlVGQk9FTXNUVUZCT1VNc1JVRkJjMFFzUzBGQmRFUXNSVUZCTmtRN1FVRkRNMFFzVFVGQlNTeE5RVUZOTEZOQlFWTXNZMEZCVkN4RFFVRjNRaXhGUVVGNFFpeERRVUZXTzBGQlEwRXNUVUZCU1N4WlFVRlpMRWxCUVVrc1ZVRkJjRUk3UVVGQlFTeE5RVU5GTEdsQ1FVRnBRaXhUUVVGVExGVkJRVlVzVjBGQmJrSXNRMEZFYmtJN1FVRkJRU3hOUVVWRkxHdENRVUZyUWl4VFFVRlRMRlZCUVZVc1dVRkJia0lzUTBGR2NFSTdRVUZIUVN4TlFVRkpMRXRCUVVvc1EwRkJWU3hKUVVGV0xFZEJRMFVzVDBGRFFTeERRVUZETEZWQlFWVXNVMEZCVXl4SlFVRkpMRmRCUVdJc1NVRkJORUlzUTBGQk5VSXNSMEZCWjBNc1NVRkJNVU1zUTBGQlJDeEpRVU5GTEdOQlJFWXNSMEZGUlN4TFFVaEdMRWRCU1VFc1NVRk1SanRCUVUxQkxFMUJRVWtzUzBGQlNpeERRVUZWTEVkQlFWWXNSMEZEUlN4TlFVTkJMRU5CUVVNc1ZVRkJWU3hUUVVGVExFbEJRVWtzV1VGQllpeEpRVUUyUWl4RFFVRTNRaXhIUVVGcFF5eEhRVUV6UXl4RFFVRkVMRWxCUTBVc1pVRkVSaXhIUVVWRkxFdEJTRVlzUjBGSlFTeEpRVXhHTzBGQlRVUTdPMEZCUlVRc1NVRkJTU3hqUVVGakxFMUJRVTBzWTBGQlRpeERRVUZ4UWl4TlFVRnlRaXhEUVVFMFFqdEJRVU0xUXl4VFFVRlBMR2xDUVVGWE8wRkJRVUU3TzBGQlEyaENMRk5CUVVzc2JVSkJRVXdzUTBGQmVVSXNTVUZCZWtJc1EwRkJPRUk3UVVGQlFTeGhRVU0xUWl4UFFVRkxMR2RDUVVGTUxFTkJRWE5DTEVWQlFVVXNUMEZCU3l4WlFVRlFMRU5CUVhSQ0xFTkJSRFJDTzBGQlFVRXNTMEZCT1VJN1FVRkhSQ3hIUVV3eVF6dEJRVTAxUXl4dlFrRkJhMElzTUVKQlFWTXNSVUZCVkN4RlFVRmhPMEZCUXpkQ0xFOUJRVWNzU1VGQlNEdEJRVU5CTEZGQlFVa3NVVUZCVVN4SlFVRmFPMEZCUTBFc1RVRkJSU3hMUVVGTExGbEJRVkFzUlVGRFJ5eFBRVVJJTEVOQlExY3NTVUZFV0N4RlFVVkhMRTlCUmtnc1IwRkhSeXhKUVVoSUxFTkJSMUVzV1VGQlRUdEJRVU5XTEZOQlFVY3NSMEZCU0N4RFFVRlBMRmxCUVZBc1JVRkJjVUlzVTBGQmNrSTdRVUZEUVN4VFFVRkhMRTFCUVVnc1EwRkJWU3hKUVVGV0xFVkJRV2RDTEZsQlFWYzdRVUZEZWtJc1kwRkJUU3hKUVVGT08wRkJRMFFzVDBGR1JEdEJRVWRFTEV0QlVrZzdRVUZUUkR0QlFXeENNa01zUTBGQk5VSXNRMEZCYkVJN1FVRnZRa0VzVFVGQlRTeEpRVUZPTEVOQlFWY3NXVUZCV0N4SFFVRXdRaXhKUVVFeFFqdEJRVU5CTEUxQlFVMHNWVUZCVGl4RFFVRnBRaXhGUVVGcVFpeERRVUZ2UWl4alFVRndRaXhGUVVGdlF5eFpRVUZYTzBGQlF6ZERMRWxCUVVVc1VVRkJSaXhGUVVGWkxFdEJRVm9zUTBGQmEwSXNXVUZCVnp0QlFVTXpRanM3UVVGRlFTeE5RVUZGTEdkRVFVRkdMRVZCUVc5RUxFdEJRWEJFTEVOQlFUQkVMRmxCUVZjN1FVRkRia1VzVlVGRFJTeFRRVUZUTEZGQlFWUXNRMEZCYTBJc1QwRkJiRUlzUTBGQk1FSXNTMEZCTVVJc1JVRkJhVU1zUlVGQmFrTXNTMEZEUlN4TFFVRkxMRkZCUVV3c1EwRkJZeXhQUVVGa0xFTkJRWE5DTEV0QlFYUkNMRVZCUVRaQ0xFVkJRVGRDTEVOQlJFWXNTVUZGUVN4VFFVRlRMRkZCUVZRc1NVRkJjVUlzUzBGQlN5eFJRVWcxUWl4RlFVbEZPMEZCUTBFc1dVRkJTU3hUUVVGVExFVkJRVVVzUzBGQlN5eEpRVUZRTEVOQlFXSTdRVUZEUVN4cFFrRkJVeXhQUVVGUExFMUJRVkFzUjBGRFRDeE5RVVJMTEVkQlJVd3NSVUZCUlN4WFFVRlhMRXRCUVVzc1NVRkJUQ3hEUVVGVkxFdEJRVllzUTBGQlowSXNRMEZCYUVJc1EwRkJXQ3hIUVVGblF5eEhRVUZzUXl4RFFVWktPMEZCUjBFc1dVRkJTU3hQUVVGUExFMUJRVmdzUlVGQmJVSTdRVUZEYWtJc1dVRkJSU3haUVVGR0xFVkJRV2RDTEU5QlFXaENMRU5CUTBVN1FVRkRSU3gxUWtGQlZ5eFBRVUZQTEUxQlFWQXNSMEZCWjBJc1IwRkJhRUlzUjBGQmMwSTdRVUZFYmtNc1YwRkVSaXhGUVVsRkxFbEJTa1lzUlVGTFJTeGxRVXhHTzBGQlQwRXNhVUpCUVU4c1MwRkJVRHRCUVVORU8wRkJRMFk3UVVGRFJpeExRWEpDUkRzN1FVRjFRa0VzV1VGQlVTeGpRVUZTTEVWQlFYZENPMEZCUTNSQ0xGbEJRVTA3UVVGRFNpeGpRVUZOTEdGQlJFWXNRMEZEWjBJN1FVRkVhRUlzVDBGRVowSTdRVUZKZEVJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNhMEpCUVZrN1FVRkRWaXhsUVVGUExFdEJSRWNzUTBGRFJ6dEJRVVJJTEZWQlJWWXNaVUZCWlN4WlFVWk1MRU5CUld0Q08wRkJSbXhDTEZWQlIxWXNZVUZCWVN4VlFVaElMRU5CUjJNN1FVRklaQ3hQUVZaVk8wRkJaWFJDTEdsQ1FVRlhPMEZCUTFRc1owSkJRVkVzWVVGRVF5eERRVU5oTzBGQlJHSTdRVUZtVnl4TFFVRjRRanRCUVcxQ1JDeEhRVGREUkR0QlFUaERSQ3hEUVM5RFJEczdRVUZwUkVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeE5RVUZOTEVsQlFVNHNRMEZCVnl4aFFVRllMRWRCUVRKQ0xGbEJRVmM3UVVGRGNFTXNVMEZCVHl4WFFVRlFPMEZCUTBRc1EwRkdSRHRCUVVkQkxFMUJRVTBzU1VGQlRpeERRVUZYTEV0QlFWZ2lMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlobWRXNWpkR2x2YmlncGUyWjFibU4wYVc5dUlHVW9kQ3h1TEhJcGUyWjFibU4wYVc5dUlITW9ieXgxS1h0cFppZ2hibHR2WFNsN2FXWW9JWFJiYjEwcGUzWmhjaUJoUFhSNWNHVnZaaUJ5WlhGMWFYSmxQVDFjSW1aMWJtTjBhVzl1WENJbUpuSmxjWFZwY21VN2FXWW9JWFVtSm1FcGNtVjBkWEp1SUdFb2J5d2hNQ2s3YVdZb2FTbHlaWFIxY200Z2FTaHZMQ0V3S1R0MllYSWdaajF1WlhjZ1JYSnliM0lvWENKRFlXNXViM1FnWm1sdVpDQnRiMlIxYkdVZ0oxd2lLMjhyWENJblhDSXBPM1JvY205M0lHWXVZMjlrWlQxY0lrMVBSRlZNUlY5T1QxUmZSazlWVGtSY0lpeG1mWFpoY2lCc1BXNWJiMTA5ZTJWNGNHOXlkSE02ZTMxOU8zUmJiMTFiTUYwdVkyRnNiQ2hzTG1WNGNHOXlkSE1zWm5WdVkzUnBiMjRvWlNsN2RtRnlJRzQ5ZEZ0dlhWc3hYVnRsWFR0eVpYUjFjbTRnY3lodVAyNDZaU2w5TEd3c2JDNWxlSEJ2Y25SekxHVXNkQ3h1TEhJcGZYSmxkSFZ5YmlCdVcyOWRMbVY0Y0c5eWRITjlkbUZ5SUdrOWRIbHdaVzltSUhKbGNYVnBjbVU5UFZ3aVpuVnVZM1JwYjI1Y0lpWW1jbVZ4ZFdseVpUdG1iM0lvZG1GeUlHODlNRHR2UEhJdWJHVnVaM1JvTzI4ckt5bHpLSEpiYjEwcE8zSmxkSFZ5YmlCemZYSmxkSFZ5YmlCbGZTa29LU0lzSWk4cVhHNW1kVzVqZEdsdmJpQmpjbVZoZEdWWFlYbHdiMmx1ZENobGJHVnRaVzUwTENCamJHRnpjMVJ2Vkc5bloyeGxMQ0J2Wm1aelpYUXNJR05pS1NCN1hHNGdJQ0FnY21WMGRYSnVJR3BSZFdWeWVTaGxiR1Z0Wlc1MEtTNTNZWGx3YjJsdWRDaG1kVzVqZEdsdmJpaGthWEpsWTNScGIyNHBJSHRjYmlBZ0lDQWdJQ0FnYWxGMVpYSjVLR1ZzWlcxbGJuUXBMblJ2WjJkc1pVTnNZWE56S0dOc1lYTnpWRzlVYjJkbmJHVXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdOaUlDRTlQU0JjSW5WdVpHVm1hVzVsWkZ3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCallpaGxiR1Z0Wlc1MExDQmpiR0Z6YzFSdlZHOW5aMnhsTENCdlptWnpaWFFzSUdScGNtVmpkR2x2YmlrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUxDQjdYRzRnSUNBZ0lDQWdJRzltWm5ObGREb2diMlptYzJWMFhHNGdJQ0FnZlNrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhkaGVYQnZhVzUwWlhJb1pXeGxiV1Z1ZEVGeWNtRjVMQ0JqYkdGemMxUnZWRzluWjJ4bExDQnZabVp6WlhRc0lHTmlLU0I3WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JsYkdWdFpXNTBRWEp5WVhrdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJQ0FnWTNKbFlYUmxWMkY1Y0c5cGJuUW9aV3hsYldWdWRFRnljbUY1VzJsZExDQmpiR0Z6YzFSdlZHOW5aMnhsTENCdlptWnpaWFFzSUdOaUtUdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdOeVpXRjBaVkJ5YjJwbFkzUkhjbWxrS0NrZ2UxeHVJQ0FnSUhaaGNpQjJhV1YzY0c5eWRDQTlJSGRwYm1SdmR5NXBibTVsY2tobGFXZG9kRHRjYmlBZ0lDQjJZWElnY21WemFYcGxWR2x0WlhJN1hHNGdJQ0FnZG1GeUlIQnliMnBsWTNSeklEMGdKQ2duTG1KdmVDY3BMbk5zYVdObEtERXNJQzB4S1R0Y2JpQWdJQ0IyWVhJZ2JuVnRSbWwwU1c1V2FXVjNjRzl5ZENBOUlFMWhkR2d1Y205MWJtUW9kbWxsZDNCdmNuUWdMeUFrS0hCeWIycGxZM1J6V3pCZEtTNW9aV2xuYUhRb0tTazdYRzRnSUNBZ2RtRnlJR04xY25KSmRHVnRRMjkxYm5RZ1BTQXhPMXh1WEc0Z0lDQWdablZ1WTNScGIyNGdkWEJrWVhSbFEyOTFiblJsY2lncElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dOMWNuSkpkR1Z0UTI5MWJuUWdQajBnTXlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTNWeWNrbDBaVzFEYjNWdWRDQTlJREU3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpkWEp5U1hSbGJVTnZkVzUwS3lzN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCbWRXNWpkR2x2YmlCbmNtbGtTVzVwZENncElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUc1MWJWWnBjMmxpYkdVZ1BTQXdPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NtOTNRMjkxYm5RZ1BTQXdPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2FYUmxiVU52ZFc1MElEMGdNRHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHbHpSbWx1YVhSbEtHNTFiVVpwZEVsdVZtbGxkM0J2Y25RcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9iblZ0Um1sMFNXNVdhV1YzY0c5eWRDQTlQU0F4S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtOTNRMjkxYm5Rckt6dGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBkR1Z0UTI5MWJuUXJLenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9iblZ0Um1sMFNXNVdhV1YzY0c5eWRDQTlQU0F5S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtOTNRMjkxYm5Rckt6dGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBkR1Z0UTI5MWJuUXJLenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9iblZ0Um1sMFNXNVdhV1YzY0c5eWRDQStJRElwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeWIzZERiM1Z1ZENBclBTQXlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2wwWlcxRGIzVnVkQ0FyUFNBeU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHNTFiVlpwYzJsaWJHVWdQU0FvS0c1MWJVWnBkRWx1Vm1sbGQzQnZjblFnTFNCeWIzZERiM1Z1ZENrZ0tpQXpLU0FySUdsMFpXMURiM1Z1ZER0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLSGdnUFNBd095QjRJRHdnYm5WdFZtbHphV0pzWlRzZ2VDc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9jSEp2YW1WamRITmJlRjBwTG1Ga1pFTnNZWE56S0NkMmFYTnBZbXhsTFdkeWFXUXRhWFJsYlNjcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnZibVZHYkdGbklEMGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ptOXlJQ2hwSUQwZ2JuVnRWbWx6YVdKc1pUc2dhU0E4SUhCeWIycGxZM1J6TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRb2NISnZhbVZqZEhOYmFWMHBMbUZrWkVOc1lYTnpLQ2RsYlhCMGVTY3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZM1Z5Y2tsMFpXMURiM1Z1ZENBOVBTQXhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqY21WaGRHVlhZWGx3YjJsdWRDaHdjbTlxWldOMGMxdHBYU3dnYm5Wc2JDd2dKemMxSlNjc0lHUnBjM0JzWVhsUWNtOXFaV04wY3lrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RYQmtZWFJsUTI5MWJuUmxjaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJR1oxYm1OMGFXOXVJR1JwYzNCc1lYbFFjbTlxWldOMGN5aGxiR1Z0Wlc1MExDQmpiR0Z6YzFSdlZHOW5aMnhsTENCdlptWnpaWFFzSUdOaUxDQmthWEpsWTNScGIyNHBJSHRjYmlBZ0lDQWdJQ0FnWld4bGJXVnVkQ0E5SUNRb1pXeGxiV1Z1ZENrN1hHNGdJQ0FnSUNBZ0lDUW9aV3hsYldWdWRDa3VjbVZ0YjNabFEyeGhjM01vSjJWdGNIUjVKeWs3WEc0Z0lDQWdJQ0FnSUhObGRGUnBiV1Z2ZFhRb1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBa0tHVnNaVzFsYm5RcExtNWxlSFFvS1M1eVpXMXZkbVZEYkdGemN5Z25aVzF3ZEhrbktUdGNiaUFnSUNBZ0lDQWdmU3dnTURJMU1DazdYRzRnSUNBZ0lDQWdJSE5sZEZScGJXVnZkWFFvWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FrS0dWc1pXMWxiblFwTG01bGVIUW9LUzV1WlhoMEtDa3VjbVZ0YjNabFEyeGhjM01vSjJWdGNIUjVKeWs3WEc0Z0lDQWdJQ0FnSUgwc0lEQTBNREFwTzF4dUlDQWdJQ0FnSUNCMWNHUmhkR1ZEYjNWdWRHVnlLQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lHZHlhV1JKYm1sMEtDazdYRzU5WEc0cUwxeHVYRzVjYmlBZ1hDSjFjMlVnYzNSeWFXTjBYQ0k3WEc0Z0lDOHZJR05oWTJobElFUlBUVnh1SUNCMllYSWdibUYyYVdkaGRHbHZiaUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1WTI5dWRHRnBibVZ5TG01aGRtbG5ZWFJwYjI1Y0lpazdYRzRnSUhaaGNpQnVZWFpEYUdWamEySnZlQ0E5SUc1aGRtbG5ZWFJwYjI0dWNYVmxjbmxUWld4bFkzUnZjaWhjSWk1dVlYWnBaMkYwYVc5dVgxOWphR1ZqYTJKdmVGd2lLVHRjYmlBZ2RtRnlJRzVoZGtsMFpXMXpJRDBnYm1GMmFXZGhkR2x2Ymk1eGRXVnllVk5sYkdWamRHOXlRV3hzS0Z3aUxtNWhkbWxuWVhScGIyNWZYMmwwWlcxY0lpazdYRzRnSUM4dklHNWhka2wwWlcxekxtWnZja1ZoWTJnb2FYUmxiU0E5UGx4dUlDQXZMeUFnSUdsMFpXMHVZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbU5zYVdOclhDSXNJRjhnUFQ0Z0tHNWhka05vWldOclltOTRMbU5vWldOclpXUWdQU0JtWVd4elpTa3BYRzRnSUM4dklDazdYRzRnSUc1aGRrbDBaVzF6TG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0dsMFpXMHBJSHRjYmlBZ0lDQnlaWFIxY200Z2FYUmxiUzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpWTJ4cFkydGNJaXdnWm5WdVkzUnBiMjRnS0Y4cElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdVlYWkRhR1ZqYTJKdmVDNWphR1ZqYTJWa0lEMGdabUZzYzJVN1hHNGdJQ0FnZlNrN1hHNGdJSDBwTzF4dVhHNGdJSFpoY2lCd1lYSmhiR3hoZUVKdmVDQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hDSXVZMjl1ZEdGcGJtVnljM056TG1OdmJYQnZjMmwwYVc5dVhDSXBPMXh1SUNCMllYSWdZekZzWldaMElEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb1hDSnBNVndpS1M1dlptWnpaWFJNWldaMExGeHVJQ0FnSUdNeGRHOXdJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9YQ0pwTVZ3aUtTNXZabVp6WlhSVWIzQXNYRzRnSUNBZ1l6SnNaV1owSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvWENKcE1sd2lLUzV2Wm1aelpYUk1aV1owTEZ4dUlDQWdJR015ZEc5d0lEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb1hDSnBNbHdpS1M1dlptWnpaWFJVYjNBc1hHNGdJQ0FnWXpOc1pXWjBJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9YQ0pwTTF3aUtTNXZabVp6WlhSTVpXWjBMRnh1SUNBZ0lHTXpkRzl3SUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvWENKcE0xd2lLUzV2Wm1aelpYUlViM0E3WEc0Z0lDOHZZelJzWldaMElEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRZ0tDQW5hVFFuSUNrdWIyWm1jMlYwVEdWbWRDeGNiaUFnTHk5ak5IUnZjQ0E5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtJQ2dnSjJrMEp5QXBMbTltWm5ObGRGUnZjRHRjYmx4dUlDQndZWEpoYkd4aGVFSnZlQzV2Ym0xdmRYTmxiVzkyWlNBOUlHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hHNGdJQ0FnWlhabGJuUWdQU0JsZG1WdWRDQjhmQ0IzYVc1a2IzY3VaWFpsYm5RN1hHNGdJQ0FnZG1GeUlIZ2dQU0JsZG1WdWRDNWpiR2xsYm5SWUlDMGdjR0Z5WVd4c1lYaENiM2d1YjJabWMyVjBUR1ZtZEN4Y2JpQWdJQ0FnSUhrZ1BTQmxkbVZ1ZEM1amJHbGxiblJaSUMwZ2NHRnlZV3hzWVhoQ2IzZ3ViMlptYzJWMFZHOXdPMXh1WEc0Z0lDQWdiVzkxYzJWUVlYSmhiR3hoZUNoY0lta3hYQ0lzSUdNeGJHVm1kQ3dnWXpGMGIzQXNJSGdzSUhrc0lEVXBPMXh1SUNBZ0lHMXZkWE5sVUdGeVlXeHNZWGdvWENKcE1sd2lMQ0JqTW14bFpuUXNJR015ZEc5d0xDQjRMQ0I1TENBeE5TazdYRzRnSUNBZ2JXOTFjMlZRWVhKaGJHeGhlQ2hjSW1relhDSXNJR016YkdWbWRDd2dZek4wYjNBc0lIZ3NJSGtzSURNd0tUdGNiaUFnSUNBdkwyMXZkWE5sVUdGeVlXeHNZWGdnS0NBbmJEUW5MQ0JqTkd4bFpuUXNJR00wZEc5d0xDQjRMQ0I1TENBMk5TQXBPMXh1SUNCOU8xeHVYRzRnSUdaMWJtTjBhVzl1SUcxdmRYTmxVR0Z5WVd4c1lYZ29hV1FzSUd4bFpuUXNJSFJ2Y0N3Z2JXOTFjMlZZTENCdGIzVnpaVmtzSUhOd1pXVmtLU0I3WEc0Z0lDQWdkbUZ5SUc5aWFpQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tHbGtLVHRjYmlBZ0lDQjJZWElnY0dGeVpXNTBUMkpxSUQwZ2IySnFMbkJoY21WdWRFNXZaR1VzWEc0Z0lDQWdJQ0JqYjI1MFlXbHVaWEpYYVdSMGFDQTlJSEJoY25ObFNXNTBLSEJoY21WdWRFOWlhaTV2Wm1aelpYUlhhV1IwYUNrc1hHNGdJQ0FnSUNCamIyNTBZV2x1WlhKSVpXbG5hSFFnUFNCd1lYSnpaVWx1ZENod1lYSmxiblJQWW1vdWIyWm1jMlYwU0dWcFoyaDBLVHRjYmlBZ0lDQnZZbW91YzNSNWJHVXViR1ZtZENBOVhHNGdJQ0FnSUNCc1pXWjBJQzFjYmlBZ0lDQWdJQ2h0YjNWelpWZ2dMU0FvY0dGeWMyVkpiblFvYjJKcUxtOW1abk5sZEZkcFpIUm9LU0F2SURJZ0t5QnNaV1owS1NrZ0wxeHVJQ0FnSUNBZ0lDQmpiMjUwWVdsdVpYSlhhV1IwYUNBcVhHNGdJQ0FnSUNBZ0lITndaV1ZrSUN0Y2JpQWdJQ0FnSUZ3aWNIaGNJanRjYmlBZ0lDQnZZbW91YzNSNWJHVXVkRzl3SUQxY2JpQWdJQ0FnSUhSdmNDQXRYRzRnSUNBZ0lDQW9iVzkxYzJWWklDMGdLSEJoY25ObFNXNTBLRzlpYWk1dlptWnpaWFJJWldsbmFIUXBJQzhnTWlBcklIUnZjQ2twSUM5Y2JpQWdJQ0FnSUNBZ1kyOXVkR0ZwYm1WeVNHVnBaMmgwSUNwY2JpQWdJQ0FnSUNBZ2MzQmxaV1FnSzF4dUlDQWdJQ0FnWENKd2VGd2lPMXh1SUNCOVhHNWNiaUFnZG1GeUlIUnlZVzV6UldabVpXTjBJRDBnUW1GeVltRXVRbUZ6WlZSeVlXNXphWFJwYjI0dVpYaDBaVzVrS0h0Y2JpQWdJQ0J6ZEdGeWREb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0IwYUdsekxtNWxkME52Ym5SaGFXNWxja3h2WVdScGJtY3VkR2hsYmloMllXd2dQVDVjYmlBZ0lDQWdJQ0FnZEdocGN5NW1ZV1JsU1c1T1pYZGpiMjUwWlc1MEtDUW9kR2hwY3k1dVpYZERiMjUwWVdsdVpYSXBLVnh1SUNBZ0lDQWdLVHRjYmlBZ0lDQjlMRnh1SUNBZ0lHWmhaR1ZKYms1bGQyTnZiblJsYm5RNklHWjFibU4wYVc5dUtHNWpLU0I3WEc0Z0lDQWdJQ0J1WXk1b2FXUmxLQ2s3WEc0Z0lDQWdJQ0IyWVhJZ1gzUm9hWE1nUFNCMGFHbHpPMXh1SUNBZ0lDQWdKQ2gwYUdsekxtOXNaRU52Ym5SaGFXNWxjaWxjYmlBZ0lDQWdJQ0FnTG1aaFpHVlBkWFFvTVRBd01DbGNiaUFnSUNBZ0lDQWdMbkJ5YjIxcGMyVW9LVnh1SUNBZ0lDQWdJQ0F1Wkc5dVpTZ29LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdibU11WTNOektGd2lkbWx6YVdKcGJHbDBlVndpTENCY0luWnBjMmxpYkdWY0lpazdYRzRnSUNBZ0lDQWdJQ0FnYm1NdVptRmtaVWx1S0RFd01EQXNJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdVpHOXVaU2dwTzF4dUlDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1SUNCQ1lYSmlZUzVRYW1GNExtTmhZMmhsUlc1aFlteGxaQ0E5SUhSeWRXVTdYRzRnSUVKaGNtSmhMa1JwYzNCaGRHTm9aWEl1YjI0b1hDSnVaWGRRWVdkbFVtVmhaSGxjSWl3Z1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0pDaGtiMk4xYldWdWRDa3VjbVZoWkhrb1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQXZMeUJqWVdOb1pTQkVUMDFjYmx4dUlDQWdJQ0FnSkNnbllTNXFjeTF6WTNKdmJHd3RkSEpwWjJkbGNsdG9jbVZtS2oxY0lpTmNJbDA2Ym05MEtGdG9jbVZtUFZ3aUkxd2lYU2tuS1M1amJHbGpheWhtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLRnh1SUNBZ0lDQWdJQ0FnSUd4dlkyRjBhVzl1TG5CaGRHaHVZVzFsTG5KbGNHeGhZMlVvTDE1Y1hDOHZMQ0JjSWx3aUtTQTlQVnh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV3WVhSb2JtRnRaUzV5WlhCc1lXTmxLQzllWEZ3dkx5d2dYQ0pjSWlrZ0ppWmNiaUFnSUNBZ0lDQWdJQ0JzYjJOaGRHbHZiaTVvYjNOMGJtRnRaU0E5UFNCMGFHbHpMbWh2YzNSdVlXMWxYRzRnSUNBZ0lDQWdJQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lIWmhjaUIwWVhKblpYUWdQU0FrS0hSb2FYTXVhR0Z6YUNrN1hHNGdJQ0FnSUNBZ0lDQWdkR0Z5WjJWMElEMGdkR0Z5WjJWMExteGxibWQwYUZ4dUlDQWdJQ0FnSUNBZ0lDQWdQeUIwWVhKblpYUmNiaUFnSUNBZ0lDQWdJQ0FnSURvZ0pDaGNJbHR1WVcxbFBWd2lJQ3NnZEdocGN5NW9ZWE5vTG5Oc2FXTmxLREVwSUNzZ1hDSmRYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2gwWVhKblpYUXViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBa0tGd2lhSFJ0YkN3Z1ltOWtlVndpS1M1aGJtbHRZWFJsS0Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJOeWIyeHNWRzl3T2lCMFlYSm5aWFF1YjJabWMyVjBLQ2t1ZEc5d0lDMGdOakJjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdNVEF3TUN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnWENKbFlYTmxTVzVQZFhSRmVIQnZYQ0pjYmlBZ0lDQWdJQ0FnSUNBZ0lDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOUtUdGNibHh1SUNBZ0lDQWdiV2w0YVhSMWNDaGNJaU50YVhndGQzSmhjSEJsY2x3aUxDQjdYRzRnSUNBZ0lDQWdJR3h2WVdRNklIdGNiaUFnSUNBZ0lDQWdJQ0J6YjNKME9pQmNJbVJsWm1GMWJIUTZZWE5qWENJZ0x5b2daR1ZtWVhWc2REcGhjMk1nS2k5Y2JpQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdMeThnWVc1cGJXRjBhVzl1T2lCN1hHNGdJQ0FnSUNBZ0lDOHZJQ0FnSUNCa2RYSmhkR2x2YmpvZ056QXdMRnh1SUNBZ0lDQWdJQ0F2THlBZ0lDQWdaV1ptWldOMGN6b2dKMlpoWkdVZ2RISmhibk5zWVhSbFdTZzJNREFsS1NCemRHRm5aMlZ5S0RNMWJYTXBKeXhjYmlBZ0lDQWdJQ0FnTHk4Z0lDQWdJR1ZoYzJsdVp6b2dKMk4xWW1sakxXSmxlbWxsY2lnd0xqZzJMQ0F3TENBd0xqQTNMQ0F4S1Njc1hHNGdJQ0FnSUNBZ0lDOHZJQ0FnSUNCeVpYWmxjbk5sVDNWME9pQjBjblZsWEc0Z0lDQWdJQ0FnSUM4dklDQWdmU3hjYmlBZ0lDQWdJQ0FnWTJ4aGMzTk9ZVzFsY3pvZ2UxeHVJQ0FnSUNBZ0lDQWdJR0pzYjJOck9pQmNJbUp2ZUZ3aUlDOHFJRzFwZUdsMGRYQWdLaThzWEc0Z0lDQWdJQ0FnSUNBZ1pXeGxiV1Z1ZEVacGJIUmxjam9nWENKbWFXeDBaWEl0WW5SdVhDSWdMeW9nWTI5dWRISnZiQ0FxTHl4Y2JpQWdJQ0FnSUNBZ0lDQmxiR1Z0Wlc1MFUyOXlkRG9nWENKemIzSjBMV0owYmx3aUlDOHFJR052Ym5SeWIyd2dLaTljYmlBZ0lDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUNBZ2MyVnNaV04wYjNKek9pQjdYRzRnSUNBZ0lDQWdJQ0FnZEdGeVoyVjBPaUJjSWk1dGFYZ3RkR0Z5WjJWMFhDSWdMeW9nTG0xcGVDQXFMMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5S1R0Y2JpQWdmU2s3WEc1Y2JpQWdMeThnUW1GeVltRXVSR2x6Y0dGMFkyaGxjaTV2YmlnbmJtVjNVR0ZuWlZKbFlXUjVKeXdnS0NrZ1BUNGdlMXh1SUNBdkx5QWdJQ0FnWTI5dWMzUWdjbTkxZEdWeklEMGdibVYzSUZKdmRYUmxjaWh3WVdkbGN5azdYRzRnSUM4dklDQWdJQ0J5YjNWMFpYTXViRzloWkVWMlpXNTBjeWdwTzF4dUlDQXZMeUFnSUgwcE8xeHVJQ0JDWVhKaVlTNVFhbUY0TG1kbGRGUnlZVzV6YVhScGIyNGdQU0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkSEpoYm5ORlptWmxZM1E3WEc0Z0lIMDdYRzRnSUVKaGNtSmhMbEJxWVhndWMzUmhjblFvS1R0Y2JseHVYRzRpWFgwPSJ9

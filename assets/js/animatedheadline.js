$(document).ready(function () {
  // Navigation Scroll Effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#mainNav").addClass("scrolled");
    } else {
      $("#mainNav").removeClass("scrolled");
    }
  });

  // Animated Headline Plugin
  !(function (a) {
    a.fn.animatedHeadline = function (e) {
      function s(a) {
        var i = r(a);
        if (a.parents(".ah-headline").hasClass("clip")) {
          a.parents(".ah-words-wrapper").animate(
            {
              width: "2px",
            },
            h.revealDuration,
            function () {
              d(a, i);
              t(i);
            }
          );
        }
      }
      function t(a) {
        if (a.parents(".ah-headline").hasClass("clip")) {
          a.parents(".ah-words-wrapper").animate(
            {
              width: a.width() + 10,
            },
            h.revealDuration,
            function () {
              setTimeout(function () {
                s(a);
              }, h.revealAnimationDelay);
            }
          );
        }
      }
      function r(a) {
        return a.is(":last-child") ? a.parent().children().eq(0) : a.next();
      }
      function d(a, i) {
        a.removeClass("is-visible").addClass("is-hidden");
        i.removeClass("is-hidden").addClass("is-visible");
      }

      var h = a.extend(
        {
          animationType: "clip",
          animationDelay: 2500,
          revealDuration: 600,
          revealAnimationDelay: 1500,
        },
        e
      );

      var p = h.animationDelay;

      this.each(function () {
        var i = a(this);
        if (h.animationType && "clip" == h.animationType) {
          i.addClass(h.animationType);
          var e = i.find(".ah-words-wrapper"),
            t = e.width() + 10;
          e.css("width", t);
        }
        setTimeout(function () {
          s(i.find(".is-visible").eq(0));
        }, p);
      });
    };
  })(jQuery);

  // Initialize Animated Headline
  $("#myHeadline").animatedHeadline({
    animationType: "clip",
    animationDelay: 3500,
    revealDuration: 600,
    revealAnimationDelay: 1500,
  });
});

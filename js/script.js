(function () {
  "use strict";

  var UP = 38
    , DOWN = 40
    , LEFT = 37
    , RIGHT = 39
    , accel = 1
    , max = 15
    , start = rect(0, 500, 200, 300)
    , end = rect(600, 500, 200, 300)
    ;

  function rect(x, y, width, height) {
    var me = {
      x: x
    , y: y
    , width: width
    , height: height
    };

    return me;
  }

  function stayOnBoard(fish) {
    if (fish.x < 0) {
      fish.x = 1;
    }

    if (fish.y < 0) {
      fish.y = 1;
    }

    if (fish.x > 750) {
      fish.x = 749;
    }

    if (fish.y > 750) {
      fish.dir += 749;
    }
  }

  function checkCollision(fish) {
    stayOnBoard(fish);
  }

  function distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }

  function fish() {
    var me
      ;

    me = {
      x: 40

    , y: 650

    , vel: 0

    , dir: 0

    , goalX: 20

    , goalY: 20

    , go: function (x, y) {
        me.goalX = x;
        me.goalY = y;
      }

    , move: function () {
        var tmpX
          , tmpY
          , dist
          ;

        if (!checkCollision(me)) {
          if (me.goalY !== null) {
            me.dir = Math.atan2(me.goalY - me.y, me.goalX - me.x);
            dist = distanceBetween(me.x, me.y, me.goalX, me.goalY);
            me.vel = Math.min(dist / 10, max);
          }

          tmpX = me.vel * Math.cos(me.dir);
          tmpY = me.vel * Math.sin(me.dir);

          me.x += tmpX;
          me.y += tmpY;
        }
      }

    , render: function () {
        $('#fish').css({top: me.y + "px", left: me.x + "px"});
      }
    };

    return me;
  }

  $(function () {
    var f = fish()
      , track = false
      ;

    $(document).on('mousedown', function (e) {
      f.go(e.pageX, e.pageY);
      track = true;
    });

    $(document).on('mouseup', function (e) {
      track = false;
      f.goalX = null;
      f.goalY = null;
    });

    $(document).on('mousemove', function (e) {
      track && f.go(e.pageX, e.pageY);
    });

    window.setInterval(function () {
      f.move();
      f.render();
    }, 100);
  });
}());

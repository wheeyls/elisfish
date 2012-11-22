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
      fish.y = 749;
    }

    if (fish.y < 500) {
      fish.velY += 0.8;
    }
  }

  function checkCollision(fish) {
    stayOnBoard(fish);
  }

  function fish() {
    var me
      ;

    me = {
      x: 40

    , y: 650

    , velX: 0

    , velY: 0

    , go: function (dir) {
        var acc = me.y > 500 ? 0.2 : accel
          , m = me.y > 500 ? 4 : max
          ;

        //if (me.y < 500) { return; }
        switch (dir) {
        case RIGHT:
          me.velX = Math.min(me.velX + acc, m);
          return false;
        case LEFT:
          me.velX = Math.max(me.velX - acc, -m);
          return false;
        case UP:
          me.velY = Math.max(me.velY - acc, -m);
          return false;
        case DOWN:
          me.velY = Math.min(me.velY + acc, m);
          return false;
        }
      }

    , move: function () {
        if (!checkCollision(me)) {
          me.x += me.velX;
          me.y += me.velY;
        }
      }

    , render: function () {
        $('#fish').css({top: me.y + "px", left: me.x + "px"});
      }
    };

    return me;
  }

  $(function () {
    var f = fish();
    $(document).on('keydown', function (e) {
      return f.go(e.keyCode);
    });

    window.setInterval(function () {
      f.move();
      f.render();
    }, 100);
  });
}());

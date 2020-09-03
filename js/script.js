function start() {
  $("#card").hide();
  $("#container").append("<div id='apache' class='apache-animation'></div>");
  $("#container").append("<div id='chopper' class='chopper-animation'></div>");
  $("#container").append("<div id='truck'></div>");
  $("#container").append("<div id='friend' class='friend-animation'></div>");

  var game = {};

  var keycode = { w: 87, s: 83, d: 68 };

  var chopperPositionY = parseInt(Math.random() * 334);

  var canShoot = true;

  game.keyPressed = {};

  $(document).keydown(function (e) {
    game.keyPressed[e.which] = true;
  });

  $(document).keyup(function (e) {
    game.keyPressed[e.which] = false;
  });

  game.loop = setInterval(loop, 30);

  function loop() {
    moveBackground();
    moveApache();
    moveChopper();
    moveTruck();
    moveFriend();
  }

  function moveBackground() {
    var left = parseInt($("#container").css("background-position"));
    $("#container").css("background-position", left - 1);
  }

  function moveApache() {
    if (game.keyPressed[keycode.w]) {
      var top = parseInt($("#apache").css("top"));
      $("#apache").css("top", top - 10);

      if (top <= 0) {
        $("#apache").css("top", top + 10);
      }
    }

    if (game.keyPressed[keycode.s]) {
      var top = parseInt($("#apache").css("top"));
      $("#apache").css("top", top + 10);

      if (top >= 434) {
        $("#apache").css("top", top - 10);
      }
    }

    if (game.keyPressed[keycode.d]) {
      shoot();
    }
  }

  function moveChopper() {
    var chopperPositionX = parseInt($("#chopper").css("left"));
    $("#chopper").css("left", chopperPositionX - 5);
    $("#chopper").css("top", chopperPositionY);

    if (chopperPositionX <= 0) {
      chopperPositionY = parseInt(Math.random() * 334);
      $("#chopper").css("left", 694);
      $("#chopper").css("top", chopperPositionY);
    }
  }

  function moveTruck() {
    var truckPositionX = parseInt($("#truck").css("left"));
    $("#truck").css("left", truckPositionX - 3);

    if (truckPositionX <= 0) {
      $("#truck").css("left", 775);
    }
  }

  function moveFriend() {
    var friendPositionX = parseInt($("#friend").css("left"));
    $("#friend").css("left", friendPositionX + 1);

    if (friendPositionX > 906) {
      $("#friend").css("left", 0);
    }
  }

  function shoot() {
    if (canShoot === true) {
      canShoot = false;

      var apacheTop = parseInt($("#apache").css("top"));
      var apacheLeft = parseInt($("#apache").css("left"));
      var shotTop = apacheTop + 37;
      var shotLeft = apacheLeft + 190;
      $("#container").append("<div id='shot'></div");
      $("#shot").css("top", shotTop);
      $("#shot").css("left", shotLeft);

      var shotTimer = window.setInterval(executeShot, 30);
    }

    function executeShot() {
      var shotLeft = parseInt($("#shot").css("left"));
      $("#shot").css("left", shotLeft + 15);

      if (shotLeft > 900) {
        window.clearInterval(shotTimer);
        shotTimer = null;
        $("#shot").remove();
        canShoot = true;
      }
    }
  }
}

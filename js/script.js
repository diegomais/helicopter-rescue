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
  game.over = false;

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
    collision();
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

  function collision() {
    var collisionApacheChopper = $("#apache").collision($("#chopper"));
    var collisionApacheTruck = $("#apache").collision($("#truck"));
    var collisionShotChopper = $("#shot").collision($("#chopper"));
    var collisionShotTruck = $("#shot").collision($("#truck"));

    if (collisionApacheChopper.length > 0) {
      var chopperLeft = parseInt($("#chopper").css("left"));
      var chopperTop = parseInt($("#chopper").css("top"));
      explosionChopper(chopperLeft, chopperTop);

      chopperPositionY = parseInt(Math.random() * 334);
      $("#chopper").css("left", 694);
      $("#chopper").css("top", chopperPositionY);
    }

    if (collisionApacheTruck.length > 0) {
      var truckLeft = parseInt($("#truck").css("left"));
      var truckTop = parseInt($("#truck").css("top"));
      explosionTruck(truckLeft, truckTop);
      $("#truck").remove();

      setNewTruck();
    }

    if (collisionShotChopper.length > 0) {
      var chopperLeft = parseInt($("#chopper").css("left"));
      var chopperTop = parseInt($("#chopper").css("top"));
      explosionChopper(chopperLeft, chopperTop);
      $("#shot").css("left", 950);

      chopperPositionY = parseInt(Math.random() * 334);
      $("#chopper").css("left", 694);
      $("#chopper").css("top", chopperPositionY);
    }

    if (collisionShotTruck.length > 0) {
      var truckLeft = parseInt($("#truck").css("left"));
      var truckTop = parseInt($("#truck").css("top"));
      $("#truck").remove();
      explosionTruck(truckLeft, truckTop);
      $("#shot").css("left", 950);

      setNewTruck();
    }

    function explosionChopper(chopperLeft, chopperTop) {
      $("#container").append("<div id='explosion-chopper'></div");
      $("#explosion-chopper").css(
        "background-image",
        "url(assets/img/explosion.png)"
      );
      var div = $("#explosion-chopper");
      div.css("left", chopperLeft);
      div.css("top", chopperTop);
      div.animate({ width: 200, opacity: 0 }, "slow");

      var explosionTimer = window.setInterval(removeExplosion, 1000);

      function removeExplosion() {
        div.remove();
        window.clearInterval(explosionTimer);
        explosionTimer = null;
      }
    }

    function explosionTruck(truckLeft, truckTop) {
      $("#container").append("<div id='explosion-truck'></div");
      $("#explosion-truck").css(
        "background-image",
        "url(assets/img/explosion.png)"
      );
      var div = $("#explosion-truck");
      div.css("top", truckTop);
      div.css("left", truckLeft);
      div.animate({ width: 200, opacity: 0 }, "slow");

      var explosionTimer = window.setInterval(removeExplosion, 1000);

      function removeExplosion() {
        div.remove();
        window.clearInterval(explosionTimer);
        explosionTimer = null;
      }
    }

    function setNewTruck() {
      var newTruckTimer = window.setInterval(setTruck, 5000);

      function setTruck() {
        window.clearInterval(newTruckTimer);
        newTruckTimer = null;

        if (game.over === false) {
          $("#container").append("<div id='truck'></div");
        }
      }
    }
  }
}

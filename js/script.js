function start() {
  $("#card").hide();
  $("#container").append("<div id='apache' class='apache-animation'></div>");
  $("#container").append("<div id='chopper' class='chopper-animation'></div>");
  $("#container").append("<div id='truck'></div>");
  $("#container").append("<div id='friend' class='friend-animation'></div>");
  $("#container").append("<div id='score'></div>");
  $("#container").append("<div id='energy'></div>");

  var game = {};

  var keycode = { w: 87, s: 83, d: 68 };

  var chopperPositionY = parseInt(Math.random() * 334);

  var canShoot = true;

  game.keyPressed = {};
  game.over = false;
  game.score = 0;
  game.rescues = 0;
  game.deaths = 0;
  game.energy = 3;
  game.chopperSpeed = 5;

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
    score();
    energy();
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
    $("#chopper").css("left", chopperPositionX - game.chopperSpeed);
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
    var collisionApacheFriend = $("#apache").collision($("#friend"));
    var collisionApacheTruck = $("#apache").collision($("#truck"));
    var collisionShotChopper = $("#shot").collision($("#chopper"));
    var collisionShotTruck = $("#shot").collision($("#truck"));
    var collisionTruckFriend = $("#truck").collision($("#friend"));

    if (collisionApacheChopper.length > 0) {
      game.energy--;
      var chopperLeft = parseInt($("#chopper").css("left"));
      var chopperTop = parseInt($("#chopper").css("top"));
      explosionChopper(chopperLeft, chopperTop);

      chopperPositionY = parseInt(Math.random() * 334);
      $("#chopper").css("left", 694);
      $("#chopper").css("top", chopperPositionY);
    }

    if (collisionApacheTruck.length > 0) {
      game.energy--;
      var truckLeft = parseInt($("#truck").css("left"));
      var truckTop = parseInt($("#truck").css("top"));
      explosionTruck(truckLeft, truckTop);
      $("#truck").remove();

      setNewTruck();
    }

    if (collisionShotChopper.length > 0) {
      game.score += 100;
      game.chopperSpeed += 0.3;
      var chopperLeft = parseInt($("#chopper").css("left"));
      var chopperTop = parseInt($("#chopper").css("top"));
      explosionChopper(chopperLeft, chopperTop);
      $("#shot").css("left", 950);

      chopperPositionY = parseInt(Math.random() * 334);
      $("#chopper").css("left", 694);
      $("#chopper").css("top", chopperPositionY);
    }

    if (collisionShotTruck.length > 0) {
      game.score += 50;
      var truckLeft = parseInt($("#truck").css("left"));
      var truckTop = parseInt($("#truck").css("top"));
      $("#truck").remove();
      explosionTruck(truckLeft, truckTop);
      $("#shot").css("left", 950);

      setNewTruck();
    }

    if (collisionApacheFriend.length > 0) {
      game.rescues++;
      setNewFriend();
      $("#friend").remove();
    }

    if (collisionTruckFriend.length > 0) {
      game.deaths++;
      var friendLeft = parseInt($("#friend").css("left"));
      var friendTop = parseInt($("#friend").css("top"));
      explosionFriend(friendLeft, friendTop);
      $("#friend").remove();

      setNewFriend();
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

    function explosionFriend(friendLeft, friendTop) {
      $("#container").append(
        "<div id='friend-death' class='friend-death'></div"
      );
      $("#friend-death").css("top", friendTop);
      $("#friend-death").css("left", friendLeft);
      var explosionTimer = window.setInterval(removeExplosion, 1000);
      function removeExplosion() {
        $("#friend-death").remove();
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

    function setNewFriend() {
      var newFriendTimer = window.setInterval(setFriend, 6000);

      function setFriend() {
        window.clearInterval(newFriendTimer);
        newFriendTimer = null;

        if (game.over === false) {
          $("#container").append(
            "<div id='friend' class='friend-animation'></div>"
          );
        }
      }
    }
  }

  function score() {
    $("#score").html(
      "<h2> Score: " +
        game.score +
        " Rescues: " +
        game.rescues +
        " Deaths: " +
        game.deaths +
        "</h2>"
    );
  }

  function energy() {
    if (game.energy === 3) {
      $("#energy").css("background-image", "url(assets/img/energy3.png)");
    }

    if (game.energy === 2) {
      $("#energy").css("background-image", "url(assets/img/energy2.png)");
    }

    if (game.energy === 1) {
      $("#energy").css("background-image", "url(assets/img/energy1.png)");
    }

    if (game.energy === 0) {
      $("#energy").css("background-image", "url(assets/img/energy0.png)");
    }
  }
}

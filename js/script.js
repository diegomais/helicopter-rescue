function start() {
  $("#card").hide();
  $("#container").append("<div id='apache' class='apache-animation'></div>");
  $("#container").append("<div id='chopper' class='chopper-animation'></div>");
  $("#container").append("<div id='truck'></div>");
  $("#container").append("<div id='friend' class='friend-animation'></div>");

  var game = {};

  var keycode = { w: 87, s: 83, d: 68 };

  var chopperPositionY = parseInt(Math.random() * 334);

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
      console.log("d");
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
}

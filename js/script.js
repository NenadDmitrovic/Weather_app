$(document).ready(function () {
  $.ajax({
    url: "http://api.weatherapi.com/v1/current.json",
    data: {
      key: "8392bc86f0604ef2bd3115300232807",
      q: "Belgrade",
    },
    success: function (response) {
      console.log(response);

      const ime_grada = response["location"]["name"];
      const temperatura = response["current"]["temp_c"];
      const stanje = response["current"]["condition"]["text"];
      const img_stanje = response["current"]["condition"]["icon"];
      $("#header").append(
        "<h2>" +
          ime_grada +
          "</h2>" +
          "<br>" +
          "<h1>" +
          temperatura +
          "°C" +
          "</h1>" +
          "<br>" +
          "<p>" +
          stanje +
          "</p>" +
          "<img src='" +
          img_stanje +
          "'>"
      );
    },
  });

  /*
  $.ajax({
    url: "http://api.weatherapi.com/v1/forecast.json",
    data: {
      key: "8392bc86f0604ef2bd3115300232807",
      q: "Belgrade",
    },

    success: function (response) {
      console.log(response);
      const trenutno = response["current"]["last_updated"];
      const temp = response["current"]["temp_c"];
      const stanje = response["current"]["condition"]["text"];
      const img_stanje = response["current"]["condition"]["icon"];

      function convertTime(dateTime) {
        const [date, time] = dateTime.split(" ");
        const [hours, minutes] = time.split(":");

        const period = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 === 0 ? 12 : hours % 12;

        const vreme = `${hours12} ${period}`;
        return vreme;
      }
      const vreme = convertTime(trenutno);

      $("#footer").append(
        "<div id='hours'>" +
          "<div>" +
          vreme +
          "</div>" +
          "<img src='" +
          img_stanje +
          "'>" +
          "<h3>" +
          temp +
          "°C" +
          "</h3>" +
          "</div>"
      );
    },
  });
*/
  $.ajax({
    url: "http://api.weatherapi.com/v1/forecast.json",
    data: {
      key: "8392bc86f0604ef2bd3115300232807",
      q: "Belgrade",
      days: 4,
    },

    success: function (response) {
      for (let i = 0; i < response.forecast.forecastday.length; i++) {
        const forecastDay = response.forecast.forecastday[i];

        const fullDate = forecastDay.date.split("-");
        const mesec = fullDate[1];
        const dan = fullDate[2];

        const datum = `${mesec} ${dan}`;

        const temperatura = Math.round(forecastDay.day.avgtemp_c);
        const ikonica = forecastDay.day.condition.icon;
        $("#footer").append(
          "<div id='days'>" +
            datum +
            "<img src='" +
            ikonica +
            "'>" +
            temperatura +
            "°C" +
            "</div>"
        );
      }
    },
  });

  // OSTALI GRADOVI
  $("#search").on("click", function () {
    const ime_grada = $("#cityInput").val().toUpperCase();
    $("#grad").empty();
    $.ajax({
      url: "http://api.weatherapi.com/v1/current.json",
      data: {
        key: "8392bc86f0604ef2bd3115300232807",
        q: ime_grada,
      },

      success: function (response) {
        console.log(ime_grada);
        const temperatura = response["current"]["temp_c"];
        const ikonica = response["current"]["condition"]["icon"];
        const text = response["current"]["condition"]["text"];
        $("#grad").append(
          "<h2>" +
            ime_grada +
            "</h2>" +
            "<h1>" +
            temperatura +
            "°C" +
            "</h1>" +
            "<p>" +
            text +
            "</p>" +
            "<img src='" +
            ikonica +
            "'>"
        );

        $("#grad").css("display", "block");
      },
    });
  });
});

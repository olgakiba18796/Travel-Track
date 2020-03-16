let map, infoWindow;
async function createMap() {
  let a = 0;
  let b = 130;
  diff = 0.0033;
  let options = {
    center: { lat: a, lng: b },
    zoom: 3,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
  };
  // let polygonCoordinates = [
  //   { lat: a - diff, lng: b - diff },
  //   { lat: a + diff, lng: b - diff },
  //   { lat: a + diff, lng: b + diff },
  //   { lat: a - diff, lng: b + diff }
  // ];

  map = new google.maps.Map(document.getElementById("map"), options);

  // Listen for click on map
  google.maps.event.addListener(map, "click", async function(event) {
    // Add marker

    let result = prompt("what is the name of a place?");
    if (result !== null && result !== "") {
      addMarker({ coords: event.latLng });
      let response = await axios.post("http://localhost:3000/savePlaces", {
        name: result,
        coords: event.latLng
      });
    }
  });

  // Array of markers
  // let markers = [
  //   {
  //     coords: { lat: 42.4668, lng: -70.9495 }
  //   }
  // ];

  window.onload = async event => {
    event.preventDefault();
    const response = await axios.get("http://localhost:3000/getPlaces");
    const places = response.data;
    console.log(places);

    places.map(place => addMarker(place));
  };

  // Loop through markers
  // for (let i = 0; i < markers.length; i++) {
  //   // Add marker
  //   addMarker(markers[i]);
  // }

  // Add Marker Function
  function addMarker(p) {
    let marker = new google.maps.Marker({
      position: p.coords,
      map: map,
      icon:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });

    // Check for customicon
    if (p.iconImage) {
      // Set icon image
      marker.setIcon(p.iconImage);
    }

    // Check content
    if (p.content) {
      let infoWindow = new google.maps.InfoWindow({
        content: p.content
      });

      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });
    }
  }

  //--------------------my position
  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(p) {
        let position = {
          lat: p.coords.latitude,
          lng: p.coords.longitude
        };

        infoWindow.setPosition(position);
        infoWindow.setContent("Your are here!");
        infoWindow.open(map);
        map.setCenter(position);
      },
      function() {
        handleLocationError("Geolocation service failed", map.getCenter());
      }
    );
  } else {
    handleLocationError("No geolocation available.", map.getCenter());
  }

  function handleLocationError(content, position) {
    infoWindow.setPosition(position);
    infoWindow.setContent(content);
    infoWindow.open(map);
  }
}
//--------------
var a = $(window).width();
var b = $(window).height();
var f = (a * b) / 2000;

function star(obj, frequency, k, size) {
  for (var i = 0; i < frequency; i++) {
    var x = Math.random() * a * k;
    var y = Math.random() * b * k;
    $("." + obj).append(
      '<div class="star" style="left:' +
        x +
        "px;top:" +
        y +
        "px;transform:scale(" +
        size +
        ')"></div>'
    );
  }
}

var k1 = 1.2;
var k2 = 1.2 * k1;
star("cosmo1", f, k1, 1);
star("cosmo2", f * 0.3, k2, 2);

$(document).mousemove(function(e) {
  var posX = e.pageX;
  var posY = e.pageY;
  $(".cosmo1").css("left", (1 - k1) * posX + "px");
  $(".cosmo1").css("top", (1 - k1) * posY + "px");
  $(".cosmo2").css("left", (1 - k2) * posX + "px");
  $(".cosmo2").css("top", (1 - k2) * posY + "px");
});

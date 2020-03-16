const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://OlgaKiba:999333qw@cluster0-ghnbl.mongodb.net/MyTravel",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
const Place = require("../models/place");
(async () => {
  const place1 = new Place({
    name: "Shanghai",
    coords: {
      lat: 31.224361,
      lng: 121.46917
    }
  });
  await place1.save();

  const place2 = new Place({
    name: "London",
    coords: {
      lat: 51.509865,
      lng: -0.118092
    }
  });
  await place2.save();
  const place3 = new Place({
    name: "New-York",
    coords: {
      lat: 40.73061,
      lng: -73.935242
    }
  });
  await place3.save();

  await mongoose.connection.close();
})();

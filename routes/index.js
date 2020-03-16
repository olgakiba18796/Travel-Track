const router = require("express").Router();
const Place = require("../models/place");
const User = require("../models/user");

router.get("/", async (req, res) => {
  let { user } = req.session;
  res.render("index", { user });
});

router.get("/:id/map", async (req, res) => {
  let { user } = req.session;
  res.render("map", { user });
});
router.post("/savePlaces", async function(req, res) {
  let { user } = req.session;
  const { name, coords } = req.body;
  const place = new Place({ name, coords });
  await place.save();
  const placeId = place._id;
  await Place.update({ _id: placeId }, { $addToSet: { users: user._id } });
  await User.update({ _id: user._id }, { $addToSet: { places: placeId } });
  res.json(true);
});
router.get("/getPlaces", async (req, res) => {
  try {
    let { user } = req.session;

    let coords = await User.find({ _id: user._id }, { _id: 0 })
      .select("places")
      .populate("places");

    coords = coords[0].places;
    coords = coords.filter(i => i.coords);

    res.json(coords);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  let { user } = req.session;
  let places = await User.find({ _id: user._id }, { _id: 0 })
    .select("places")
    .populate("places");
  places = places[0];
  places = places.places;
  places = places.map(x => x.toObject());

  res.render("account", { user, places });
});

router.delete("/:id", async (req, res, next) => {
  await Place.deleteOne({ _id: req.params.id });

  res.json();
});
module.exports = router;

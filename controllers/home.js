const HomeController = {
  Index: async (req, res) => {
    res.render("home/index", { title: "PoochPal" });
  },
};

module.exports = HomeController;

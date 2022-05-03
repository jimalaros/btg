import subscription from "../models/subscriptions";
import investmentFund from "../models/investmentFunds";
import User from "../models/User";

export const newSubscription = (req, res) => {
  res.render("subscriptions/newSubscription");
};

export const allSubscriptions = async (req, res) => {
  const subscriptions = await subscription.find({user: req.user.id})
    .sort({ date: "desc" })
    .lean();
  res.render("subscriptions/allSubscriptions", { subscriptions });
};

export const createNewSubscription = async (req, res) => {
  const errors = [];
  const { title } = req.body;
  const id = req.user.id;
  const userToFind = await User.findById(id);
  const fundToFind = await investmentFund.find({ nameInvestmentFund: title });
  const total = userToFind.money - fundToFind[0].investment;
  if (!title) {
    errors.push({ text: "Please Write the name of the investment fund" });
  }
  if (errors.length > 0) {
    res.render("subscriptions/newSubscription", {
      errors,
      title,
    });
  } else {
    if (total > 0) {
      const newSubscription = new subscription({ title, total });
      newSubscription.user = id;
      await newSubscription.save();
      req.flash("success_msg", "Subscribed Successfully");
      res.redirect("/subscriptions");
    } else {
      req.flash("error_msg", `Not enough money to subscribe into ${fundTofind}`);
    }
  }
};

export const cancelSubscription = async (req, res) => {
  const userToFind = await User.findById(req.user.id);
  const subscriptionToFind = await subscription.findById(req.params.id);
  const fundToFind = await investmentFund.find({ nameInvestmentFund: subscriptionToFind.title });
  userToFind.money = fundToFind.investment + subscriptionToFind.total;
  await subscription.findByIdAndDelete(req.params.id);
  req.flash("success_msg", `Subscription cancelled successfully, money ${fundToFind.investment} charged back on the account of the user ${userToFind.name}`);
  res.redirect("/subscriptions");
};
import investmentFund from "../models/investmentFunds";

export const newInvestmentFund = (req, res) => {
  res.render("investmentFunds/newInvestmentFund");
};

export const allInvestmentFunds = async (req, res) => {
  const investmentFunds = await investmentFund.find()
    .sort({ date: "desc" })
    .lean();
  res.render("investmentFunds/allInvestmentFunds", { investmentFunds });
};

export const createNewInvestmentFund = async (req, res) => {
  const { nameInvestmentFund, investment, category } = req.body;
  const errors = [];
  if (!nameInvestmentFund) {
    errors.push({ text: "Please Write a Name." });
  }
  if (!investment) {
    errors.push({ text: "Please Write the investment" });
  }
  if (!category) {
    errors.push({ text: "Please Write a Category." });
  }
  if (errors.length > 0) {
    res.render("investmentFunds/newInvestmentFund", {
      errors,
      nameInvestmentFund,
      investment,
      category,
    });
  } else {
    const newInvestmentFund = new investmentFund({ nameInvestmentFund, investment, category });
    await newInvestmentFund.save();
    req.flash("success_msg", "investment Fund Added Successfully");
    res.redirect("/investmentFunds");
  }
};

export const editInvestmentFund = async (req, res) => {
  const investmentFund = await investmentFund.findById(req.params.id).lean();
  if (investmentFund.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/investmentFunds");
  }
  res.render("investmentFunds/edit-investmentFund", { investmentFund });
};

export const updateInvestmentFund = async (req, res) => {
  const { nameInvestmentFund, investment, category } = req.body;
  await investmentFund.findByIdAndUpdate(req.params.id, { nameInvestmentFund, investment, category });
  req.flash("success_msg", "investment fund Updated Successfully");
  res.redirect("/investmentFunds");
};

export const deleteInvestmentFund = async (req, res) => {
  await investmentFund.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "investment fund Deleted Successfully");
  res.redirect("/investmentFunds");
};

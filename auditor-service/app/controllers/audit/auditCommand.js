const Audit = require('../../models/Audit');

async function createAudit(req, res, next) {
  try {
    const { action, parameters, isSuccess, reason, ipaddress, accessLog } = req.body;
    const newAudit = new Audit({
      action,
      parameters,
      isSuccess,
      reason,
      ipaddress,
      accessLog,
    });
    await newAudit.save();

    return res.status(200).send({
      isSuccess: true,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createAudit };

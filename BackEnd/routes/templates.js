const express = require("express");
const router = new express.Router();

const {validate} = require("jsonschema");
const templateSchema = require("../schemas/templateSchema");
const { ensureLoggedIn, ensureAdmin} = require("../middleware/auth");

const Template = require("../models/templates");


router.get("/", async function(req, res, next) {
    try {
      const templates = await Template.findAll(req.query);
      return res.json({templates});
    }
  
    catch (err) {
      return next(err);
    }
  });
  
  
   router.get("/:id", async function(req, res, next) {
    try {
      const template = await Template.findOne(req.params.id);
      return res.json({template});
    }
  
    catch (err) {
      return next(err);
    }
  });
  
  
  router.post("/", ensureLoggedIn, async function(req, res, next) {
    try {
      const validation = validate(req.body, templateSchema);
      if (!validation.valid) {
        return next({
          status: 400,
          error: validation.errors.map(e => e.stack)
        });
      }
      const template = await Template.create(req.body);
      return res.status(201).json({template});
    }
  
    catch (err) {
      return next(err);
    }
  });
  
  
  router.put("/:id", async function(req, res, next) {
    try {
      const validation = validate(req.body, templateSchema);
      if (!validation.valid) {
        return next({
          status: 400,
          errors: validation.errors.map(e => e.stack)
        });
      }
      const template = await Template.update(req.params.id, req.body);
      return res.json({template});
    }
  
    catch (err) {
      return next(err);
    }
  });
  
  // This is a delete route made post in order to use ensureAdmin
  
  router.post("/:id", ensureAdmin, async function(req, res, next) {
    try {
      await Template.remove(req.params.id);
      return res.json({ message: "Template deleted" });
    } catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;
  
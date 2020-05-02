const express = require('express');
const path = require('path');
var fs = require('fs');
var os = require('os');
const router =express.Router();
const { check, validationResult } = require('express-validator');
const data = require('../public/data');


let Request = require('../models/request');
let User = require('../models/user');

router.get('/', (req,res) => {
       res.render('request',{
         data:data.data
       });
});

router.get('/:id', (req,res) => {
    Request.findById(req.params.id).populate("user received.user").exec(function(err,request) {
         res.render('individual_request',{
         data:data.data,
         request: request
       });
    });
});

router.post('/',
function(req,res,next){
    const data = JSON.parse(JSON.stringify(req.body));

    const user = req.user.id;
    const type = req.body.type;
    const items = JSON.parse(req.body.data);

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        console.log(errors);
    }
    else {
      let newRequest = new Request({
        user: user,
        type: type,
        items: items
      });

        newRequest.save(function(err){
          if(err){
            console.log(err.message);
            return;
          } else {
              req.flash('success','Request received');
              res.redirect('/');
          }
        });
    }
});



module.exports = router;

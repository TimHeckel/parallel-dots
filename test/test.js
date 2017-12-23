const assert = require('assert');
const _ = require("lodash");
const parallelDots = require("../index.js");

const _key = process.env.PARALLEL_DOTS_API_KEY;
const _params = {
  text: "This is a banal, basic test string for analysis."
  , text_1: "This is the first of two strings for similarity comparison."
  , text_2: "This is the second of two strings for similarity comparison."
  , lang_code: "en"
}

const pd = new parallelDots({ 
  key: _key
  , version: "v2" //optional (defaults to v2)
});

//example call:
// pd.call({
//     path: "sentiment" //what do you want to parse?
//   , text: "Some simple sentence to parse."
//   , cb: (err, res) => {
//     console.log("res is ", res); //res.statusCode, res.body
//   }
// })

describe('Parallel Dots API', () => {
  const _eps = _.keys(pd.endpoints);
  _.each(_eps, (e) => {
    const _opts = {
       path: e
    };
    _.each(pd.endpoints[e].requires, (r) => {
      _opts[r] = _params[r];
    });
    describe("#" + pd.endpoints[e].description, function () {
      it("should complete with a status of 200", function(done) {
        pd.call(_opts, (err, res) => {
          if (err) {
            done(err);
          } else {
            if (res.statusCode === 200) {
              console.log("Result Success, body is:", JSON.stringify(res.body));
              done(null, res);
            } else {
              done(new Error("statusCode is " + res.statusCode + " | " + res));
            }
          }
        });
      });
    });
  });
});
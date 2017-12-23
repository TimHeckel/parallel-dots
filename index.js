const request = require("request");
const _ = require("lodash");

const api = function(opts) {

  const _self = this;
  const _version = opts.version || "v2";
  const _baseUrl = "https://apis.paralleldots.com";

  _self.endpoints = {
    sentiment: {
       description: "Sentiment Analysis"
      , requires: ["text"]
    },
    similarity: {
      description: "Similarity"
      , requires: ["text_1", "text_2"]
    },
    ner: {
      description: "Ner"
      , requires: ["text"]
    },
    keywords: {
        description: "Keywords"
      , requires: ["text"]
    },
    taxonomy: {
        description: "Taxonomy"
      , requires: ["text"]
    },
    emotion: {
        description: "Emotion"
      , requires: ["text"]
    },
    intent: {
        description: "Intent"
      , requires: ["text"]
    },
    multilang: {
        description: "Multi-Language"
      , requires: ["text", "lang_code"]
    },
    abuse: {
        description: "Abuse"
      , requires: ["text"]
    },
    sentiment_social: {
        description: "Sentiment Social"
      , requires: ["text"]
    },
    usage: {
        description: "Usage"
      , noVersion: true
      , requires: []
    }
  };

  function _validate(__opts) {
    const _errs = [];
    if (!opts.key) {
      _errs.push("You must provide an API key when instantiating the API wrapper.");
    }
    if (!__opts.path) {
      _errs.push(`You must provide an API path. (${_.keys(_self.endpoints).join(", ")})`);
    }
    if (__opts.path && __opts.key) {
      _.each(_self.endpoints[__opts.path].requires, (r) => {
        if (!__opts[r]) {
          _errs.push(`You must provide the ${r} parameter`)
        }
      });
    }
    return _errs;
  }; //_validate

  _self.call = function(__opts, cb) {
    const _errs = _validate(__opts);

    if (_errs.length > 0) {
      cb(new Error(_errs.join(", ")));
    } else {
      const _body = { api_key: opts.key };
      _.each(_self.endpoints[__opts.path].requires, (r) => { _body[r] = __opts[r]; });
      let _url = _baseUrl;
      if (!_self.endpoints[__opts.path].noVersion) {
        _url += "/" + _version;
      }
      _url = `${_url}/${__opts.path}`;

      console.log("Making call", _url, _body);

      const _params = { 
        url: _url
        , method: "post"
        , json: true
        , form: _body
        , headers: { "Accept-Language": "en-US,en;q=0.5" }
      };

      request.post(_params, (err, res) => {
        cb(err, { statusCode: res.statusCode, body: res.body });
      });
    }
  }

  return _self;

};

module.exports = api;
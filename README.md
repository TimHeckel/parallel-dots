# paralleldots
NodeJS wrapper for the paralleldots API (www.paralleldots.com)

All the text functionality is available through this API wrapper, including:

  - sentiment (`text`)
  - similarity (`text_1`, `text_2`)
  - ner (`text`)
  - keywords (`text`)
  - taxonomy (`text`)
  - emotion (`text`)
  - intent (`text`)
  - multilang (`text`, `lang_code`)
  - abuse (`text`)
  - sentiment_social (`text`)
  
Your usage is also available via:
  - usage (no required params)

Calling the API:

    const parallelDots = require("@timheckel/parallel-dots");

    const pd = new parallelDots({ 
      key: YOUR_PARALLEL_DOTS_API_KEY 
    });

    pd.call({
      path: "sentiment"
      , text: "Some text to analyze"
      }, (err, res) => {
        console.log("Res ", err, res);
      }
    )

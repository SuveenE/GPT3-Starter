import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const basePromptPrefix =
// `
// Explain CRISPR to a 
// `
// ;

// const basePromptSuffix =
// `
//   year old who has never heard of it before in 100 words
// `

// const basePromptEnd =
// `
// heard of it before in 100 words
// `

const generateAction = async (req, res) => {
  // Run first prompt
  
  const prompt =
`
Explain CRISPR to a ${req.body.userInput} year old who has ${req.body.heardBefore}heard of it before in 100 words. Take something from ${req.body.userField} for an example
`
;
console.log(`API: ${prompt}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${prompt}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
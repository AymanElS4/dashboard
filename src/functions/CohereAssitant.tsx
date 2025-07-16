import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({});

export default function CohereAssitant () {
(async () => {
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    messages: [
      {
        role: 'user',
        content: 'hello world!',
      },
    ],
  });


  console.log(response);
})();
return }

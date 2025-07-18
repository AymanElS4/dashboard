import { CohereClientV2 } from 'cohere-ai';
import type { DataFetcherOutput } from '../functions/DataFetcher';

const cohere = new CohereClientV2({token:import.meta.env.VITE_COHERE_API_KEY});



export default function CohereAssitant (DataFetcherOutput: DataFetcherOutput, ciudad: String  ) {
  const datastring = JSON.stringify(DataFetcherOutput.data);

  (async () => {
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    messages: [
      {
        role: 'user',
        content: datastring+' \n Dame un resumen de los datos obtenidos y dame recomendaciones sobre el clima de esta localidadad y el nombre de la Localidad. Responde en español y no uses emojis.',
      },
    ],
  });


  console.log(response);
})();
return }

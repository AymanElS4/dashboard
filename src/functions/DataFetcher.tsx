import { useState } from 'react';
import { useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import  SelectorUI  from '../componentes/SelectorUI';


interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const DicCiudad = {

    "Guayaquil": { lat: -2.1962, lon: -79.8862 },
    "Quito": { lat: -0.2298, lon: -78.525 },
    "Manta": { lat: -0.9494, lon: -80.7314 },
    "Cuenca": { lat: -2.9005, lon: -79.0045 }
}
export default function DataFetcher() : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const lat =DicCiudad[ciudad].lat
        const lon =DicCiudad
        
        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`

        const fetchData = async () => {

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json();
                setData(result);

            } catch (err: any) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}
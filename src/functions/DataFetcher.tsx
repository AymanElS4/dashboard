import { useState } from 'react';
import { useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';



export interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;

}

const DicCiudad = {

    "guayaquil": { lat: -2.1962, lon: -79.8862 },
    "quito": { lat: -0.2298, lon: -78.525 },
    "manta": { lat: -0.9494, lon: -80.7314 },
    "cuenca": { lat: -2.9005, lon: -79.0045 }
}
export default function DataFetcher(ciudad: string) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        
        let tiempo: string =localStorage.getItem(`${ciudad}_timestamp`)??"0";
        let tiempoCache = parseInt(tiempo);
        if(Date.now() - tiempoCache < 3600000){
            setData(JSON.parse(localStorage.getItem(ciudad)!));
            setLoading(false); 
            setError(null); 
        } 
        
        if (!ciudad || !DicCiudad[ciudad as keyof typeof DicCiudad]) {
            
            setLoading(true);//Caso por defecto
            return;
        }
        const lat = DicCiudad[ciudad as keyof typeof DicCiudad].lat;
        const lon = DicCiudad[ciudad as keyof typeof DicCiudad].lon;
        
        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`

        const fetchData = async () => {

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json();

                const datastring = JSON.stringify(result);
                localStorage.setItem(ciudad, datastring);
                localStorage.setItem(`${ciudad}_timestamp`, Date.now().toString());
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

    }, [ciudad]); // El array asegura que cuando cambia el prop, se renderize nuevamente 

    return { data, loading, error };

}
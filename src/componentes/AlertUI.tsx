import Alert from '@mui/material/Alert';

interface AlertConfig {
    description: string;
}

export default function AlertUI( config:AlertConfig ) {
    return (
        <Alert variant="standard" severity="success"> {config.description} </Alert>
    )
}
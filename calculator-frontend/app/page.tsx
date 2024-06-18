"use client"
import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function Home() {
    const [expression, setExpression] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/calculate/', { expression });
            setResult(response.data.result);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.error || 'Error desconocido');
            } else {
                setError('Error desconocido');
            }
            setResult(null);
        }
    };

    return (
        <div>
            <h1>Calculadora</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="Ingrese expresión"
                />
                <button type="submit">Calcular</button>
            </form>
            {result !== null && <p>Resultado: {result}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

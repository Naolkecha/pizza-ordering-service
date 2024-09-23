import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('/api/pizzas');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setPizzas(data);  // Only set data if it's an array
        } else {
          setError('Invalid data format');
        }
      } catch (err) {
        setError('Failed to fetch pizzas');
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchPizzas();
  }, []);

  // Render loading state
  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Render error state
  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Pizzas
      </Typography>
      <Grid container spacing={2}>
        {pizzas.map((pizza) => (
          <Grid item key={pizza.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{pizza.name}</Typography>
                <Typography>{pizza.toppings}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Box,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import { Github, Linkedin } from 'lucide-react'; // Import icons
import './Dogs.css'; // Create this CSS file for styling

const Input = styled('input')({
  display: 'none',
});

function Project1() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [breedsOpen, setBreedsOpen] = useState(false);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    // Cargar las razas desde el archivo class_names.txt
    const fetchBreeds = async () => {
      try {
        const response = await fetch('/class_names.txt');
        const text = await response.text();
        const breedsArray = text.split('\n').filter(Boolean); // Convertir texto en array
        setBreeds(breedsArray);
      } catch (error) {
        console.error('Error loading breeds:', error);
      }
    };

    fetchBreeds();
  }, []);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
    setPredictionResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPredictionResult(response.data);
    } catch (error) {
      console.error('There was an error making the request', error);
      alert('Error making prediction.');
    } finally {
      setLoading(false);
    }
  };

  const toggleBreedsList = () => {
    setBreedsOpen(!breedsOpen);
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: '50px' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        AI Dog Breed Classifier
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
        {/* Image Upload and Preview Section */}
        <Grid item xs={12} md={6}>
          <Box textAlign="center">
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleFileInput}
              />
              <Button variant="contained" component="span" startIcon={<ImageIcon />}>
                Upload Image
              </Button>
            </label>
            {previewUrl && (
              <Box mt={2}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                />
              </Box>
            )}
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Predicting...' : 'Predict'}
              </Button>
            </Box>
            {loading && <LinearProgress style={{ marginTop: '20px' }} />}
            {/* Possible breeds button */}
            <Box mt={2}>
              <Button
                variant="outlined"
                onClick={toggleBreedsList}
              >
                {breedsOpen ? 'Hide Breeds' : 'Show Possible Breeds'}
              </Button>
              <Collapse in={breedsOpen}>
                <Box
                  mt={2}
                  sx={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                  }}
                >
                  <List dense>
                    {breeds.map((breed, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={breed} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Grid>
        {/* Prediction Result Section */}
        <Grid item xs={12} md={6}>
          {predictionResult && (
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Prediction Result
                </Typography>
                <Typography variant="body1">
                  <strong>Predicted Breed:</strong> {predictionResult.predicted_breed}
                </Typography>
                <Typography variant="body1">
                  <strong>Confidence:</strong> {(predictionResult.confidence * 100).toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      <footer>
        <div className="social-links">
          <a
            href="https://github.com/Mateorovere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/mateo-rovere/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>
        </div>
        <p>Created by Mateo Rovere</p>
      </footer>
    </Container>
  );
}

export default Project1;

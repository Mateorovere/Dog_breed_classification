# Dog Breed Recognition

This project is a web application that classifies dog breeds from images uploaded by users. The application features a React frontend, a Flask backend, and uses a deep learning model to predict the dog breed. It is containerized using Docker and managed with Docker Compose for easy deployment.

## Features

- **Image Upload**: Allows users to upload an image of a dog for classification.
- **Breed Prediction**: Uses a deep learning model to predict the breed of the dog in the uploaded image.
- **Responsive UI**: The frontend is built with React, providing an interactive and user-friendly experience.
- **Containerization**: The entire application is containerized using Docker and orchestrated with Docker Compose, simplifying deployment and scaling.

## Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **Machine Learning**: TensorFlow, Keras (ConvNeXt architecture)
- **Containerization**: Docker, Docker Compose
- **Model**: Pre-trained ConvNeXt with custom fine-tuning for dog breed classification

## Prerequisites

- **Docker**: Make sure Docker and Docker Compose are installed on your machine. You can download Docker from [here](https://www.docker.com/get-started).

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/Mateorovere/Dog_breed_classification.git
    cd Dog_breed_classification
    ```

2. Build and run the containers using Docker Compose:
    ```bash
    docker-compose up --build
    ```

3. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Usage

1. Access the application via your browser.
2. Upload an image of a dog.
3. The application will return the predicted dog breed based on the image.

## Model Training

The model was trained using the Stanford Dogs Dataset, employing a ConvNeXt-based architecture with transfer learning from ImageNet weights. The training process used data augmentation and early stopping to achieve optimal performance.

To retrain the model, you can modify `model_training.py` and execute it locally with your own dataset or fine-tune it as needed.

### Model Details:
- **Architecture**: ConvNeXtSmall, fine-tuned with a custom dense layer and dropout for regularization.
- **Optimizer**: AdamW with a learning rate of 1e-5.
- **Loss Function**: Categorical Crossentropy.
- **Metrics**: Accuracy.
- **Callbacks**: Early stopping, ReduceLROnPlateau, ModelCheckpoint.

The final model is saved as `best_model.keras`, and class names are saved in `class_names.txt`.

## Acknowledgements

- Stanford Dogs Dataset: [Kaggle Link](https://www.kaggle.com/datasets/jessicali9530/stanford-dogs-dataset).

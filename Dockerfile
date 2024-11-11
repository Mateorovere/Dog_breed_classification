FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY app.py .
COPY best_model.keras .
COPY class_names.txt .

# Create uploads directory
RUN mkdir uploads

# Expose port
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]

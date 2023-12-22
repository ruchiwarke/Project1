# Use a lightweight base image
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the application files into the container
COPY index.html .
COPY calculator.html .
COPY styles.css css/
COPY script.js js/

# Expose port 80 for web traffic
EXPOSE 80

# Command to start the web server
CMD ["nginx", "-g", "daemon off;"]

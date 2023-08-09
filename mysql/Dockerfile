# Use the official MySQL image as the base image
FROM mysql:latest

# Set the root password for MySQL (change this to your desired password)
ENV MYSQL_ROOT_PASSWORD=mysqlpassword

# Copy the init.sql script to the Docker container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306

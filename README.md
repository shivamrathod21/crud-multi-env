# CRUD Application Deployment

This repository contains the deployment configuration for the CRUD application.

## Prerequisites

1. AWS Account
2. Docker Hub Account
3. GitHub Account
4. EC2 Instance
5. Docker installed on EC2

## Setup Instructions

### 1. GitHub Secrets

Add the following secrets to your GitHub repository:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password
- `EC2_HOST`: Your EC2 instance public IP
- `EC2_USERNAME`: EC2 instance username (usually 'ec2-user' or 'ubuntu')
- `SSH_PRIVATE_KEY`: Your EC2 instance SSH private key

### 2. EC2 Setup

1. Launch an EC2 instance (t2.micro or larger)
2. Install Docker:
```bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
```

### 3. Security Group Configuration

Ensure your EC2 security group allows:
- SSH (Port 22)
- HTTP (Port 80)
- Application Port (3000)

### 4. Deployment

The application will automatically deploy when you push to the main branch.

## Local Testing

To test locally:

```bash
docker-compose up --build
```

Access the application at http://localhost:3000

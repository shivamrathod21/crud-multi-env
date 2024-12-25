# DevOps CRUD Application Deployment

A demonstration of DevOps practices using a simple CRUD application with automated deployment pipeline.

## 🚀 Architecture Overview

- **Frontend**: Simple HTML/JS interface
- **Backend**: Node.js/Express API
- **Database**: AWS RDS (PostgreSQL)
- **Deployment**: AWS EC2
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## 🛠️ Prerequisites

1. AWS Account with:
   - EC2 instance running
   - RDS PostgreSQL database
   - IAM user with appropriate permissions

2. GitHub Account with:
   - Fork of this repository
   - Following secrets configured:
     ```
     AWS_ACCESS_KEY_ID
     AWS_SECRET_ACCESS_KEY
     DOCKER_USERNAME
     DOCKER_PASSWORD
     EC2_HOST
     EC2_USERNAME
     SSH_PRIVATE_KEY
     DATABASE_URL
     ```

## 🏗️ Infrastructure Setup

### 1. AWS RDS Setup
```bash
# Note your database endpoint, username, and password
DATABASE_URL=postgres://username:password@your-rds-endpoint:5432/postgres
```

### 2. AWS EC2 Setup
```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096

# Configure security group
- Allow inbound port 22 (SSH)
- Allow inbound port 3000 (Application)
```

### 3. GitHub Actions Setup
1. Fork this repository
2. Add required secrets
3. Enable GitHub Actions

## 🚀 Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/crud-deployment.git
cd crud-deployment

# Install dependencies
npm install

# Create .env file
echo "DATABASE_URL=your_database_url" > .env

# Run locally
npm start
```

## 📦 Docker Commands

```bash
# Build image
docker build -t crud-app .

# Run container
docker run -p 3000:3000 -e DATABASE_URL=your_database_url crud-app
```

## 🔐 Security Configuration

1. RDS Security Group:
   - Allow port 5432 from EC2 security group
   - Configure proper inbound rules

2. EC2 Security Group:
   - Allow SSH (22)
   - Allow application port (3000)

3. GitHub Secrets:
   - All sensitive data stored in GitHub Secrets
   - No hardcoded credentials

## 📝 Database Schema

```sql
Table: Items
- id: Serial Primary Key
- name: String
- description: Text
- createdAt: Timestamp
- updatedAt: Timestamp
```

## 🔄 CI/CD Pipeline

1. Push to main branch triggers workflow
2. GitHub Actions:
   - Builds Docker image
   - Pushes to Docker Hub
   - Deploys to EC2

## 🛟 Troubleshooting

1. Database Connection Issues:
   - Verify RDS security group rules
   - Check DATABASE_URL format
   - Ensure EC2 has access to RDS

2. Deployment Issues:
   - Check GitHub Actions logs
   - Verify EC2 instance is running
   - Confirm Docker Hub credentials

## 📚 Additional Resources

- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

## 📄 License

MIT License - feel free to use this project for learning and development!

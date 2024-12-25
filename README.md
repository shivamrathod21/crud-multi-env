# DevOps CRUD Application Deployment

A demonstration of DevOps practices using a simple CRUD application with automated deployment pipeline.

## 🚀 Architecture Overview

- **Frontend**: Simple HTML/JS interface
- **Backend**: Node.js/Express API
- **Database**: AWS RDS (PostgreSQL)
- **Deployment**: AWS EC2
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
    ```
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
## 📋 Complete Command Reference

### AWS EC2 Commands
```bash
# SSH into EC2
ssh -i "your-key.pem" ubuntu@your-ec2-ip

# Check Docker status
sudo systemctl status docker

# View running containers
docker ps

# View container logs
docker logs crud-app

# Restart container
docker restart crud-app
```

### Database Access Commands
```bash
# Install PostgreSQL client on EC2
sudo apt update
sudo apt install postgresql-client -y

# Connect to RDS database
psql "postgres://crudadmin:your_password@your-rds-endpoint:5432/postgres"

# Inside PostgreSQL prompt:
\dt                        # List all tables
SELECT * FROM "Items";     # View all items
\q                        # Exit PostgreSQL
```

### Docker Commands
```bash
# Build image
docker build -t crud-app .

# Run container
docker run -d --name crud-app \
  -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  crud-app

# Stop container
docker stop crud-app

# Remove container
docker rm crud-app

# View logs
docker logs -f crud-app
```

### GitHub Actions Commands
```bash
# Trigger workflow manually
gh workflow run deploy.yml

# View workflow status
gh run list

# View workflow logs
gh run view [run-id]
```

### Local Development Commands
```bash
# Install dependencies
npm install

# Run locally
npm start

# Run with nodemon
npm run dev
```

## 🏗️ Infrastructure Setup

### 1. AWS RDS Setup
```bash
# Format for DATABASE_URL
postgres://username:password@your-rds-endpoint:5432/postgres

# Security Group Rules:
- Type: PostgreSQL
- Port: 5432
- Source: EC2 Security Group ID
```

### 2. AWS EC2 Setup
```bash
# Security Group Rules:
- Allow SSH (22)
- Allow Application (3000)
```

### 3. GitHub Actions Setup
1. Fork repository
2. Add secrets
3. Enable Actions

## 🔐 Security Configuration

1. RDS Security Group:
   ```
   Inbound Rules:
   - PostgreSQL (5432) from EC2 Security Group
   ```

2. EC2 Security Group:
   ```
   Inbound Rules:
   - SSH (22) from Your IP
   - Custom TCP (3000) from 0.0.0.0/0
   ```

## 📝 Database Schema

```sql
Table: Items
- id: Serial Primary Key
- name: String
- description: Text
- createdAt: Timestamp
- updatedAt: Timestamp
```

## 🛟 Troubleshooting

### Database Connection Issues
```bash
# Check RDS connectivity from EC2
nc -zv your-rds-endpoint 5432

# Check database logs
docker logs crud-app | grep database

# Test database connection
psql "postgres://crudadmin:password@endpoint:5432/postgres" -c "\dt"
```

### Container Issues
```bash
# Check container status
docker ps -a

# View container logs
docker logs crud-app

# Restart container
docker restart crud-app
```

### GitHub Actions Issues
```bash
# Check workflow logs in GitHub UI
Actions → Workflows → Latest Run

# Check EC2 deployment logs
docker logs crud-app
```

## 📚 Additional Resources

- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!



- feel free to use this project for learning and development!
Have A goood dayyy!!

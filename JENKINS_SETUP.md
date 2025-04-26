# Jenkins CI/CD Setup Guide for Windows

This guide will help you set up Jenkins for the DevTinder project on a Windows environment.

## Prerequisites

1. **Java Development Kit (JDK)**
   - Download and install JDK 11 or later from [Oracle's website](https://www.oracle.com/java/technologies/downloads/)
   - Set JAVA_HOME environment variable

2. **Node.js**
   - Install Node.js 18.x from [Node.js website](https://nodejs.org/)
   - Ensure npm is available in PATH

3. **Docker Desktop for Windows**
   - Install Docker Desktop from [Docker's website](https://www.docker.com/products/docker-desktop)
   - Enable WSL 2 backend (recommended)
   - Start Docker Desktop

4. **Git**
   - Install Git for Windows from [Git's website](https://git-scm.com/download/win)

## Jenkins Installation

1. **Download and Install Jenkins**
   - Download the Windows installer from [Jenkins website](https://www.jenkins.io/download/)
   - Run the installer as administrator
   - Follow the installation wizard
   - Note down the initial admin password

2. **Initial Setup**
   - Open Jenkins in your browser (default: http://localhost:8080)
   - Enter the initial admin password
   - Install suggested plugins
   - Create an admin user

## Configuration

1. **Install Required Plugins**
   - Go to Manage Jenkins > Manage Plugins
   - Install the following plugins:
     - Docker Pipeline
     - NodeJS
     - Git
     - Pipeline
     - Credentials
     - SSH Agent
     - Docker Build Step
     - Windows Slaves

2. **Configure Node.js**
   - Go to Manage Jenkins > Global Tool Configuration
   - Add Node.js installation
   - Name: nodejs
   - Install automatically
   - Version: 18.x

3. **Configure Docker**
   - Ensure Docker Desktop is running
   - Go to Manage Jenkins > Configure System
   - Add Docker installation
   - Name: docker
   - Docker Host URI: npipe:////./pipe/docker_engine

4. **Configure Credentials**
   - Go to Manage Jenkins > Manage Credentials
   - Add Docker registry credentials
   - Kind: Username with password
   - ID: docker-credentials
   - Username: your-docker-username
   - Password: your-docker-password

## Pipeline Setup

1. **Create New Pipeline**
   - Click "New Item"
   - Enter a name (e.g., "DevTinder")
   - Select "Pipeline"
   - Click OK

2. **Configure Pipeline**
   - Select "Pipeline script from SCM"
   - SCM: Git
   - Repository URL: your-repository-url
   - Credentials: your-git-credentials
   - Branch Specifier: */main
   - Script Path: Jenkinsfile

3. **Environment Variables**
   - Add the following environment variables in Jenkins:
     - DOCKER_USERNAME
     - DOCKER_PASSWORD
     - DOCKER_REGISTRY

## Running the Pipeline

1. **Manual Trigger**
   - Click "Build Now" to start the pipeline

2. **Automatic Trigger**
   - Configure webhooks in your Git repository
   - Add Jenkins webhook URL
   - Set up automatic builds on push

## Troubleshooting

1. **Docker Issues**
   - Ensure Docker Desktop is running
   - Check Docker service status
   - Verify Docker daemon is accessible

2. **Node.js Issues**
   - Verify Node.js installation
   - Check npm version
   - Ensure PATH includes Node.js

3. **Build Issues**
   - Check console output
   - Verify environment variables
   - Ensure all required files are present

## Security Considerations

1. **Credentials**
   - Use Jenkins credentials store
   - Never commit sensitive data
   - Rotate credentials regularly

2. **Access Control**
   - Configure appropriate permissions
   - Use role-based access control
   - Monitor build logs

## Maintenance

1. **Regular Updates**
   - Keep Jenkins updated
   - Update plugins regularly
   - Monitor security advisories

2. **Backup**
   - Regular backup of Jenkins home directory
   - Backup job configurations
   - Document custom configurations 
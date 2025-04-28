# Simplified Jenkins Setup for DevTinder

This guide will help you set up a basic CI/CD pipeline for the DevTinder project using Jenkins on Windows.

## Prerequisites

1. **Java Development Kit (JDK)**
   - Download and install JDK 11 or later
   - Set JAVA_HOME environment variable

2. **Node.js**
   - Install Node.js 18.x
   - Ensure npm is available in PATH

3. **Docker Desktop for Windows**
   - Install Docker Desktop
   - Start Docker Desktop

4. **Git**
   - Install Git for Windows

## Quick Jenkins Setup

1. **Install Jenkins**
   - Download Jenkins Windows installer from https://www.jenkins.io/download/
   - Run installer as administrator
   - Open http://localhost:8080
   - Get initial admin password from:
     - `C:\Program Files\Jenkins\secrets\initialAdminPassword`
   - Install suggested plugins

2. **Configure Jenkins**
   - Go to Manage Jenkins > Global Tool Configuration
   - Add Node.js installation:
     - Name: nodejs
     - Version: 18.x
   - Add Docker installation:
     - Name: docker
     - Docker Host URI: npipe:////./pipe/docker_engine

3. **Create Pipeline**
   - Click "New Item"
   - Enter name: "DevTinder"
   - Select "Pipeline"
   - In Pipeline section:
     - Select "Pipeline script from SCM"
     - SCM: Git
     - Repository URL: https://github.com/ayushchahal44/DevTinder
     - Branch Specifier: */main
     - Script Path: Jenkinsfile

4. **Run Pipeline**
   - Click "Build Now"
   - Monitor build progress in console output

## Pipeline Stages

The pipeline will:
1. Checkout code from GitHub
2. Install dependencies
3. Build the project
4. Run tests
5. Build Docker image
6. Deploy using Docker Compose

## Troubleshooting

1. **Docker Issues**
   - Ensure Docker Desktop is running
   - Check Docker service status

2. **Node.js Issues**
   - Verify Node.js installation
   - Check npm version

3. **Build Issues**
   - Check console output
   - Verify environment variables

## Next Steps

1. Add your MongoDB connection string to environment variables
2. Configure deployment environment
3. Set up webhooks for automatic builds 
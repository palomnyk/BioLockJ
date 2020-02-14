# Docker                   
                   
Docker is a powerful tool in creating reproducible results.                   
                   
| Property| Description |
| :--- | :--- |
| *docker.imgVersion* | _string_ <br>indicate specific version of Docker images<br>*default:*  *null* |
| *docker.saveContainerOnExit* | _boolean_ <br>if ture, docker run command will NOT include the --rm flag<br>*default:*  *null* |
| *docker.user* | _string_ <br>name of the Docker Hub user for getting docker containers<br>*default:*  *null* |
                   
                   
All BioLockJ modules are intended to be compatable with a docker environment.  Each module has a default docker image; an environment where the module has been tested and that can spun up again for future use.  This can be altered by the user.                   

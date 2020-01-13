# suggested build command:
# name=biolockj_controller
# cd ${BLJ}
# docker build --build-arg DOCKER_HUB_USER=biolockjdevteam -t biolockjdevteam/${name} . -f resources/docker/${name}.Dockerfile 

ARG DOCKER_HUB_USER=biolockj
FROM ${DOCKER_HUB_USER}/blj_basic
ARG DEBIAN_FRONTEND=noninteractive

#1.) Install Ubuntu Software 
RUN apt-get update && apt-get install -y python2.7-dev python-pip python-tk 
	
#2.) Cleanup
RUN	rm -rf /tmp/* && rm -rf /var/log/* 

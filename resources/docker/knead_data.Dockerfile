# suggested build command:
# name=knead_data
# cd ${BLJ}
# docker build --build-arg DOCKER_HUB_USER=biolockjdevteam -t biolockjdevteam/${name} . -f resources/docker/${name}.Dockerfile 

ARG DOCKER_HUB_USER=biolockj
FROM ${DOCKER_HUB_USER}/knead_data_dbfree

#1.) Install kneaddata human DNA contaminant DB
RUN kneaddata_database --download human_genome bowtie2 "${BLJ_DEFAULT_DB}"

#2.) Cleanup
RUN	rm -rf /usr/share/*

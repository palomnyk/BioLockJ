# suggested build command:
# name=build_with_ant
# cd ${BLJ}
# docker build -t biolockjdevteam/${name}:1.9.14 . -f resources/docker/${name}.Dockerfile 

FROM java:8

ENV ANT_DIST=apache-ant-1.9.14
RUN wget https://www.apache.org/dist/ant/binaries/$ANT_DIST-bin.tar.bz2
RUN tar xfj $ANT_DIST-bin.tar.bz2

FROM openjdk:21
LABEL container="hmsguard"
EXPOSE 4000
ADD target/Guard-0.0.1-SNAPSHOT.jar Guard.jar
ENTRYPOINT ["java", "-jar", "Guard.jar"]
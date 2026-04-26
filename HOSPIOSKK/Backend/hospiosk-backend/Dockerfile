FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# sirf backend project copy karo
COPY HOSPIOSKK/Backend/hospiosk-backend /app

RUN mvn clean package -DskipTests

# -------- runtime --------
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
# ===== Build stage =====
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

# ===== Runtime stage =====
FROM eclipse-temurin:21-jre
WORKDIR /app
# Copy the fat jar (adjust name if different)
COPY --from=builder /app/target/*SNAPSHOT.jar app.jar

# Listen on 8080
EXPOSE 8080

# Allow overriding with env at runtime
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]


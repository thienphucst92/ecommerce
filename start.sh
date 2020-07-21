echo "Wait for services to start"
docker-compose build
docker-compose up -d
docker-compose up -d 
docker-compose up -d
echo "Navigate to http://localhost:6776/graphql to play with the GraphQL Playground"
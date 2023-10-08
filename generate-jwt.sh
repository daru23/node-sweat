#!/bin/bash

# Path to the Node.js executable
NODE="node"

# Path to the JavaScript script
SCRIPT="generate-jwt.js"

# Access the first argument using $1 (USER_ID) passing a userId as an argument to get something to validate in the jwt
USER_ID="$1"

# Call the generateToken method and capture the output
TOKEN=$($NODE $SCRIPT $USER_ID)

# Output the JWT token
echo "JWT Token: $TOKEN"

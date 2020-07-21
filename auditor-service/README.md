# auditor-service

- [Overview](#overview)
- [API](#api)

- [Overview](#overview)
- [API](#api)

## Overview

- Component name: `auditor-service`
- Environment:
  - Node.js 10.7
- What does this component do?:
  - Step 1. Receice new audit request
  - Step 2. Do some validations
  - Step 4. Save to database (Audit Schema)
- Environment variables:
  - `PORT`: Container Port
  - `HOSTNAME`: Container's hostname
  - `DB_CONNECTION_STRING`: MongoDB connection string
  

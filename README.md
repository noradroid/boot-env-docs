# Spring Boot Environment Variables Docs Generator

Identify environment variables in a Spring Boot application.yaml properties file and generate a Markdown template documentation for them.

### Run

Replace the script for "start" in `package.json`.
#### Get environment variables from yaml file

```
nodemon index.ts -m parseproperty -f application.yaml -j output.json -m output.md
```

- read from application.yaml file
- store environment variables in output.json
- produce markdown file output.md based on output.json

#### Get environment variables from properties file

```
nodemon index.ts -m parseproperty -f application.properties -j output.json -m output.md
```

- same as yaml version

#### Produce markdown file from edited output.json

```
nodemon index.ts -m parsejson -f output.json -m output.md
```

- produce markdown file output.md based on output.json
- provide ability to add more information to each variable (description, type) to print in documentation


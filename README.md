# Spring Boot Environment Variables Docs Generator

> Extract environment variables from Spring Boot properties files and generate Markdown documentation.

## Table of Contents

- [What are Spring Boot environment variables?](#what-are-spring-boot-environment-variables)
- [Defining valid environment variables syntax](#defining-valid-environment-variables-syntax)
    - [Valid](#valid)
    - [Invalid](#invalid)
- [Installation](#installation)
- [Usage](#usage)
  - [Get environment variables from yaml file and generate markdown file](#get-environment-variables-from-yaml-file-and-generate-markdown-file)
  - [Get environment variables from properties file](#get-environment-variables-from-properties-file)
  - [Generate markdown file from edited output.json](#generate-markdown-file-from-edited-outputjson)
  - [Get environment variables from yaml file and update json file](#get-environment-variables-from-yaml-file-and-update-json-file)
- [Test](#test)
- [Enhancements](#enhancements)


## What are Spring Boot environment variables?

In Spring Boot, configuration can be **externalised** from Java code using `application.yaml` or `application.properties` files found in `src/main/resources/`.

This is done using the `@Value` annotation (see [docs](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/value-annotations.html)).

E.g., if we have the following entry in `application.yaml`:

```yaml
microservice:
  endpoint: https://localhost:3000
```

We can access this configuration in code via the following:

```java
@Component
public class ExternalService {
  @Value("${microservice.endpoint}")
  private String microserviceEndpoint;
}
```

We can **further externalise** these configurations from the source code into **environment variables**.

To do so, we now use the `${}` syntax inside the configuration file. E.g.

application.yaml/application.yml
```yaml
microservice:
  endpoint: ${MICROSERVICE_ENDPOINT:https://localhost:3000}
```
application.properties
```properties
microservice.endpoint=${MICROSERVICE_ENDPOINT:https://localhost:3000}
```

Now we can define an environment variable called `MICROSERVICE_ENDPOINT` and its value will be used within the program. We can also indicate a default value using the colon (":") as in above, where the default value is `https://localhost:3000`. See [this Baeldung article](https://www.baeldung.com/spring-boot-properties-env-variables).

> To set an environment variable you can do (Windows) Open command prompt and enter `set MICROSERVICE_ENDPOINT=https://api.dev/api/v1/users` or (Unix) Open terminal and enter `MICROSERVICE_ENDPOINT=https://api.dev/api/v1/users`.

## Defining valid environment variables syntax

#### Valid

**Standard, with default value**
```yaml
property: ${PROPERTY:property A}
```

**With nested environment variable**
```yaml
property: ${PROPERTY:property ${NAME_OF_PROPERTY:A}}
```
> if PROPERTY was provided through environment variable, NAME_OF_PROPERTY value will never be used

**With default empty value**
```yaml
property: ${PROPERTY:}
```
> value of property will just default to an empty string ""

#### Invalid

**Space character after colon**
```yaml
property: ${PROPERTY: property A}
```
> syntatically invalid and yaml checker (if any) will complain as well

> however not invalid in properties file and default value will be treated as " property A" (note extra space before)

**Without default value**
```yaml
property: ${PROPERTY}
```
> syntatically it is valid, but jar runner will error out if no environment variable is provided, hence for this project's sake we force default value to be indicated

**No closing brace**
```yaml
property: ${PROPERTY:property A
```
> Spring Boot will not recognise PROPERTY as an environment variable, and will treat the entire string "${PROPERTY:property A" as the value for `property`

## Installation

```
npm i spring-env-docs -g
```

## Usage

### Get environment variables from yaml file and generate markdown file

```
sedocs pg application.yaml output.json output.md
```

- parse from application.yaml file
- store environment variables in output.json
- generate markdown file output.md based on output.json

### Get environment variables from properties file

```
sedocs pg application.properties output.json output.md
```

- same as yaml version

### Generate markdown file from edited output.json

```
sedocs g output.json output.md
```

- generate markdown file output.md based on output.json

You can add more information (description, type) in the json file before generating the markdown documentation.

### Get environment variables from yaml file and update json file

```
sedocs p application.yaml output.json -u
```

- parse from application.yaml file
- update environment variables in output.json if exists


## Test

Same as Run but do `npm run build` then replace the command with `node dist/index.js`.

Debug using nodemon command.

## Enhancements

- To not flag file configuration such as `${application.name}` with no default value as an error, and exclude such configs from environment variables.
- Update error messages
- Add version info

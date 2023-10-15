# Spring Boot Environment Variables Docs Generator

The aim of this project is to identify environment variables from a Spring Boot property file, and generate a Markdown template documentation for these environment variables.

### What are Spring Boot environment variables?

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

### Defining valid environment variables syntax

##### Valid

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

##### Invalid

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

### Run

Replace the script for "node" in `package.json` with one of the following. Then run `npm run build-run`.

#### Get environment variables from yaml file and generate markdown file

```
node dist/index.js pg application.yaml output.json output.md
```

- parse from application.yaml file
- store environment variables in output.json
- generate markdown file output.md based on output.json

#### Get environment variables from properties file

```
node dist/index.js pg application.properties output.json output.md
```

- same as yaml version

#### Generate markdown file from edited output.json

```
node dist/index.js g output.json output.md
```

- generate markdown file output.md based on output.json

This provide ability to add more information to each variable (description, type) to print in documentation

#### Get environment variables from yaml file and append to json file

```
node dist/index.js p application.yaml output.json output.md
```

- parse from application.yaml file
- append environment variables to output.json if existing
- generate markdown file output.md based on output.json

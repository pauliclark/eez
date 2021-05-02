# eez

eez is a wrapper for express, to handle errors and provide container access

## Starting the instance of the server

```javascript
import eez from 'eez'

eez({})
```

This will start a server, but will select an available port and will not have any defined routes or controllers.

### Parameters
#### env

The 'env' parameter sent to EEZ will be validated against the constants file for [environments]()./constants/environments).

The Environment is stored in a container, that exposes two methods 'getEnv', and 'createEnvironment'.

```javascript
import {getEnv} from 'eez'
console.log( getEnv() )
```
 
```javascript
import {eez, environments, getEnv, createEnvironment} from 'eez'
const newEnvironment = 'myNewEnv'
// create a custom environment
createEnvironment( newEnvironment )
console.log(environments.MYNEWENV) // outputs 'mynewenv'

// create an eez instance with the environment
eez({
  env: newEnvironment,
  afterListen: () => {
    console.log( getEnv() ) // outputs 'mynewenv'
  }
})
```

#### port

This is the port the http server is to listen on.

There are two identifiers that can be be applied instead.

- autoPort 
  Tells the server to find an available port to use
- noPort
  Tells the server not to listen at all

To find an available port
```javascript
import { eez, identifiers, environments } from 'eez'

eez({
  env: environments.DEV,
  port: identifiers.autoPort
})
```

To listen to a specific port
```javascript
import { eez, identifiers, environments } from 'eez'
const port = 8080
eez({
  env: environments.DEV,
  port
})
```

To prevent listening
```javascript
import { eez, identifiers, environments } from 'eez'
eez({
  env: environments.DEV,
  port: identifiers.noPort
})
```

#### logger

If using a custom logger e.g. [log-context](https://www.npmjs.com/package/@pauliclark/log-context), then it can be applied here.

```javascript
import { eez, environments } from 'eez'
import { contextLog } from '@pauliclark/log-context'
const eezLog = contextLog('eez')
const port = 8080
eez({
  env: environments.DEV,
  port,
  logger: eezLog
})
```

Defaults to a context log as defined in the example above.

### beforeApp

'beforeApp' is a triggered callback, fired before the express App is created

```javascript
import { eez, environments } from 'eez'
const port = 8080
eez({
  env: environments.DEV,
  port,
  beforeApp: () => {
    console.log( 'App about to be created' )
  }
})
```

### afterApp

'afterApp' is a triggered callback, fired just after the express App is created

```javascript
import { eez, environments, getApp } from 'eez'
const port = 8080
eez({
  env: environments.DEV,
  port,
  afterApp: () => {
    console.log( 'App has just been created created' )
  }
})
```

### afterListen

'afterListen' is a triggered callback, fired once the express App has begun listening to the port

```javascript
import { eez, environments, getApp } from 'eez'
const port = 8080
eez({
  env: environments.DEV,
  port,
  afterListen: () => {
    console.log( 'App has started listening' )
    // Start defining the controllers
  }
})
```

## Importable

### getApp

'getApp' returns the express App that EEZ created

```javascript
import { eez, environments, getApp } from 'eez'
const port = 8080
eez({
  env: environments.DEV,
  port,
  afterApp: () => {
    console.log( getApp() ) // outputs the instance of the Express App
  }
})
```

### getServer

'getServer' returns the http server that EEZ created

```javascript
import { eez, environments, getServer } from 'eez'
const port = 8080
eez({
  env: environments.DEV,
  port,
  afterApp: () => {
    console.log( getServer() ) // outputs the instance of the http server
  }
})
```


### environments

'environments' is the container for the pre-defined enviroments and any custom enviroments added.

The pre-defined values are: 

```javascript
{
  DEVELOPMENT: 'development',
  DEV: 'development',
  TEST: 'test',
  STAGING: 'staging',
  PRODUCTION: 'production',
  PROD: 'production'
}
```

You can see that DEV and PROD are aliases.

### getEnv

'getEnv' returns the environment that was detected

```javascript
import { eez, environments, getEnv } from 'eez'
const port = 8080
eez({
  env: environments.DEV,
  port,
  afterApp: () => {
    console.log( getEnv() ) // outputs 'development'
  }
})
```

This is particularly useful for building config schemas.

### createEnvironment

'createEnvironment' provides a method to create a custom environment

```javascript
import { eez, environments, getEnv, createEnvironment } from 'eez'
const port = 8080

createEnvironment('MyCustomEnv')
console.log(environments.MYCUSTOMENV)  // outputs 'mycustomenv'

eez({
  env: 'MyCustomEnv', // will get cased to match the environments convention
  port,
  afterApp: () => {
    console.log( getEnv() ) // outputs 'mycustomenv'
  }
})
```

Once the custom environment is defined, it is accessible using the 'environments' container, but UPPERCASE.

The value of the enviromnet is lowercase.

The contents of the environments container will then look like this:

```javascript
{
  DEVELOPMENT: 'development',
  DEV: 'development',
  TEST: 'test',
  STAGING: 'staging',
  PRODUCTION: 'production',
  PROD: 'production',
  MYCUSTOMENV: 'mycustomenv'
}
```

### getInfo

'getInfo' is a fetch method on the info container, which only used to record the port at the moment. If you are using 'autoPort', then you may wish to know which port is being used.


```javascript
import { eez, environments, identifiers, getInfo } from 'eez'

eez({
  env: environments.DEV,
  port: identifiers.autoPort,
  afterListen: () => {
    console.log( getInfo('port') ) // outputs the port found to be available and therefore used
  }
})
```

### routing

The 'routing' object allows for methods to be applied to a particlar path, used by your controllers.

The exposed methods are:

 - get
 - put
 - patch
 - fetch
 - post

 
```javascript
import { eez, environments, routing, response } from 'eez'
const port = 8080

eez({
  env: environments.DEV,
  port: port,
  afterListen: () => {

    routing.get('/',(req, res) => {
      response.success(res, {data:'somedata'})
    })

    routing.post('/:test',(req,res) => {
      console.log(req.params.test)
      response.success(res, req.params)
    })
    
  }
})
```
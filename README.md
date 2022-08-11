# html-factory

Version 3.0.0

## Install

``` console
npm install https://github.com/JamesRobertHugginsNgo/html-factory.git#3.0.0
```

## Types

### typeFunctionCall

```
typeFunctionCall: { name: string, arguments: any } | [string, ...any]
```

### typeMakeElementResult

```
typeMakeElementResult: { element: any, functionCalls: [typeFunctionCall] }
```

### typeRenderElementResult

```
typeRenderElementResult: { element: string, functionCalls: [typeFunctionCall] }
```

## Functions

### makeElement

```
makeElement: (name: string, attributes: null | object, children: any, functionCalls: [typeFunctionCall] = []) => typeMakeElementResult
```

### makeElementNs

```
makeElementNs: (namespaceURI: string, name: string, attributes: null | object, children: any, functionCalls: [typeFunctionCall] = []) => typeMakeElementResult
```

### makeFragment

```
makeFragment: (children: any, functionCalls: [typeFunctionCall] = []) => null | typeMakeElementResult
```

### makeFunctionCall

```
makeFunctionCall: (functionCall: typeFunctionCall) => any
```

### renderElement

```
renderElement: (name: string, attributes: null | object, children: any, functionCalls: [typeFunctionCall] = []) => typeRenderElementResult
```

### renderFragment

```
makeFragment: (children: any, functionCalls: [typeFunctionCall] = []) => null | typeRenderElementResult
```

### renderFunctionCall

```
renderFunctionCall: (functionCall: typeFunctionCall) => string
```

### renderStyleString

```
renderStyleString: (styles: object) => string
```

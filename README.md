# ember-holy-futuristic-template-namespacing-batman-codemod


A collection of codemods for ember-holy-futuristic-template-namespacing-batman-codemod.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-holy-futuristic-template-namespacing-batman-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-holy-futuristic-template-namespacing-batman-codemod
ember-holy-futuristic-template-namespacing-batman-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [ensure-template-only-has-backing-class](transforms/ensure-template-only-has-backing-class/README.md)
* [sigil-rename](transforms/sigil-rename/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`

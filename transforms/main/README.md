# main


## Usage

```
npx ember-holy-futuristic-template-namespacing-batman-sigil-change-codemod main path/of/files/ or/some**/*glob.js

# or

yarn global add ember-holy-futuristic-template-namespacing-batman-sigil-change-codemod
ember-holy-futuristic-template-namespacing-batman-sigil-change-codemod main path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [angle-bracket-invocation](#angle-bracket-invocation)
* [block-component](#block-component)
* [curly-component](#curly-component)
* [dynamic-component](#dynamic-component)
* [helper](#helper)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="angle-bracket-invocation">**angle-bracket-invocation**</a>

**Input** (<small>[angle-bracket-invocation.input.hbs](transforms/main/__testfixtures__/angle-bracket-invocation.input.hbs)</small>):
```hbs
<Foo::Bar></Foo::Bar>

```

**Output** (<small>[angle-bracket-invocation.output.hbs](transforms/main/__testfixtures__/angle-bracket-invocation.output.hbs)</small>):
```hbs
<Foo$Bar></Foo$Bar>

```
---
<a id="block-component">**block-component**</a>

**Input** (<small>[block-component.input.hbs](transforms/main/__testfixtures__/block-component.input.hbs)</small>):
```hbs
{{#some-addon::component-name-here as |whatever|}}
  Text with formatting
{{/some-addon::component-name-here}}

```

**Output** (<small>[block-component.output.hbs](transforms/main/__testfixtures__/block-component.output.hbs)</small>):
```hbs
{{#some-addon$component-name-here as |whatever|}}
  Text with formatting
{{/some-addon$component-name-here}}

```
---
<a id="curly-component">**curly-component**</a>

**Input** (<small>[curly-component.input.hbs](transforms/main/__testfixtures__/curly-component.input.hbs)</small>):
```hbs
{{addon-name::component-or-helper-name}}

```

**Output** (<small>[curly-component.output.hbs](transforms/main/__testfixtures__/curly-component.output.hbs)</small>):
```hbs
{{addon-name$component-or-helper-name}}

```
---
<a id="dynamic-component">**dynamic-component**</a>

**Input** (<small>[dynamic-component.input.hbs](transforms/main/__testfixtures__/dynamic-component.input.hbs)</small>):
```hbs
{{component runtimeString}}
{{component "some-addon::wahtever-component-name"}}

{{#component "some-addon::wahtever-component-name"}}
{{/component}}

```

**Output** (<small>[dynamic-component.output.hbs](transforms/main/__testfixtures__/dynamic-component.output.hbs)</small>):
```hbs
{{component runtimeString}}
{{component "some-addon$wahtever-component-name"}}

{{#component "some-addon$wahtever-component-name"}}
{{/component}}

```
---
<a id="helper">**helper**</a>

**Input** (<small>[helper.input.hbs](transforms/main/__testfixtures__/helper.input.hbs)</small>):
```hbs
{{#if (some-addon::helper-name)}}

{{/if}}

```

**Output** (<small>[helper.output.hbs](transforms/main/__testfixtures__/helper.output.hbs)</small>):
```hbs
{{#if (some-addon$helper-name)}}

{{/if}}

```
<!--FIXTURES_CONTENT_END-->
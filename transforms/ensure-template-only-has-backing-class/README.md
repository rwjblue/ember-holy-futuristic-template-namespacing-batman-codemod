# ensure-template-only-has-backing-class

When using `ember-holy-template-futuristic-template-namespacing-batman` you
would often have addons that provide their own components **without** an `app/`
folder re-export (because why would you!?!?).

This transform traverses either `addon/` (when ran within an addon's root
directory) or `app/` (when within an application) and generates a valid
component file for each template only component found. This is _basically_ the
same thing that `ember feature:enable template-only` would do internally, but
that functionality does not work for addons.

## Usage

```
npx ember-holy-futuristic-template-namespacing-batman-codemod ensure-template-only-has-backing-class
```

Usage of the Package

The packageA.json will be updated and get only the new dependeces from packageB.json

```sh
npm exec pkg-json-merge ./path/to/packageA.json ./path/to/packageB.json
```

How to use it globaly
Run this code inside the main folder

```sh
npm link
```

you are now ready to use it globally on your machine
throw this code

```sh
pkg-json-merge ./path/to/packageA.json ./path/to/packageB.json
```
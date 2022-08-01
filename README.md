# Welcome to word-kodyfire 👋
![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/nooqta/kodyfire#install-a-kody)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/nooqta/kodyfire/blob/main/LICENSE)
[![Twitter: anis\_marrouchi](https://img.shields.io/twitter/follow/anis\_marrouchi.svg?style=social)](https://twitter.com/anis\_marrouchi)

> Generate a MS Word document based on a template document using Kodyfire cli

### 🏠 [Homepage](https://github.com/nooqta/kodyfire)

## Requirements

word-kodyfire requires the kodyfire-cli to be installed

```sh
npm install -g kodyfire-cli
```
## Install

```sh
npm install word-kodyfire
```

## Usage

### Method 1: As a generator
In order to generate your artifacts. The syntax is `kody generate|g [kody] [concept]`. If you ommit `kody` and `concept` the assistant will prompt you to select them. As an example, run the following command from your terminal:
```sh
kody generate word concept
```
### Method 2: As a kody project
Refer to the kodyfire ["install a kody"](https://github.com/nooqta/kodyfire#install-a-kody) section.
Once your project is initialized and ready for kody, run the following command to generate your README.
```sh
kody run -s kody-word.json
```

## Run tests

```sh
TODO
```

## Author

👤 **Anis Marrouchi**

* Website: https://noqta.tn
* Twitter: [@anis\_marrouchi](https://twitter.com/anis\_marrouchi)
* GitHub: [@anis-marrouchi](https://github.com/anis-marrouchi)
* LinkedIn: [@marrouchi](https://linkedin.com/in/marrouchi)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/nooqta/word-kodyfire/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## Credits

word-kodyfire uses [ocxtemplater](https://github.com/open-xml-templating/docxtemplater) by [open-xml-templating](https://github.com/open-xml-templating)

## 📝 License

Copyright © 2022 [Anis Marrouchi](https://github.com/anis-marrouchi).

This project is [MIT](https://github.com/nooqta/kodyfire/blob/main/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-kodyfire](https://github.com/nooqta/readme-kodyfire)_

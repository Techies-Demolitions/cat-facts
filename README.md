# Cat Facts Repository
Welcome to the Cat Facts Repository! This project stores and manages random cat facts fetched from the Cat Facts API. It was created as a learning exercise to explore various features and technologies in Vue 3 and Pinia.

## Features
- Generate Cat Facts: Press the `Generate` button to fetch new cat facts from the Cat Facts API.
- Pop Stored Data: Press the `Pop` button to remove the most recently added cat fact from storage.
- Delete Specific Data: Press the `Delete` button to select and delete specific cat facts from your stored list.
- Change a Fact: Press the `Change Fact` button to select a cat fact you'd like to modify.
  
![pic3](https://github.com/user-attachments/assets/be3a7467-785a-4aac-ad79-ba59ad874336)

## Dependencies
This project utilizes the following dependencies:

### Core Dependencies:
- [nes.css](https://nostalgic-css.github.io/NES.css/): ^2.3.0 - A NES-style (8-bit) CSS framework for styling.
- [pinia](https://pinia.vuejs.org/): ^2.2.1 - A lightweight state management library for Vue 3.
- [vue](https://vuejs.org/): ^3.4.29 - The progressive JavaScript framework.
- [vue-router](https://router.vuejs.org/): ^4.3.3 - The official router for Vue.js 3.
  
### Development Dependencies:
- [@rushstack/eslint-patch](https://www.npmjs.com/package/@rushstack/eslint-patch): ^1.8.0
- [@tsconfig/node20](https://www.npmjs.com/package/@tsconfig/node20): ^20.1.4
- [@types/jsdom](https://www.npmjs.com/package/@types/jsdom): ^21.1.7
- [@types/node](https://www.npmjs.com/package/@types/node): ^20.14.5
- @vitejs/plugin-vue: ^5.0.5
- [@vue/eslint-config-prettier](https://www.npmjs.com/package/@vue/eslint-config-prettier): ^9.0.0
- [@vue/eslint-config-typescript](https://www.npmjs.com/package/@vue/eslint-config-typescript): ^13.0.0
- @vue/test-utils: ^2.4.6
- [@vue/tsconfig](https://www.npmjs.com/package/@vue/tsconfig): ^0.5.1
- [eslint](https://eslint.org/): ^8.57.0
- eslint-plugin-vue: ^9.23.0
- [jsdom](https://github.com/jsdom/jsdom): ^24.1.0
- [npm-run-all2](https://www.npmjs.com/package/npm-run-all2): ^6.2.0
- [prettier](https://prettier.io/): ^3.2.5
- [typescript](https://www.typescriptlang.org/): ~5.4.0
- [vite](https://vitejs.dev/): ^5.3.1
- [vite-plugin-vue-devtools](https://github.com/webfansplz/vite-plugin-vue-devtools): ^7.3.1
- [vitest](https://vitest.dev/): ^1.6.0
- [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc): ^2.0.21
  
### Installation
To get started with the project, follow these steps:

Clone the repository:

```bash
git clone https://github.com/username/cat-facts-repository.git
```

```bash
cd cat-facts-repository
```

Install the dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Open your browser and go to http://localhost:3000 to see the app in action.

## How to Use the App
- Generate New Cat Facts: Simply click the Generate button to fetch and display new cat facts.
- Pop Stored Data: Click the Pop button to remove the most recent cat fact from the list.
- Delete Specific Data: Select the fact(s) you wish to delete and press the Delete button.
- Change a Fact: Select a fact you'd like to modify and press the Change Fact button to update it.
  
## Important Guidelines
### Main Branch is Strictly Read-Only
The main branch is reserved for stable and finalized code only. Please adhere to the following rules:

- DO NOT push directly to the main branch.
- Always create and work on a separate branch.
- Submit a pull request to merge your changes into the main branch.
  
>**Note**: This is an open repository, so branch protection is not enforced. However, following the rules is strongly encouraged.

## Additional Notes
- More rules and guidelines will be added in the future.
- This project is an ongoing learning exercise, so contributions and suggestions are welcome.
## License
This project is open-source and available under the MIT License.

[demo]: https://genX.d1a.app
[node]: https://nodejs.org/en
[yarn]: https://yarnpkg.com
[pnpm]: https://pnpm.io
[rust]: https://www.rust-lang.org/tools/install
[cargo-watch]: https://github.com/watchexec/cargo-watch
[fly.io]: https://fly.io/
[vercel]: https://vercel.com
[issues]: https://github.com/doinel1a/gen-x/issues
[pulls]: https://github.com/doinel1a/gen-x/pulls
[license]: https://github.com/doinel1a/gen-x/blob/main/LICENSE
[app-archi]: https://github.com/doinel1a/gen-x/blob/main/assets/app-architecture.jpg
[commitlint]: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
[code-of-conduct]: https://github.com/doinel1a/gen-x/blob/main/CODE_OF_CONDUCT.md
[dapp-boilerplate]: https://github.com/doinel1a/mx-vite-react-ts

# gen X

The **goal** of this project is to **increase and accelerate the adoption of blockchain technology**.
<br />
Through this solution, developers will be able to automatically generate entire React.js dApps starting from the ABI of smart contracts; those, in order to be compatible with this solution, **must be** written in Rust, **using the MultiversX framework**.
<br />
The dApp will be configured with the libraries made available by the MultiversX team to facilitate the interactions with the blockchain and smart contracts.
<br />
<br />
A Proof of Concept has already been developed as my graduation project. This POC is very limited as it allows the generation of dApps from relatively simple smart contracts; for example, the POC version covers only the Rust and framework basic types, completely ignoring custom types defined via struct or enums.
Another limitation is that the generated components are not assembled; this means, that the programmer has to assemble the components based on how they interact with each other.
<br />
<br />
For the participation in the hackathon, the development of the project started again from 0 sever times, but the final version is represented by this repository. We started from scratch again, with the goal to fix some bugs present in the POC version and, most importantly, to allow proper implementation of the limitations described above.
<br />
<br />
Thus, the final version will be more versatile and will be compatible with a greater variance of smart contracts.

---

**[Demo][demo]** &nbsp;&nbsp;**|**&nbsp;&nbsp; **[Bug(label: bug)][issues]** &nbsp;&nbsp;**|**&nbsp;&nbsp; **[Feature(label: enhancement)][issues]**

---

## 🔖 Table of contents

- 📐 [Architecture](#-architecture "Go to 'Architecture' section")
- 🖥️ [Getting started](#️-getting-started "Go to 'Getting started' section")
  - [Prerequisites](#prerequisites "Go to 'Getting started / Prerequisites' section")
  - [Local development](#local-development "Go to 'Getting started / Local development' section")
- 🛠 [How to](#-how-to "Go to 'How to' section")
- ✅ [Todo](#-todo "Go to 'Todo' section")
- 👥 [Contribute](#-contribute "Go to 'Contribute' section")
- 📑 [License](#-license "Go to 'License' section")

---

## 📐 Architecture

![Solution architecture][app-archi]

[Back to ⬆️](#gen-x "Back to 'Table of contents' section")

---

## 🖥️ Getting started

### Prerequisites:

- JavaScript runtime **[node.js][node]**;
- Rust toolchain **[rustup, rustc, cargo][rust]**;
- **OPTIONAL**:
  - Alternative package manager:
    - **[pnpm][pnpm]**: `npm install --global pnpm` <br /> or
    - **[yarn][yarn]**: `npm install --global yarn`;
  - **[cargo-watch][cargo-watch]**: `cargo install cargo-watch`;

### Local development:

- Get the repository: `git clone https://github.com/doinel1a/gen-x`;
- Open your terminal or code editor to the path the project is located, and run:

  - In the root `/` folder:

    |                                 | **npm**       | **pnpm**       | **yarn**       |
    | ------------------------------- | ------------- | -------------- | -------------- |
    | To **install** the dependencies | `npm install` | `pnpm install` | `yarn install` |

  - In the `front-end` folder:

    |                                                        | **npm**           | **pnpm**       | **yarn**       |
    | ------------------------------------------------------ | ----------------- | -------------- | -------------- |
    | To **install** the dependencies                        | `npm install`     | `pnpm install` | `yarn install` |
    | To **run** the **development server** **\***           | `npm run dev`     | `pnpm dev`     | `yarn dev`     |
    | To **build** the app **for production**                | `npm run build`   | `pnpm build`   | `yarn build`   |
    | To **preview** the **production optimized app** **\*** | `npm run preview` | `pnpm preview` | `yarn preview` |

    **\*** The **front-end interface** will be accessible at the following url: `http://localhost:3000`.

  - In the `back-end` folder:

    |                                                                | **Cargo**               |
    | -------------------------------------------------------------- | ----------------------- |
    | To **run** the back-end in **development mode** **\***         | `cargo run`             |
    | To **run** the back-end in **development & watch mode** **\*** | `cargo watch -x "run"`  |
    | To **run** the back-end in **production mode** **\***          | `cargo run --release`   |
    | To **build** the back-end **for production**                   | `cargo build --release` |

    **\*** <br />
    &nbsp;&nbsp; The **API** will be accessible at the following url: `http://localhost:8080`. <br />
    &nbsp;&nbsp; The available endpoints are:

    - /api/v1/healthcheck
    - /api/v1/generate

[Back to ⬆️](#gen-x "Back to 'Table of contents' section")

---

## 🛠 How to

As per today, **Wednesday 11 October**, the API is not yet deployed in the cloud. <br />
The only way to test the solutions is to run it locally:

1. **[Get started](#️-getting-started "Go to 'Getting started' section");**
2. Build and run the API;
3. In your favourite API client:
   1. Set the HTTP Method to `POST`;
   2. Set the url as `http://localhost:8080/api/v1/generate`;
   3. Select `Body` and then `JSON`;
   4. Insert a JSON which must have the following structure:
      ```json
      {
        "sc_abi": {
          "name": "SC name",
          "constructor": {
            "inputs": [ . . . ],
            "outputs": [ . . . ]
          },
          "endpoints": [ . . . ],
          "events": [ . . . ] ,
          "hasCallback": false,
          "types": { . . . }
        }
      }
      ```
      **To enable the rendering feature of a endpoint inside a specific page, insert in the documentation of each endpoint a field like `path: /pages/page1`; otherwise it will be rendered in its predefined folder**
   5. Send request;
   6. Download .zip project;

[Back to ⬆️](#gen-x "Back to 'Table of contents' section")

---

## ✅ Todo

- **Front-end**:
  - [ ] Test healthcheck endpoint from front-end;
  - [ ] Test generate endpoint from front-end;
  - [ ] Set back-end url dynamically based on dev env;
  - [ ] Display back-end errors in the UI;
- **Back-end**:
  - [x] Test generate endpoint to download .zip archive;
  - [x] Set listen address dynamically based on the environment;
  - [ ] Smart contract ABI:
    - [ ] Address;
    - [ ] Endpoints:
      - [x] Readonly:
        - [x] Render single endpoint w/ its inputs & outputs;
        - [x] Render all endpoints;
        - [x] Render & "assemble" endpoints in the specified page; <br />
              **To enable this feature, insert in the documentation of each endpoint a field like `path: /pages/page1`**
        - [ ] Handle custom types - Struct & Enum;
      - [x] Mutable:
        - [x] Render single endpoint w/ its inputs & outputs;
        - [x] Render all endpoints;
        - [x] Render & "assemble" endpoints in the specified page;
              **To enable this feature, insert in the documentation of each endpoint a field like `path: /pages/page1`**
        - [ ] Handle custom types - Struct & Enum;
      - [ ] Custom types;
  - [x] Fix MultiversX sdk UI styling;
  - [x] Update [dApp boilerplate][dapp-boilerplate] to the last version;
- **CI / CD**:
  - [x] Deploy front-end ([vercel][vercel]);
  - [ ] Deploy back-end ([fly.io][fly.io]);
  - [ ] Set-up Docker;
  - [ ] Optimize Docker image size;
  - [ ] CI / CD github actions;
  - [x] Trigger vercel deployments only on front-end folder push; <br />
        (`git diff --quiet HEAD^ HEAD -- .` in git project settings; `.` since `front-end` is setted as root directory)
  - [ ] Trigger fly.io deployments, through gh actions, only on back-end folder push;

[Back to ⬆️](#gen-x "Back to 'Table of contents' section")

---

## 👥 Contribute

Contributions are what make the open source community such an amazing place to learn, inspire, and create.  
Any contribution is greatly appreciated: big or small, it can be documentation updates, adding new features or something bigger.  
Please check the [**contributing guide**][code-of-conduct] for details on how to help out and keep in mind that all commits must follow the **[conventional commit format][commitlint]**.

### How to contribute:

1.  **[Get started](#️-getting-started "Go to 'Getting started' section");**
2.  **For a new feature:**
    1.  Create a new branch: `git checkout -b feat/NEW-FEATURE`;
    2.  Add your changes to the staging area: `git add PATH/TO/FILENAME.EXTENSION`;
    3.  Commit your changes: `git commit -m "feat: NEW FEATURE"`;
    4.  Push your new branch: `git push origin feat/NEW-FEATURE`;
3.  **For a bug fix:**
    1.  Create a new branch: `git checkout -b fix/BUG-FIX`;
    2.  Add your changes to the staging area: `git add PATH/TO/FILENAME.EXTENSION`;
    3.  Commit your changes: `git commit -m "fix: BUG FIX"`;
    4.  Push your new branch: `git push origin fix/BUG-FIX`;
4.  **Open a new [pull request][pulls];**

[Back to ⬆️](#gen-x "Back to 'Table of contents' section")

---

## 📑 License

All logos and trademarks are the property of their respective owners.  
Everything else is distributed under the **GPL-3.0 License**.  
See the [LICENSE][license] file for more informations.

[Back to ⬆️](#gen-x "Back to 'Table of contents' section")

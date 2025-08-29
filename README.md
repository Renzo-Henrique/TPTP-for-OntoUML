# TPTP-for-OntoUML

A TypeScript library and CLI tool to transform OntoUML JSON models into logical axioms in the **TPTP** format, with optional validation features.

---

## 🧠 About This Project

TPTP‑for‑OntoUML automates the formalization of conceptual models defined in OntoUML (via `ontouml-js`) into TPTP axioms. It supports:
- Ontology refactoring (class naming consistency),
- Unique axiom identifiers,
- Generation of TPTP logic suitable for use with ATPs like E‑Prover or Vampire,
- (Planned) project validation before axiom generation.

---

## ⚙️ Built With

- **TypeScript**
- [`ontouml-js`](https://github.com/OntoUML/ontouml-js) for model parsing  
- [`lodash`](https://lodash.com/) for string utilities  
- Node.js built-in modules (`fs`, `path`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ v16
- npm or Yarn

### Installation
TODO:: FIX-ME
```bash
npm install tptp-for-ontouml
```

---

## 🧪 Usage

Import your OntoUML project and generate TPTP axioms:

```ts
import { loadProjectFromJson } from 'ontouml-js';
TODO:: FIX-ME
import { generateTptpFromProject } from 'tptp-for-ontouml';

const project = loadProjectFromJson('./path/to/model.json');
await generateTptpFromProject(project, './path/to/model.json', './path/to/');
```

This will generate a `.p` file in `./path/to/` with axioms derived from the model.

---

## 🧰 CLI (if implemented)

If you include a CLI wrapper, commands might look like:
TODO:: FIX-ME
```bash
tptp-cli generate ./examples/model.json --output ./out
tptp-cli validate ./examples/model.json
```

*(CLI not yet implemented.)*

---

## 🗂 Project Structure

```
TPTP-for-OntoUML/
├── examples/
│   ├── wrongs/                     ── folders containing semantically and/or syntactically wrong models
│   └── notWrongs/                  ── folders containing NOT semantically and/or syntactically wrong models
│   └── generated/                  ── TPTP axioms output
├── src/
│   ├── generator.ts                ── transformation logic
│   ├── validate.ts                 ── tptp validation logic
│   ├── axioms/                     ── taxonomy, generalization, base axioms
│   └── commom                      ── file and model utilities
├── index.ts                        ── CLI or entry point
├── README.md
└── package.json
```

---

## 📦 API Reference

### `generateTptpFromProject(project: Project, inputPath: string, outputDir: string): void`

Transforms an OntoUML `Project` object into TPTP format:

- Resets axiom ID counter for consistency
- Produces axioms across:
  - worlds and entities
  - existence of sortals
  - kind disjunctions
  - rigidity/anti-rigidity
  - generalizations and generalization sets
  - optional instance existence axioms

Output is saved as `outputDir/generated/{ProjectName}.p`

--
## iof(X,T,W) explanation

- X é instância
- T é tipo
- W é mundo

---

## 🔍 Validation (Coming Soon)

### `validateTptpFromProject(project: Project): { valid: boolean; errors: string[] }`

Planned functionality:

- Verifies the model contains valid stereotypes for axiom generation
- Checks for conflicts or missing constraints before output

---

## 🛠 Contributing

Contributions are welcome! Please:

- Fork the repo
- Create a branch with your changes
- Submit a pull request

---

## 📃 License

Distributed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

---

## 📬 Contact

Project by **Renzo Henrique Guzzo Leão**  
GitHub: [renzohgl](https://github.com/renzohgl)  
Based on OntoUML and TPTP technologies.
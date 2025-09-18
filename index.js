/**
 * Portfolio index interactions and dynamic rendering utilities.
 * This file renders technology logos, groups them by type, and provides simple filtering.
 * JSDoc annotations are provided to improve IDE static typing and IntelliSense.
 */

/** @const {number} fixed_size */
const fixed_size = 50;

/** @type {Set<string>} */
const filters = new Set();


/**
 * @typedef {Object} LanguageMetadata
 * @property {string} img - Public URL to the technology icon SVG.
 * @property {("language"|"tools"|"framework"|"application")} type - Generic classification for this technology.
 * @property {string[]} [aliases] - Alternate names that map to this technology.
 * @property {string[]} [related] - Related technologies that may be shown together.
 */

// noinspection SpellCheckingInspection
/**
 * Mapping from a technology name to its metadata.
 * @type {Record<string, LanguageMetadata>}
 */
const languageMetadata = {
    "Azure SQL": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
        type: "application",
        aliases: ["azuresql"]
    },
    "Blazor": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blazor/blazor-original.svg",
        type: "framework",
        aliases: ["blazor"],
    },
    "C": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        type: "language",
        aliases: ["c", "c-lang", "c lang"],
    },
    "CLion": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clion/clion-original.svg",
        type: "tools"
    },
    "C++": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        type: "language",
        aliases: ["cplusplus"],
    },
    "C#": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
        type: "language",
        aliases: ["csharp"],
        related: [".NET", ".NET Core"]
    },
    "CSS": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        type: "language",
        aliases: ["css3"],
    },
    ".NET": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
        type: "framework",
        aliases: ["dotNet", "dotnet", "dot-net", "dotnet-original"],
    },
    ".NET Core": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
        type: "framework",
        aliases: ["dotnetcore", "dotnet Core"],
    },
    "Entity Framework Core": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/entityframeworkcore/entityframeworkcore-original.svg",
        type: "framework",
        aliases: ["EF Core"],
        related: [".NET", ".NET Core"]
    },
    "F#": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fsharp/fsharp-original.svg",
        type: "language",
        aliases: ["fsharp"],
        related: [".NET", ".NET Core"]
    },
    "gcc": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gcc/gcc-original.svg",
        type: "tools",
        aliases: [],
    },
    "git": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        type: "tools",
        aliases: [],
    },
    "GitHub": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        type: "tools",
        aliases: ["github"],
    },
    "GitLab": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
        type: "tools",
        aliases: [],
    },
    "GODOT": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg",
        type: "framework",
        aliases: ["Godot"],
    },
    "HTML5": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        type: "language",
        aliases: ["html5", "html"],
    },
    "Inkscape": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/inkscape/inkscape-original.svg",
        type: "tools",
        aliases: [],
    },
    "IntelliJ": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
        type: "tools",
        aliases: [],
        related: ["Java"]
    },
    "Java": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        type: "language",
        aliases: [],
    },
    "JavaScript": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        type: "language",
        aliases: ["ECMAScript", "Javascript"],
    },
    "Jira": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
        type: "tools",
        aliases: [],
    },
    "Json": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg",
        type: "language",
        aliases: ["json"],
    },
    "Junit": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-original.svg",
        type: "framework",
        aliases: ["junit"],
        related: ["Java"]
    },
    "MariaDB": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg",
        type: "application",
        aliases: ["mariadb"],
    },
    "Markdown": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg",
        type: "language",
        aliases: ["markdown"],
    },
    "nodejs": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        type: "application",
        aliases: ["Node"],
        related: ["JavaScript"]
    },
    "npm": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg",
        type: "tools",
        aliases: [],
        related: ["nodejs"]
    },
    "nuget": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuget/nuget-original.svg",
        type: "tools",
        aliases: [],
        related: [".NET Core"]
    },
    "python": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        type: "language",
        aliases: ["Python"],
        related: []
    },
    "React": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        type: "framework",
        aliases: ["react"],
        related: ["JavaScript"]
    },
    "Ren'Py": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/renpy/renpy-original.svg",
        type: "framework",
        related: ["python"],
        aliases: ["renpy"]
    },
    "Rider": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg",
        type: "tools",
        related: [".NET Core"]
    },
    "Spring": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        type: "framework",
        related: ["Java"]
    },
    "Sqlite": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
        type: "application",
        aliases: ["sqlite"],
    },
    "ssh": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ssh/ssh-original-wordmark.svg",
        type: "tools"
    },
    "stackoverflow": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stackoverflow/stackoverflow-original.svg",
        type: "application"
    },
    "Swagger": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg",
        type: "tools",
        aliases: ["swagger"]
    },
    "TypeScript": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        type: "language",
        aliases: ["typescript"],
        related: ["JavaScript"]
    },
    "Vaadin": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vaadin/vaadin-original.svg",
        type: "framework",
        related: ["Java"],
    },
    "VITE": {
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg",
        type: "tools",
        related: ["JavaScript"]
    },
};
// inspection SpellCheckingInspection

// Sanity check: ensure all "related" references exists within the mapping
(() => {
    /** @type {Set<string>} */
    const keys = new Set(Object.keys(languageMetadata));
    for (const key of keys) {
        const meta = languageMetadata[key];
        if (Array.isArray(meta.related)) {
            meta.related = meta.related.filter(name => keys.has(name));
        }
    }
})();

/**
 * Fills the given container with grouped technology logo images.
 * Groups items by their metadata type, creating a <section> per type with class "row".
 *
 * @param {HTMLElement|string} root - The container element or its element id.
 * @returns {void}
 */
function fill_with_images(root) {
    const container = typeof root === "string" ? document.getElementById(root) : root;
    if (!container) return;

    /** @type {string[]} */
    const allNames = Object.keys(languageMetadata);

    /** @type {Record<string, Record<string, HTMLLIElement>>} */
    const outputs = {};

    for (const name of allNames) {
        const meta = languageMetadata[name];
        const img = language_metadata_to_img(name, meta);

        if (!Object.hasOwn(outputs, meta.type)) {
            outputs[meta.type] = {};
        }
        outputs[meta.type][name] = img;
    }

    for (const type of Object.keys(outputs)) {
        const section = document.createElement("section");
        section.id = type;
        section.className = "row";

        const header = document.createElement("h3");
        header.innerText = type;
        section.appendChild(header);

        const ul = document.createElement("ul");
        ul.className = "list-group list-group-horizontal";
        ul.style.overflowX = 'auto';
        section.appendChild(ul);

        for (const name of Object.keys(outputs[type])) {
            ul.appendChild(outputs[type][name]);
        }
        container.appendChild(section);
    }

    /**
     * Creates a wrapped image element for a language metadata entry.
     * @param {string} name - The display name for the metadata object.
     * @param {LanguageMetadata} meta - A language metadata object.
     * @returns {HTMLLIElement}
     */
    function language_metadata_to_img(name, meta) {
        const element = document.createElement("li");
        element.className = "list-group-item";
        element.title = name;

        const img = document.createElement("img");
        img.src = meta.img;
        img.alt = `The logo for the ${meta.type}, ${name}`;
        img.height = fixed_size;
        img.width = fixed_size;

        element.onclick = () => {
            const strobe = "strobe";
            if(img.className.includes(strobe)) img.className = img.className.replace(strobe, "");
            else img.className += strobe;
            filter_elements(name);
        }
        element.appendChild(img);
        return element;
    }
}

/**
 * Toggles a text filter and hides/shows sections whose text does not include all active filters.
 * Filtering is case-insensitive and applies recursively to sections within the main container.
 * @param {string} key - Filter word to toggle.
 * @returns {void}
 */
function filter_elements(key) {
    if (typeof key !== "string") throw new Error("key must be a string");
    key = key.toLowerCase();

    if (filters.has(key)) filters.delete(key);
    else filters.add(key);

    /** @type {HTMLElement|null} */
    const main = document.querySelector("main.container");
    if (!main) return;

    /** @type {HTMLElement[]} */
    const children = Array.from(main.children).slice(2); // skip about me and technologies
    children.forEach(child => recursive_check(child));

    /**
     * Recursively check an element and its descendant sections against the active filters.
     * Shows the element if any filter matches its innerText; otherwise hides it.
     * @param {HTMLElement} element
     * @returns {void}
     */
    function recursive_check(element) {
        const innerText = element.innerText.toLowerCase();
        // Normalize
        element.style.display = "revert";
        element.style.visibility = "revert";

        let any_matches = true;
        for (let query of filters) {
            if (innerText.includes(query)) {
                any_matches = true;
                break;
            }
            any_matches = false;
        }

        if (!any_matches) {
            element.style.display = "none";
            element.style.visibility = "hidden";
            return;
        }

        /** @type {HTMLElement[]} */
        let sections = [...element.getElementsByTagName("section")];
        sections.forEach(section => recursive_check(section));
    }
}
const { createApp, h } = Vue;

// Component that outputs REAL svg tags (circle/rect/path/etc)
const SvgEl = {
  props: {
    type: { type: String, required: true },
    attrs: { type: Object, required: true },
  },
  render() {
    return h(this.type, this.attrs);
  },
};

createApp({
  components: { "svg-el": SvgEl },

  data() {
    return {
      current: "snowman",
      activeColor: "#e63946",

      palette: [
        "#ffffff",
        "#000000",
        "#e63946",
        "#f4a261",
        "#2a9d8f",
        "#457b9d",
        "#9b5de5",
      ],

      saves: [],

      drawings: {
        snowman: [
          { type: "circle", attrs: { id: "bottom", cx: 150, cy: 320, r: 100 } },
          { type: "circle", attrs: { id: "middle", cx: 150, cy: 200, r: 70 } },

          { type: "line", attrs: { id: "armLeft", x1: 85, y1: 200, x2: 25, y2: 175 } },
          { type: "line", attrs: { id: "armLeftTwig1", x1: 45, y1: 183, x2: 30, y2: 160 } },
          { type: "line", attrs: { id: "armLeftTwig2", x1: 55, y1: 190, x2: 40, y2: 205 } },

          { type: "line", attrs: { id: "armRight", x1: 215, y1: 200, x2: 275, y2: 175 } },
          { type: "line", attrs: { id: "armRightTwig1", x1: 255, y1: 183, x2: 270, y2: 160 } },
          { type: "line", attrs: { id: "armRightTwig2", x1: 245, y1: 190, x2: 260, y2: 205 } },

          { type: "circle", attrs: { id: "head", cx: 150, cy: 105, r: 50 } },

          { type: "rect", attrs: { id: "scarfWrap", x: 90, y: 145, width: 120, height: 25, rx: 12 } },
          { type: "rect", attrs: { id: "scarfTail", x: 160, y: 165, width: 25, height: 70, rx: 10 } },

          { type: "rect", attrs: { id: "hatTop", x: 115, y: 20, width: 70, height: 45, rx: 6 } },
          { type: "rect", attrs: { id: "hatBrim", x: 95, y: 60, width: 110, height: 12, rx: 6 } },

          { type: "circle", attrs: { id: "eyeLeft", cx: 135, cy: 95, r: 4 } },
          { type: "circle", attrs: { id: "eyeRight", cx: 165, cy: 95, r: 4 } },

          { type: "polygon", attrs: { id: "nose", points: "150,110 185,118 150,125" } },

          { type: "circle", attrs: { id: "mouth1", cx: 135, cy: 130, r: 3 } },
          { type: "circle", attrs: { id: "mouth2", cx: 145, cy: 135, r: 3 } },
          { type: "circle", attrs: { id: "mouth3", cx: 155, cy: 135, r: 3 } },
          { type: "circle", attrs: { id: "mouth4", cx: 165, cy: 130, r: 3 } },

          { type: "circle", attrs: { class: "button", cx: 150, cy: 190, r: 6 } },
          { type: "circle", attrs: { class: "button", cx: 150, cy: 215, r: 6 } },
          { type: "circle", attrs: { class: "button", cx: 150, cy: 240, r: 6 } },
        ],

        present: [
          { type: "rect", attrs: { id: "box", x: 70, y: 180, width: 160, height: 170, rx: 12 } },
          { type: "rect", attrs: { id: "lid", x: 60, y: 150, width: 180, height: 45, rx: 12 } },
          { type: "rect", attrs: { id: "ribbonV", x: 142, y: 150, width: 16, height: 200, rx: 6 } },
          { type: "rect", attrs: { id: "ribbonH", x: 70, y: 240, width: 160, height: 16, rx: 6 } },
          { type: "path", attrs: { id: "bowLeft", d: "M150 140 C130 115, 95 120, 110 150 C125 175, 145 160, 150 140 Z" } },
          { type: "path", attrs: { id: "bowRight", d: "M150 140 C170 115, 205 120, 190 150 C175 175, 155 160, 150 140 Z" } },
          { type: "circle", attrs: { id: "knot", cx: 150, cy: 145, r: 10 } },
        ],

        tree: [
          {
            type: "polygon",
            attrs: {
              id: "star",
              points:
                "150,32 159,56 184,56 164,71 172,95 150,80 128,95 136,71 116,56 141,56",
            },
          },
          {
            type: "path",
            attrs: {
              id: "treeBody",
              d: `M150 80 L120 125 L135 125 L100 175 L118 175
                  L80 235  L105 235 L60 310  L240 310
                  L195 235 L220 235 L182 175 L200 175
                  L165 125 L180 125 Z`,
            },
          },
          { type: "rect", attrs: { id: "trunk", x: 128, y: 310, width: 44, height: 75, rx: 6 } },

          { type: "circle", attrs: { id: "orn1", cx: 150, cy: 150, r: 10 } },
          { type: "rect", attrs: { id: "cap1", x: 146, y: 136, width: 8, height: 6, rx: 2 } },

          { type: "circle", attrs: { id: "orn2", cx: 120, cy: 190, r: 10 } },
          { type: "rect", attrs: { id: "cap2", x: 116, y: 176, width: 8, height: 6, rx: 2 } },

          { type: "circle", attrs: { id: "orn3", cx: 180, cy: 190, r: 10 } },
          { type: "rect", attrs: { id: "cap3", x: 176, y: 176, width: 8, height: 6, rx: 2 } },

          { type: "circle", attrs: { id: "orn4", cx: 105, cy: 250, r: 10 } },
          { type: "rect", attrs: { id: "cap4", x: 101, y: 236, width: 8, height: 6, rx: 2 } },

          { type: "circle", attrs: { id: "orn5", cx: 195, cy: 250, r: 10 } },
          { type: "rect", attrs: { id: "cap5", x: 191, y: 236, width: 8, height: 6, rx: 2 } },

          { type: "circle", attrs: { id: "orn6", cx: 140, cy: 275, r: 10 } },
          { type: "rect", attrs: { id: "cap6", x: 136, y: 261, width: 8, height: 6, rx: 2 } },

          { type: "circle", attrs: { id: "orn7", cx: 160, cy: 295, r: 10 } },
          { type: "rect", attrs: { id: "cap7", x: 156, y: 281, width: 8, height: 6, rx: 2 } },
        ],
      },
    };
  },

  mounted() {
    this.loadSaves();
  },

  methods: {
    setActiveColor(color) {
      this.activeColor = color;
    },

    paint(e) {
      const svg = e.currentTarget;
      const target = e.target;
      if (target === svg) return;

      const tag = (target.tagName || "").toLowerCase();
      if (tag === "line") target.style.stroke = this.activeColor;
      else target.style.fill = this.activeColor;
    },

    // Build an SVG string that includes outlines/styles (so it downloads/saves correctly)
    buildSvgString() {
      const svg = this.$refs.svgEl;
      if (!svg) return null;

      const clone = svg.cloneNode(true);
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      const svgStyles = `
        svg * { fill: white; stroke: black; stroke-width: 3; }
        #eyeLeft, #eyeRight, #mouth1, #mouth2, #mouth3, #mouth4 { stroke-width: 2; }
        #scarfWrap, #scarfTail { fill: rgb(255, 255, 255); }
        .button { fill: rgb(255, 255, 255); stroke-width: 2; }
        #armLeft, #armLeftTwig1, #armLeftTwig2,
        #armRight, #armRightTwig1, #armRightTwig2 {
          fill: white; stroke: #000000; stroke-width: 6; stroke-linecap: round;
        }
      `;

      const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
      styleEl.textContent = svgStyles;
      clone.insertBefore(styleEl, clone.firstChild);

      return new XMLSerializer().serializeToString(clone);
    },

    // Save to "the site" for GitHub Pages: LocalStorage + gallery preview
    saveToSite() {
      const svgString = this.buildSvgString();
      if (!svgString) return;

      const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
      let name = prompt("Name this drawing:", this.current);
      if (name === null) return;

      name = this.sanitizeFilename(name) || `${this.current}-${Date.now()}`;

      const encoded = encodeURIComponent(svgString)
        .replace(/'/g, "%27")
        .replace(/"/g, "%22");

      const item = {
        id,
        name,
        drawing: this.current,
        createdAt: new Date().toISOString(),
        svg: svgString,
        dataUrl: `data:image/svg+xml;charset=utf-8,${encoded}`,
      };

      this.saves.unshift(item);
      this.persistSaves();
    },

    loadSaves() {
      try {
        const raw = localStorage.getItem("coloringBookSaves");
        this.saves = raw ? JSON.parse(raw) : [];
      } catch {
        this.saves = [];
      }
    },

    persistSaves() {
      localStorage.setItem("coloringBookSaves", JSON.stringify(this.saves));
    },

    clearSaves() {
      this.saves = [];
      localStorage.removeItem("coloringBookSaves");
    },

    // Click a thumbnail to load that saved SVG back into the canvas
    loadSaved(item) {
      this.current = item.drawing;

      this.$nextTick(() => {
        const svg = this.$refs.svgEl;
        if (!svg) return;

        const parsed = new DOMParser().parseFromString(item.svg, "image/svg+xml");
        const savedSvg = parsed.documentElement;

        svg.innerHTML = savedSvg.innerHTML;

        const vb = savedSvg.getAttribute("viewBox");
        if (vb) svg.setAttribute("viewBox", vb);
      });
    },

    exportSavesJson() {
      const blob = new Blob([JSON.stringify(this.saves, null, 2)], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "saves.json";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    },

    importSavesJson(e) {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);

          if (!Array.isArray(data)) throw new Error("JSON must be an array.");

          const existingIds = new Set(this.saves.map((s) => s.id));
          const incoming = data.filter((s) => s && s.id && !existingIds.has(s.id));

          this.saves = [...incoming, ...this.saves];
          this.persistSaves();
        } catch {
          alert("Invalid saves.json file.");
        } finally {
          e.target.value = "";
        }
      };
      reader.readAsText(file);
    },

    downloadSvg() {
      const svgString = this.buildSvgString();
      if (!svgString) return;

      let name = prompt("Name your Drawing:", this.current);

      // User pressed cancel
      if (name === null) return;

      name = this.sanitizeFilename(name);

      // Fallback name if empty after sanitizing
      if (!name) {
        name = `${this.current}-${Date.now()}`;
      }

      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.svg`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    },

    sanitizeFilename(name) {
      return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")          // spaces → dashes
        .replace(/[^a-z0-9-_]/g, "")   // remove symbols
        .replace(/-+/g, "-")           // collapse dashes
        .replace(/^[-_]+|[-_]+$/g, ""); // trim edges
    },
  },
}).mount("#app");

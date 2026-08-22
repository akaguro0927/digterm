/*
 * journey.ts（本文・設問を含む正本）から、クライアントに渡してよい道のり用メタデータを生成する。
 * 手で二重管理しないため、npm run build の前に必ず実行する。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "data", "journey.ts");
const outputPath = path.join(root, "src", "data", "journeyPublic.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const moduleBox = { exports: {} };
vm.runInNewContext(compiled, { module: moduleBox, exports: moduleBox.exports, require: (name) => { throw new Error(`unexpected runtime import: ${name}`); } });
const journey = moduleBox.exports;

const chapters = new Map();
const flatNodes = journey.flatNodes.map(({ node, chapter, index }) => {
  if (!chapters.has(chapter.id)) {
    chapters.set(chapter.id, {
      id: chapter.id, title: chapter.title, subtitle: chapter.subtitle, tint: chapter.tint,
      chip: chapter.chip, level: chapter.level, access: chapter.access,
    });
  }
  return { node: { id: node.id, type: node.type, title: node.title, icon: node.icon, intro: node.intro }, chapter: chapters.get(chapter.id), index };
});
const chapterList = [...chapters.values()];
const nodesByChapter = Object.fromEntries(chapterList.map((chapter) => [chapter.id, flatNodes.filter((item) => item.chapter.id === chapter.id).map((item) => item.node)]));
const levels = journey.levels.map(({ level, label, eyebrow, tagline }) => ({ level, label, eyebrow, tagline }));
const json = (value) => JSON.stringify(value, null, 2);
const output = `// このファイルは scripts/generateJourneyPublic.cjs が journey.ts から生成する。手編集禁止。\nimport type { PublicChapter, PublicFlatNode, PublicLevel, PublicNode } from "@/lib/journey/types";\n\nexport const levels: PublicLevel[] = ${json(levels)};\nexport const chapters: PublicChapter[] = ${json(chapterList)};\nexport const flatNodes: PublicFlatNode[] = ${json(flatNodes)};\nexport const nodesByChapter: Record<string, PublicNode[]> = ${json(nodesByChapter)};\nexport const totalNodes = flatNodes.length;\n\nexport function getFlatNode(id: string) { return flatNodes.find((item) => item.node.id === id); }\nexport function isChapterAccessible(chapter: PublicChapter, hasPaid: boolean) { return chapter.access === "free" || hasPaid; }\nexport function isUnlocked(id: string, cleared: readonly string[]) { const index = flatNodes.findIndex((item) => item.node.id === id); return index <= 0 || cleared.includes(flatNodes[index - 1].node.id); }\nexport function nextNodeId(cleared: readonly string[]) { return flatNodes.find((item) => !cleared.includes(item.node.id))?.node.id ?? null; }\nexport function chaptersByLevel(level: PublicChapter["level"]) { return chapters.filter((chapter) => chapter.level === level); }\nexport function levelProgressList(cleared: readonly string[]) { const done = new Set(cleared); return levels.map((level) => { const nodes = flatNodes.filter((item) => item.chapter.level === level.level); const complete = nodes.filter((item) => done.has(item.node.id)).length; return { ...level, done: complete, total: nodes.length, pct: nodes.length ? Math.round((complete / nodes.length) * 100) : 0 }; }); }\n`;
if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== output) fs.writeFileSync(outputPath, output);

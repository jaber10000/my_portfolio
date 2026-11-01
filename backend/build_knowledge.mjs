#!/usr/bin/env node
/**
 * Builds knowledge.json from the React app's siteData.js + projectData.js.
 * The portfolio data is NOT duplicated: re-run this whenever you edit those files.
 *
 *   node build_knowledge.mjs [path/to/src]        (default: ../src)
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(process.argv[2] || path.join(here, "..", "src"));
const out = path.join(here, "knowledge.json");

const read = (f) => {
  const p = path.join(srcDir, f);
  if (!fs.existsSync(p)) {
    console.error(`✗ ${p} not found. Pass your src folder: node build_knowledge.mjs ../src`);
    process.exit(1);
  }
  return fs.readFileSync(p, "utf8");
};

// Asset imports (images, mp4, pdf, ?url ...) can't run in plain Node → stub them as "".
const stubAssets = (code) =>
  code.replace(/^import\s+(\w+)\s+from\s+["'][^"']+["'];?[ \t]*$/gm, 'const $1 = "";');

const projectSrc = stubAssets(read("projectData.js"));
const siteSrc = read("siteData.js").replace(/^import\s+\{[^}]*\}\s+from\s+["']\.\/projectData\.js["'];?[ \t]*$/m, "");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "kb-"));
const file = path.join(tmp, "bundle.mjs");
fs.writeFileSync(file, projectSrc + "\n" + siteSrc);
const mod = await import(pathToFileURL(file).href);
fs.rmSync(tmp, { recursive: true, force: true });

const { profile, experience, education, achievements, certifications, techCategories, projectCategories } = mod;

const projects = projectCategories.flatMap((c) =>
  c.projects.map((p) => ({
    category: c.title,
    category_id: c.id,
    title: p.title,
    description: p.description,
    details: p.details,
    techs: p.techs || [],
    github: p.github || null,
    live: p.live || null,
  }))
);

const kb = {
  generated_at: new Date().toISOString(),
  profile,
  experience,
  education,
  achievements,
  certifications: certifications || [],
  tech_stack: techCategories.map((t) => ({ label: t.long, blurb: t.blurb, tools: t.tools })),
  project_categories: projectCategories.map((c) => ({ title: c.title, tag: c.tag, count: c.projects.length })),
  projects,
};

fs.writeFileSync(out, JSON.stringify(kb, null, 2));
console.log(`✓ knowledge.json written — ${projects.length} projects, ${kb.tech_stack.length} tech groups`);

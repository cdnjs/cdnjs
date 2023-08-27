import type { MermaidConfig } from '../config.type.js';
import type { DiagramDB } from './types.js';
/**
 * Extract and parse frontmatter from text, if present, and sets appropriate
 * properties in the provided db.
 * @param text - The text that may have a YAML frontmatter.
 * @param db - Diagram database, could be of any diagram.
 * @param setDiagramConfig - Optional function to set diagram config.
 * @returns text with frontmatter stripped out
 */
export declare function extractFrontMatter(text: string, db: DiagramDB, setDiagramConfig?: (config: MermaidConfig) => void): string;

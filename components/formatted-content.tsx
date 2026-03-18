"use client";

import React from "react";

/**
 * Renders inline formatting: **bold** and [[module-id|display text]] cross-links.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g);
  return parts.map((part, i) => {
    // Cross-link [[moduleId|display]]
    const linkMatch = part.match(/^\[\[([^|]+)\|([^\]]+)\]\]$/);
    if (linkMatch) {
      const [, moduleId, display] = linkMatch;
      return (
        <a
          key={i}
          href={`/modules/${moduleId}`}
          className="text-primary hover:underline underline-offset-2 font-medium"
        >
          {display}
        </a>
      );
    }
    // Bold **text**
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>
      );
    }
    return part;
  });
}

/**
 * Renders markdown-style content with paragraph breaks, subheadings,
 * bullet/numbered lists, tables, and inline bold / cross-link formatting.
 */
export function FormattedContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, bi) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        const lines = trimmed.split("\n");

        // ── Markdown table (lines starting with |, second line is separator) ──
        if (
          lines.length >= 2 &&
          lines[0].trim().startsWith("|") &&
          /^\|[-\s:|]+\|$/.test(lines[1].trim())
        ) {
          const headerCells = lines[0]
            .split("|")
            .map((c) => c.trim())
            .filter(Boolean);
          const dataRows = lines
            .slice(2)
            .filter((l) => l.trim().startsWith("|"));
          return (
            <div
              key={bi}
              className="mb-5 overflow-x-auto rounded-lg border border-border/50"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {headerCells.map((cell, ci) => (
                      <th
                        key={ci}
                        className="text-left px-3 py-2 font-semibold text-xs text-foreground"
                      >
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, ri) => {
                    const cells = row
                      .split("|")
                      .map((c) => c.trim())
                      .filter(Boolean);
                    return (
                      <tr
                        key={ri}
                        className="border-b border-border/30 last:border-0"
                      >
                        {cells.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-sm">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }

        // ── All lines are bullet items ──
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul
              key={bi}
              className="list-disc list-outside ml-5 space-y-1.5 mb-4"
            >
              {lines.map((line, li) => (
                <li key={li}>
                  {renderInline(line.replace(/^\s*-\s*/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        // ── Standalone subheading: single bold-only line ──
        if (
          lines.length === 1 &&
          /^\*\*[^*]+\*\*[:.]?\s*$/.test(trimmed)
        ) {
          const headerText = trimmed
            .replace(/^\*\*/, "")
            .replace(/\*\*[:.]?\s*$/, "");
          return (
            <h4
              key={bi}
              className="text-[15px] font-semibold text-foreground mt-6 mb-1.5 first:mt-0"
            >
              {headerText}
            </h4>
          );
        }

        // ── Mixed: preamble text then bullet list ──
        const firstBulletIdx = lines.findIndex((l) =>
          l.trim().startsWith("- ")
        );
        if (
          firstBulletIdx > 0 &&
          lines
            .slice(firstBulletIdx)
            .every((l) => l.trim().startsWith("- "))
        ) {
          const preamble = lines.slice(0, firstBulletIdx).join(" ");
          const bullets = lines.slice(firstBulletIdx);
          return (
            <div key={bi} className="mb-4">
              <p className="mb-2 leading-[1.85]">
                {renderInline(preamble)}
              </p>
              <ul className="list-disc list-outside ml-5 space-y-1.5">
                {bullets.map((line, li) => (
                  <li key={li}>
                    {renderInline(line.replace(/^\s*-\s*/, ""))}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // ── Mixed: preamble text then numbered list ──
        const firstNumIdx = lines.findIndex((l) =>
          /^\d+\.\s/.test(l.trim())
        );
        if (
          firstNumIdx >= 0 &&
          lines
            .slice(firstNumIdx)
            .every((l) => /^\d+\.\s/.test(l.trim()))
        ) {
          const numbered = lines.slice(firstNumIdx);
          if (firstNumIdx > 0) {
            const preamble = lines.slice(0, firstNumIdx).join(" ");
            return (
              <div key={bi} className="mb-4">
                <p className="mb-2 leading-[1.85]">
                  {renderInline(preamble)}
                </p>
                <ol className="list-decimal list-outside ml-5 space-y-1.5">
                  {numbered.map((line, li) => (
                    <li key={li}>
                      {renderInline(line.replace(/^\s*\d+\.\s*/, ""))}
                    </li>
                  ))}
                </ol>
              </div>
            );
          }
          return (
            <ol
              key={bi}
              className="list-decimal list-outside ml-5 space-y-1.5 mb-4"
            >
              {numbered.map((line, li) => (
                <li key={li}>
                  {renderInline(line.replace(/^\s*\d+\.\s*/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        // ── Regular paragraph ──
        return (
          <p key={bi} className="mb-4 leading-[1.85] last:mb-0">
            {renderInline(lines.join(" "))}
          </p>
        );
      })}
    </div>
  );
}

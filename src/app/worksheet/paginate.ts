/**
 * Splits rows into pages: each page takes rows in order until the next one wouldn't fit in the
 * available height. Rows are never split; a row taller than a whole page gets a page to itself.
 * Returns the row indexes on each page.
 */
export function paginate(heights: number[], available: number): number[][] {
  const pages: number[][] = [];
  let page: number[] = [];
  let used = 0;

  heights.forEach((height, index) => {
    if (page.length > 0 && used + height > available) {
      pages.push(page);
      page = [];
      used = 0;
    }
    page.push(index);
    used += height;
  });

  if (page.length > 0) {
    pages.push(page);
  }
  return pages;
}

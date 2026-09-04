/**
 * Bharat Quest - Breadcrumbs Component
 * Renders hierarchical navigational links across deep application pages.
 */

export const Breadcrumbs = {
  render(items = []) {
    if (!items || items.length === 0) return '';

    const listItems = items.map((item, index) => {
      const isLast = index === items.length - 1;
      if (isLast) {
        return `
          <li class="flex items-center">
            <span class="text-slate-400 mx-2 text-xs">/</span>
            <span class="font-bold text-orange-600 truncate max-w-[200px]" aria-current="page">${item.label}</span>
          </li>
        `;
      }
      return `
        <li class="flex items-center">
          ${index > 0 ? '<span class="text-slate-400 mx-2 text-xs">/</span>' : ''}
          <a href="${item.href}" class="text-slate-600 hover:text-orange-600 transition font-medium text-xs sm:text-sm">
            ${item.label}
          </a>
        </li>
      `;
    }).join('');

    return `
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Breadcrumb">
        <ol class="flex items-center flex-wrap gap-y-1 text-xs sm:text-sm font-medium">
          ${listItems}
        </ol>
      </nav>
    `;
  }
};

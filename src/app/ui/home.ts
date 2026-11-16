import { el } from '@/helpers/fabric-elemnt';

export type Country = {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
  cca3: string;
};

export type SearchPage = {
  element: HTMLElement;
  input: HTMLInputElement;
  setLoading: () => void;
  setResults: (countries: Country[]) => void;
  setEmpty: () => void;
  setError: (onRetry?: () => void) => void;
  setInitial: () => void;
};

function createSearchIcon() {
  return el(
    'span',
    {
      className: 'text-xl text-slate-400',
      'aria-hidden': true,
    },
    '⌕',
  );
}

function createSpinner() {
  return el('div', {
    className: 'h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600',
    role: 'status',
    'aria-label': 'Loading',
  });
}

function createCountryCard(country: Country, onSelect?: (country: Country) => void) {
  const flag = el('img', {
    src: country.flags.svg,
    alt: country.flags.alt || `Flag of ${country.name.common}`,
    className: 'h-32 w-full rounded-xl object-cover shadow-sm',
    loading: 'lazy',
  });

  const name = el(
    'h3',
    {
      className: 'text-lg font-semibold text-slate-900',
    },
    country.name.common,
  );

  const officialName = el(
    'p',
    {
      className: 'mt-1 text-sm text-slate-500',
    },
    country.name.official,
  );

  const capital = el(
    'p',
    {
      className: 'text-sm text-slate-600',
    },
    `Capital: ${country.capital?.join(', ') || 'N/A'}`,
  );

  const region = el(
    'p',
    {
      className: 'text-sm text-slate-600',
    },
    `Region: ${country.region}`,
  );

  const population = el(
    'p',
    {
      className: 'text-sm text-slate-600',
    },
    `Population: ${country.population.toLocaleString()}`,
  );

  const detailsButton = el(
    'button',
    {
      type: 'button',
      className:
        'mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
      onClick: () => onSelect?.(country),
    },
    'View details',
  );

  return el(
    'article',
    {
      className:
        'flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md',
    },
    flag,
    el('div', { className: 'mt-4 flex-1' }, name, officialName),
    el(
      'div',
      {
        className: 'mt-4 space-y-2 border-t border-slate-100 pt-4',
      },
      capital,
      region,
      population,
    ),
    detailsButton,
  );
}

export function createSearchPage(onSelect?: (country: Country) => void): SearchPage {
  const input = el('input', {
    type: 'search',
    id: 'country-search',
    name: 'country',
    placeholder: 'Search for a country...',
    autocomplete: 'off',
    className:
      'w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100',
    'aria-label': 'Search for a country',
  });

  const searchForm = el(
    'form',
    {
      className: 'relative mx-auto mt-8 w-full max-w-2xl',
      onSubmit: (event) => event.preventDefault(),
    },
    el(
      'div',
      {
        className: 'pointer-events-none absolute inset-y-0 left-4 flex items-center',
      },
      createSearchIcon(),
    ),
    input,
  );

  const content = el('section', {
    className: 'mt-12',
    'aria-live': 'polite',
  });

  const header = el(
    'header',
    {
      className: 'text-center',
    },
    el(
      'span',
      {
        className: 'inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700',
      },
      'COUNTRY EXPLORER',
    ),
    el(
      'h1',
      {
        className: 'mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl',
      },
      'Explore the world',
    ),
    el(
      'p',
      {
        className: 'mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-500',
      },
      'Discover countries, explore their flags, capitals and other interesting information.',
    ),
    searchForm,
  );

  const main = el(
    'main',
    {
      className: 'mx-auto min-h-screen max-w-7xl px-5 py-16 sm:px-8 lg:px-12',
    },
    header,
    content,
  );

  function setInitial() {
    content.replaceChildren(
      el(
        'div',
        {
          className: 'py-12 text-center',
        },
        el(
          'div',
          {
            className: 'text-4xl',
            'aria-hidden': true,
          },
          '🌍',
        ),
        el(
          'p',
          {
            className: 'mt-4 text-slate-500',
          },
          'Start typing to discover countries',
        ),
      ),
    );
  }

  function setLoading() {
    content.replaceChildren(
      el(
        'div',
        {
          className: 'flex flex-col items-center justify-center py-16',
        },
        createSpinner(),
        el(
          'p',
          {
            className: 'mt-4 text-sm font-medium text-slate-500',
          },
          'Searching countries...',
        ),
      ),
    );
  }

  function setEmpty() {
    content.replaceChildren(
      el(
        'div',
        {
          className: 'py-16 text-center',
        },
        el(
          'div',
          {
            className: 'text-4xl',
            'aria-hidden': true,
          },
          '🔎',
        ),
        el(
          'h2',
          {
            className: 'mt-4 text-xl font-semibold text-slate-900',
          },
          'No countries found',
        ),
        el(
          'p',
          {
            className: 'mt-2 text-slate-500',
          },
          'Try another search term.',
        ),
      ),
    );
  }

  function setError(onRetry?: () => void) {
    const retryButton = el(
      'button',
      {
        type: 'button',
        className:
          'mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700',
        onClick: onRetry,
      },
      'Try again',
    );

    content.replaceChildren(
      el(
        'div',
        {
          className: 'py-16 text-center',
        },
        el(
          'div',
          {
            className: 'text-4xl',
            'aria-hidden': true,
          },
          '⚠️',
        ),
        el(
          'h2',
          {
            className: 'mt-4 text-xl font-semibold text-slate-900',
          },
          'Something went wrong',
        ),
        el(
          'p',
          {
            className: 'mt-2 text-slate-500',
          },
          'Unable to load countries. Please try again.',
        ),
        retryButton,
      ),
    );
  }

  function setResults(countries: Country[]) {
    const heading = el(
      'h2',
      {
        className: 'mb-6 text-xl font-semibold text-slate-900',
      },
      `Found ${countries.length} ${countries.length === 1 ? 'country' : 'countries'}`,
    );

    const grid = el(
      'div',
      {
        className: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      },
      ...countries.map((country) => createCountryCard(country, onSelect)),
    );

    content.replaceChildren(heading, grid);
  }

  setInitial();

  return {
    element: main,
    input,
    setInitial,
    setLoading,
    setResults,
    setEmpty,
    setError,
  };
}

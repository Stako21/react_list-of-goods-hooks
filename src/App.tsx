import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortField = '' | typeof SORT_FIELD_ABC | typeof SORT_FIELD_LENGTH;
type DirectionOrder = 'asc' | 'desc';

interface SortOptions {
  sortField: SortField;
  directionOrder: DirectionOrder;
}

const SORT_FIELD_ABC = 'abc';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(
  goodFromServer: string[],
  { sortField, directionOrder }: SortOptions,
): string[] {
  const preparedGoods = [...goodFromServer];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ABC:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (directionOrder === 'desc') {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [directionOrder, setDirectionOrder] = useState<DirectionOrder>('asc');

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    directionOrder,
  });

  const reverseOrder = () => {
    setDirectionOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const resetOrder = () => {
    setSortField('');
    setDirectionOrder('asc');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ABC)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ABC,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={reverseOrder}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': directionOrder === 'asc',
          })}
        >
          Reverse
        </button>
        {sortField || directionOrder !== 'asc' ? (
          <button
            onClick={resetOrder}
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

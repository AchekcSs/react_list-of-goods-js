import { useState } from 'react';

import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';

export const goodsFromServer = [
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

const BUTTONS = [
  {
    type: 'alphabetically',
    text: 'Sort alphabetically',
    colorClass: 'is-info',
  },
  {
    type: 'byLength',
    text: 'Sort by length',
    colorClass: 'is-success',
  },
  {
    type: 'reverse',
    text: 'Reverse',
    colorClass: 'is-warning',
  },
  {
    type: 'reset',
    text: 'Reset',
    colorClass: 'is-danger',
  },
];

export const App = () => {
  const [currentGoods, setCurrentGoods] = useState(goodsFromServer);
  const [currentSortType, setCurrentSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortGoodsAlphabetically = goods => {
    setCurrentGoods(
      goods.toSorted((firstGood, secondGood) => {
        return firstGood.localeCompare(secondGood);
      }),
    );

    setCurrentSortType('alphabetically');
  };

  const sortGoodsByLength = goods => {
    setCurrentGoods(
      goods.toSorted((firstGood, secondGood) => {
        return firstGood.length - secondGood.length;
      }),
    );

    setCurrentSortType('byLength');
  };

  const reverseGoods = () => {
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setCurrentGoods(goodsFromServer);
    setCurrentSortType('');
    setIsReversed(false);
  };

  const handleButtonClick = type => {
    switch (type) {
      case 'alphabetically':
        sortGoodsAlphabetically(currentGoods);
        break;

      case 'byLength':
        sortGoodsByLength(currentGoods);
        break;

      case 'reverse':
        reverseGoods();
        break;

      case 'reset':
        resetGoods();
        break;

      default:
        break;
    }
  };

  const getButtonClasses = (buttonType, colorClass) => ({
    button: true,
    [colorClass]: true,
    'is-light':
      buttonType !== currentSortType &&
      !(buttonType === 'reverse' && isReversed),
  });

  const displayGoods = isReversed ? currentGoods.toReversed() : currentGoods;

  return (
    <div className="section content">
      <div className="buttons">
        {BUTTONS.map(({ type, text, colorClass }) => {
          const shouldRender =
            type !== 'reset' || currentSortType || isReversed;

          if (!shouldRender) {
            return null;
          }

          return (
            <button
              type="button"
              key={type}
              className={cn(getButtonClasses(type, colorClass))}
              onClick={() => handleButtonClick(type)}
            >
              {text}
            </button>
          );
        })}
      </div>

      <ul>
        {displayGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

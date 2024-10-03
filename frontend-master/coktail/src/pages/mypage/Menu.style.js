import styled from 'styled-components';

import Recipe from '@/assets/svg/recipe_icon.svg?react';
import { primaryGray, thirdGray, primaryBlue } from '@/assets/styleVariables';

export const LikeMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
  padding: 20px 10px;
`

export const LikeMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5em;

  .likeMenuTitleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    padding: 0 4em;
    width: 23em;
    height: 10em;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    &:hover {
      cursor: pointer;
      background-color: ${primaryGray};
    }
  }

  .likeMenuTitleBox > div {
    min-width: 7em;
    max-width: 9em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .likeMenuTitleBox > div > p {
    width: 8em;
    font-size: 1.2em;
    font-weight: 600;
    color: ${thirdGray};
  }
`


export const ActivityRecipe = styled(Recipe)`
  width: 80px;
  height: 70px;
  path {
    fill: ${primaryBlue};
  }
`
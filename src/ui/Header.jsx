import styled, { css } from 'styled-components'

export const Header = styled.h1`
   font-size: 3rem;
   margin-bottom: 1rem;
   color: green;
   text-align: center;

   ${props =>
      props['data-type'] === 'h2' &&
      css`
         font-size: 1.2rem;
         color: orange;
         text-align: left;
      `}
`

import styled, { css } from 'styled-components'

const StyledButton = ({ variant, ...props }) => <button {...props} />

export const Button = styled(StyledButton)`
   margin: 0.5rem 0;
   padding: 0.5rem;
   border-radius: 5px;
   border: 1px solid #ddd;
   background-color: #6200ea;
   color: white;
   border: none;
   cursor: pointer;
   transition: background-color 0.3s;

   &:hover {
      background-color: #3700b3;
   }

   ${({ variant }) =>
      variant === 'send' &&
      css`
         background-color: #6200ea;
         &:hover {
            background-color: #3700b3;
         }
      `}

   ${({ variant }) =>
      variant === 'add' &&
      css`
         background-color: #28a745;
         &:hover {
            background-color: #218838;
         }
      `}

  ${({ variant }) =>
      variant === 'remove' &&
      css`
         background-color: #dc3545;
         &:hover {
            background-color: #c82333;
         }
      `}
`

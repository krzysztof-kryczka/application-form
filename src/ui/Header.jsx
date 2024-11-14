import styled, { css } from 'styled-components'

const headerVariants = {
   h1: 'h1',
   h2: 'h2',
}

const BaseHeader = ({ variant, ...props }) => {
   const Component = headerVariants[variant]
   return <Component {...props} />
}

export const Header = styled(BaseHeader)`
   font-size: 1.8rem;
   color: green;
   text-align: center;

   ${({ variant }) =>
      variant === 'h2' &&
      css`
         font-size: 1.2rem;
         color: orange;
         text-align: left;
      `}
`

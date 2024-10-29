import styled from 'styled-components'

export const Select = styled.select`
   background-color: #364050;
   margin: 0.5rem 0;
   padding: 0.2rem;
   border-radius: 5px;
   border: 1px solid #ddd;
   height: 100%;
   overflow: auto;
`

export const Option = styled.option`
   padding: 0.2rem;
   background-color: #364050;
   color: #000;

   &:hover {
      background-color: #f0f0f0;
   }

   &:checked {
      background-color: #6200ea;
      color: #fff;
   }
`

import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { ExpContainer, Select, Option, Button, Error } from '../ui'

export const ExtraExperience = ({ control, register, errors, expTechnologies, expLevels }) => {
   const { fields: exp, append, remove } = useFieldArray({ control, name: 'experiences' })

   const handleAddExperience = () => {
      append({ technology: '', level: '' })
   }

   return (
      <>
         <Button variant="add" type="button" id="addExperience" onClick={handleAddExperience}>
            Dodaj Doświadczenie
         </Button>
         {exp.map((item, index) => (
            <ExpContainer key={item.id}>
               <Select
                  id={`technologiesExperience${index}`}
                  name={`experiences[${index}].technology`}
                  {...register(`experiences.${index}.technology`)}
                  defaultValue={item.technology || ''}
               >
                  <Option value="">Wybierz technologię</Option>
                  {expTechnologies.map(tech => (
                     <Option key={tech} value={tech}>
                        {tech}
                     </Option>
                  ))}
               </Select>
               <Select
                  id={`experienceLevel${index}`}
                  name={`experiences[${index}].level`}
                  {...register(`experiences.${index}.level`)}
                  defaultValue={item.level || ''}
               >
                  <Option value="">Wybierz poziom</Option>
                  {expLevels.map(level => (
                     <Option key={level} value={level}>
                        {level}
                     </Option>
                  ))}
               </Select>
               <Button variant="remove" type="button" onClick={() => remove(index)}>
                  Usuń
               </Button>
            </ExpContainer>
         ))}
         {errors?.experiences && <Error>{errors.experiences.message}</Error>}
      </>
   )
}

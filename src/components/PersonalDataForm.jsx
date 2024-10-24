import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useState } from 'react'
import { SummaryDataForm } from './SummaryDataForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaForm } from '../schemas/schemaForm'

export const PersonalDataForm = () => {
   const {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(schemaForm),
      defaultValues: {
         experiences: [],
      },
   })

   const {
      fields: exp,
      append,
      remove,
   } = useFieldArray({
      control,
      name: 'experiences',
   })

   const [userData, setUserData] = useState(null)

   const watchExperience = watch('experience', false)
   const [newExperience, setNewExperience] = useState({ technology: '', level: '' })
   console.log('errors:', errors)

   const handleAddExperience = () => {
      append(newExperience)
      setNewExperience({ technology: '', level: '' })
   }

   const onSubmit = data => {
      console.log(data)
      setUserData(data)
   }

   const learningModes = schemaForm._def.schema.shape.learningMode.options // Extract the enum values
   const technologyOptions = schemaForm._def.schema.shape.technologies.element.options // Extract the array values
   const expTechnologies = schemaForm._def.schema.shape.experiences.element.shape.technology.options // Extract the enum values for exp tech
   const expLevels = schemaForm._def.schema.shape.experiences.element.shape.level.options // Extract the enum values for exp lvl

   return userData ? (
      <SummaryDataForm userData={userData} />
   ) : (
      <>
         <form id="personalDataForm" onSubmit={handleSubmit(onSubmit)}>
            <p>Dane osobowe</p>
            <input type="text" id="firstName" name="firstName" placeholder="Imię" {...register('firstName')} />
            {errors?.firstName && <p>{errors.firstName.message}</p>}
            <input type="text" id="lastName" name="lastName" placeholder="Nazwisko" {...register('lastName')} />
            {errors?.lastName && <p>{errors.lastName.message}</p>}
            <input type="email" id="email" name="email" placeholder="E-mail" {...register('email')} />
            {errors?.email && <p>{errors.email.message}</p>}
            <input type="tel" id="phone" name="phone" placeholder="Numer telefonu" {...register('phone')} />
            {errors?.phone && <p>{errors.phone.message}</p>}
            <p>Preferencje kursu</p>
            <label htmlFor="learningMode">Wybierz Formę nauki:</label>
            {learningModes.map(mode => (
               <React.Fragment key={mode}>
                  <input type="radio" id={mode} name="learningMode" value={mode} {...register('learningMode')} />
                  <label htmlFor={mode}>{mode === 'offline' ? 'Stacjonarna' : 'Online'}</label>
               </React.Fragment>
            ))}
            {errors?.learningMode && <p>{errors.learningMode.message}</p>}
            <label htmlFor="technologies">Preferowane technologie:</label>
            <select id="technologies" name="technologies" {...register('technologies')} multiple>
               {technologyOptions.map(tech => (
                  <option key={tech} value={tech}>
                     {tech}
                  </option>
               ))}
            </select>
            {errors?.technologies && <p>{errors.technologies.message}</p>}
            <p>Załącz swoje CV (JPEG lub PNG):</p>
            <input type="file" id="cv" name="cv" accept="image/jpeg, image/png" {...register('cv')}></input>
            {errors?.cv && <p>{errors.cv.message}</p>}
            <p>Doświadczenie w programowaniu</p>
            <label htmlFor="experience">Czy posiadasz doświadczenie w programowaniu?</label>
            <input type="checkbox" id="experience" name="experience" {...register('experience')} />
            {watchExperience && (
               <>
                  <button type="button" id="addExperience" onClick={handleAddExperience}>
                     Dodaj Doświadczenie
                  </button>

                  {exp.map((item, index) => (
                     <div key={item.id}>
                        <select
                           id={`technologiesExperience${index}`}
                           name={`experiences[${index}].technology`}
                           {...register(`experiences.${index}.technology`)}
                           defaultValue={item.technology || ''}
                        >
                           <option value="">Wybierz technologię</option>
                           {expTechnologies.map(tech => (
                              <option key={tech} value={tech}>
                                 {tech}
                              </option>
                           ))}
                        </select>
                        <select
                           id={`experienceLevel${index}`}
                           name={`experiences[${index}].level`}
                           {...register(`experiences.${index}.level`)}
                           defaultValue={item.level || ''}
                        >
                           <option value="">Wybierz poziom</option>
                           {expLevels.map(level => (
                              <option key={level} value={level}>
                                 {level}
                              </option>
                           ))}
                        </select>
                        <button type="button" onClick={() => remove(index)}>
                           Usuń
                        </button>
                     </div>
                  ))}
                  {errors?.experiences && <p>{errors.experiences.message}</p>}
               </>
            )}
            <button type="submit">Wyślij zgłoszenie</button>
         </form>
      </>
   )
}

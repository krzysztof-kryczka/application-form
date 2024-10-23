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
   console.log('errors:', errors)

   const onSubmit = data => {
      console.log(data)
      setUserData(data)
   }

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
            <input type="radio" id="offline" name="learningMode" value="offline" {...register('learningMode')} />
            <label htmlFor="offline">Stacjonarnie</label>
            <input type="radio" id="online" name="learningMode" value="online" {...register('learningMode')} />
            <label htmlFor="online">Online</label>
            {errors?.learningMode && <p>{errors.learningMode.message}</p>}
            <label htmlFor="technologies">Preferowane technologie:</label>
            <select id="technologies" name="technologies" {...register('technologies')} multiple>
               <option value="React">React</option>
               <option value="NodeJS">NodeJS</option>
               <option value="HTML">HTML</option>
               <option value="CSS">CSS</option>
               <option value="NextJS">NextJS</option>
            </select>
            {errors?.technologies && <p>{errors.technologies.message}</p>}
            <p>Załącz swoje CV (JPEG lub PNG):</p>
            <input type="file" id="cv" name="cv" accept="image/jpeg, image/png" {...register('cv')}></input>
            {errors?.cv && <p>{errors.cv.message}</p>}
            <p>Doświadczenie w programowaniu</p>
            <label htmlFor="experience">Czy posiadasz doświadczenie w programowaniu?</label>
            <input type="checkbox" id="experience" name="experience" {...register('experience')} />
            {watchExperience && (
               <div id="experienceDetails">
                  <select
                     id="technologiesExperience"
                     name="technologiesExperience"
                     {...register('technologiesExperience')}
                  >
                     <option value="React">React</option>
                     <option value="NodeJS">NodeJS</option>
                     <option value="HTML">HTML</option>
                     <option value="CSS">CSS</option>
                     <option value="NextJS">NextJS</option>
                  </select>
                  <select id="experienceLevel" name="experienceLevel" {...register('experienceLevel')}>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                  </select>
                  <button
                     type="button"
                     id="addExperience"
                     onClick={() => {
                        const technology = watch('technologiesExperience')
                        const level = watch('experienceLevel')
                        if (technology && level) {
                           append({ technology, level })
                        }
                     }}
                  >
                     Dodaj Doświadczenie
                  </button>
                  <ul>
                     {exp.map((exp, index) => (
                        <li key={exp.id}>
                           {exp.technology} - {exp.level}
                           <button type="button" onClick={() => remove(index)}>
                              Usuń
                           </button>
                        </li>
                     ))}
                  </ul>
                  {errors?.experiences && <p>{errors.experiences.message}</p>}
               </div>
            )}
            <button type="submit">Wyślij zgłoszenie</button>
         </form>
      </>
   )
}

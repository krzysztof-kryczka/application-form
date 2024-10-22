import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { SummaryDataForm } from './SummaryDataForm'

export const PersonalDataForm = () => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()

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
            <input
               type="text"
               id="firstName"
               name="firstName"
               placeholder="Imię"
               {...register('firstName', {
                  required: 'Imię jest wymagane',
                  minLength: { value: 3, message: 'Imię musi składać się co najmniej z 3 znaków' },
               })}
            />
            {errors?.firstName && <p>{errors.firstName.message}</p>}
            <input
               type="text"
               id="lastName"
               name="lastName"
               placeholder="Nazwisko"
               {...register('lastName', {
                  required: 'Nazwisko jest wymagane',
                  minLength: { value: 3, message: 'Nazwisko musi składać się co najmniej z 3 znaków' },
               })}
            />
            {errors?.lastName && <p>{errors.lastName.message}</p>}
            <input
               type="email"
               id="email"
               name="email"
               placeholder="E-mail"
               {...register('email', {
                  required: 'Email jest wymagany',
                  pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: 'Niepoprawny adres email',
                  },
               })}
            />
            {errors?.email && <p>{errors.email.message}</p>}
            <input
               type="tel"
               id="phone"
               name="phone"
               placeholder="Numer telefonu"
               {...register('phone', {
                  required: 'Telefon jest wymagany',
                  minLength: { value: 9, message: 'Numer telefonu musi składać się z 9 cyfr' },
               })}
            />
            {errors?.phone && <p>{errors.phone.message}</p>}
            <p>Preferencje kursu</p>
            <label htmlFor="learningMode">Wybierz Formę nauki:</label>
            <input type="radio" id="offline" name="learningMode" value="offline" {...register('learningMode')} />
            <label htmlFor="offline">Stacjonarnie</label>
            <input type="radio" id="online" name="learningMode" value="online" {...register('learningMode')} />
            <label htmlFor="online">Online</label>
            <label htmlFor="technologies">Preferowane technologie:</label>
            <select
               id="technologies"
               name="technologies"
               {...register('technologies', { required: 'Proszę wybrać co najmniej jedną technologię' })}
               multiple
            >
               <option value="React">React</option>
               <option value="NodeJS">NodeJS</option>
               <option value="HTML">HTML</option>
               <option value="CSS">CSS</option>
               <option value="NextJS">NextJS</option>
            </select>
            {errors?.technologies && <p>{errors.technologies.message}</p>}
            <p>Załącz swoje CV (JPEG lub PNG):</p>
            <input
               type="file"
               id="cv"
               name="cv"
               accept="image/jpeg, image/png"
               {...register('cv', { required: 'Musisz dodać załącznik jako zdjęcie' })}
            ></input>
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
                  <select id="experienceRating" name="experienceRating" {...register('experienceRating')}>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                  </select>
                  <button type="button" id="addExperience">
                     Dodaj Doświadczenie
                  </button>
               </div>
            )}
            <button type="submit">Wyślij zgłoszenie</button>
         </form>
      </>
   )
}

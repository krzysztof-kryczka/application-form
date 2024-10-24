import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { SummaryDataForm } from './SummaryDataForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaForm } from '../schemas/schemaForm'
import { Error, Form, Input, Select, Option, Header, Label, ChkContainer, Button } from '../ui'
import { ExtraExperience } from './ExtraExperience'

// Extracted data
const defaultValues = { experiences: [] }
const learningModes = schemaForm._def.schema.shape.learningMode.options // Extract the enum values
const technologyOptions = schemaForm._def.schema.shape.technologies.element.options // Extract the array values
const expTechnologies = schemaForm._def.schema.shape.experiences.element.shape.technology.options // Extract the enum values for exp tech
const expLevels = schemaForm._def.schema.shape.experiences.element.shape.level.options // Extract the enum values for exp lvl

export const PersonalDataForm = () => {
   const {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(schemaForm),
      defaultValues: defaultValues,
   })

   const [userData, setUserData] = useState(null)
   const watchExperience = watch('experience', false)

   const onSubmit = data => {
      setUserData(data)
   }

   return userData ? (
      <SummaryDataForm userData={userData} />
   ) : (
      <>
         <Header data-type="h1">Formularz zgłoszeniowy na kurs programowania</Header>
         <Form id="personalDataForm" onSubmit={handleSubmit(onSubmit)}>
            <Header data-type="h2"> Dane osobowe</Header>
            <Input type="text" id="firstName" name="firstName" placeholder="Imię" {...register('firstName')} />
            {errors?.firstName && <Error>{errors.firstName.message}</Error>}
            <Input type="text" id="lastName" name="lastName" placeholder="Nazwisko" {...register('lastName')} />
            {errors?.lastName && <Error>{errors.lastName.message}</Error>}
            <Input type="email" id="email" name="email" placeholder="E-mail" {...register('email')} />
            {errors?.email && <Error>{errors.email.message}</Error>}
            <Input type="tel" id="phone" name="phone" placeholder="Numer telefonu" {...register('phone')} />
            {errors?.phone && <Error>{errors.phone.message}</Error>}
            <Header data-type="h2">Preferencje kursu</Header>
            <Label htmlFor="learningMode">Wybierz Formę nauki:</Label>
            <ChkContainer>
               {learningModes.map(mode => (
                  <React.Fragment key={mode}>
                     <Input type="radio" id={mode} name="learningMode" value={mode} {...register('learningMode')} />
                     <Label htmlFor={mode}>{mode === 'offline' ? 'Stacjonarna' : 'Online'}</Label>
                  </React.Fragment>
               ))}
            </ChkContainer>
            {errors?.learningMode && <Error>{errors.learningMode.message}</Error>}
            <Label htmlFor="technologies">Preferowane technologie:</Label>
            <Select id="technologies" name="technologies" {...register('technologies')} multiple>
               {technologyOptions.map(tech => (
                  <Option key={tech} value={tech}>
                     {tech}
                  </Option>
               ))}
            </Select>
            {errors?.technologies && <Error>{errors.technologies.message}</Error>}
            <Header data-type="h2">Załącz swoje CV (JPEG lub PNG):</Header>
            <Input type="file" id="cv" name="cv" accept="image/jpeg, image/png" {...register('cv')}></Input>
            {errors?.cv && <Error>{errors.cv.message}</Error>}
            <Header data-type="h2">Doświadczenie w programowaniu</Header>
            <ChkContainer>
               <Input type="checkbox" id="experience" name="experience" {...register('experience')} />
               <Label htmlFor="experience">Czy posiadasz doświadczenie w programowaniu?</Label>
            </ChkContainer>
            {watchExperience && (
               <ExtraExperience
                  control={control}
                  register={register}
                  errors={errors}
                  expTechnologies={expTechnologies}
                  expLevels={expLevels}
               />
            )}
            <Button data-type="send" type="submit">
               Wyślij zgłoszenie
            </Button>
         </Form>
      </>
   )
}
